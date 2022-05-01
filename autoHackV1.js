/** @param {NS} ns **/
export async function main(ns) {
	// SETTINGS

	const path = "/scripts/autoHack/";
	// The file path of the folder the script is stored in. The helper scripts
	// (hackOnce.js, etc.) must also be stored in this folder.
	const useHome = true;
	// Whether or not to use the home server's RAM for hosting. Default: true
	const homeMaxRAM = Infinity;
	// Maximum amount of the home server's RAM (GB) that will be used for hosting.
	// If set to Infinity, all available RAM is used. This setting is overridden
	// by homeMinRAM. Default: Infinity
	const homeMinRAM = 32;
	// Minimum amount of the home server's RAM (GB) that will be left free.
	// This setting will overrule homeMaxRAM. Default: 64
	const usePlayerServers = true;
	// Whether or not to use available RAM on purchased servers for hosting.
	// Default: true
	const moneyThreshold = 0.85;
	// The proportion of the maximum amount of a server's money that must be present
	// before attempting a hack. Default: 0.75
	const securityThreshold = 5;
	// The maximum amount by which the security level may exceed the minimum before
	// attempting a hack. Default: 5
	const hackThreshold = 0.5;
	// The maximum proportion of a server's money that may be taken by a single
	// (possibly multi-threaded) hack. Default: 0.4
	const serverUpdateInterval = 60;
	// The interval in seconds at which the server list is updated (allows
	// previously unavailable hosts to be added and used). Default: 60
	const enableStatusDisplay = false;
	// When enabled, a status display will be posted to the script log. Alternatively,
	// calling the script with first argument "status" also enables this. Default: false
	const statusDisplayWidth = 70;
	// Width of the status display in number of characters (monospace). Low values
	// will cause funkiness, recommend using values >= 51 (fits the normal script log width).
	// Setting the value >= 69 will expand the status display with more information. Default: 51

	// END SETTINGS


	function portBreakers() { // Determines which port breaker programs are available.
		let breakerNames = ["BruteSSH", "FTPCrack", "relaySMTP", "SQLInject", "HTTPWorm"];
		for (let i = 0; i < breakerNames.length; i++) {
			if (!ns.fileExists(breakerNames[i] + ".exe")) {
				breakerNames.splice(i, 1);
				i--;
			}
		}
		return breakerNames;
	}


	function findServers() { // Creates a list of all servers.
		let serverList = [];
		let playerServers = ns.getPurchasedServers();
		recursiveScan(ns.scan("home"));
		return serverList;

		function recursiveScan(inputList) { // Recursive scanning function because I like recursion.
			if (inputList.length > 1) {
				for (let i = 0; i < inputList.length; i++) {
					if (pushAttempt(inputList[i])) {
						recursiveScan(ns.scan(inputList[i]));
					}
				}
			}

			function pushAttempt(hostname) { // Tries to add a hostname to the serverList, returns success.
				if (hostname != "home" && !playerServers.includes(hostname) && !serverList.includes(hostname)) {
					serverList.push(hostname);
					return true;
				}
				else {
					return false;
				}
			}
		}
	}


	async function analyzeServers() { // Sorts the serverList into a host list and target list.
		let list = findServers();
		let hostList = [];
		let targetList = [];
		if (useHome) { // This will add the home server to the hostList if that option is enabled.
			hostList.push(["home", Math.min(homeMaxRAM, ns.getServerMaxRam("home") - homeMinRAM)]);
		}
		if (usePlayerServers) { // This will add player servers to the hostList if that option is enabled.
			let playerServers = ns.getPurchasedServers();
			for (let i = 0; i < playerServers.length; i++) {
				let pServer = playerServers[i];
				hostList.push([pServer, ns.getServerMaxRam(pServer)]);
				await ns.scp([path + "hackOnce.js", path + "weakenOnce.js", path + "growOnce.js"], pServer);
			}
		}
		// Now analyze all servers in the serverList.
		// Note that a server can be both a host and a target.
		let breakers = portBreakers();
		for (let i = 0; i < list.length; i++) {
			let server = list[i];
			let maxRAM = ns.getServerMaxRam(server);
			if (ns.getServerNumPortsRequired(server) <= breakers.length) {
				if (maxRAM > 2) {
					hostList.push([server, maxRAM]);
					unlockRoot(server);
					await ns.scp([path + "hackOnce.js", path + "weakenOnce.js", path + "growOnce.js"], server);
				}
				if (ns.getServerMaxMoney(server) > 0 && ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
					targetList.push([server, Math.floor(ns.getServerMaxMoney(server) / ns.getServerMinSecurityLevel(server))]);
					unlockRoot(server);
				}
			}
		}
		// Finally, sort the hostList by maximum RAM and the targetList by money / hacking speed ratio.
		function sort2D(a, b) { return b[1] - a[1]; }
		hostList.sort(sort2D);
		targetList.sort(sort2D);
		return [hostList, targetList];

		function unlockRoot(server) { // Breaks open all possible ports and nukes to gain root access to the target.
			for (let i = 0; i < breakers.length; i++) {
				ns[breakers[i].toLowerCase()](server);
			}
			ns.nuke(server);
		}
	}


	function activateHosts(lists) { // Divides the host servers over the targets and starts hacking.
		let hostList = lists[0];
		let targetList = lists[1];
		let statusList = [];
		let j = 0;
		let targetLoop = false;
		for (let i = 0; i < hostList.length; i++) {
			if (j >= targetList.length) {
				j = 0;
				targetLoop = true;
			}
			let host = hostList[i][0];
			let target = targetList[j][0];
			let targetStat = {
				sec: ns.getServerSecurityLevel(target),
				minSec: ns.getServerMinSecurityLevel(target),
				money: ns.getServerMoneyAvailable(target),
				maxMoney: ns.getServerMaxMoney(target)
			};
			let freeRAM = 0;
			if (ns.serverExists(host)) { // Prevents crashing due to deleted (player) servers.
				if (host == "home") { // Exception for home server.
					freeRAM = Math.min(ns.getServerMaxRam(host) - ns.getServerUsedRam(host) - homeMinRAM, homeMaxRAM);
				}
				else {
					freeRAM = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
				}
				let threads = Math.floor(freeRAM / 1.75);
				let statusTemp = [target, host];
				// Now choose an action and execute the corresponding script on the host.
				if (targetStat.sec > targetStat.minSec + securityThreshold) {
					if (threads > 0) { ns.exec(path + "weakenOnce.js", host, threads, target); }
					statusTemp.push("weakening");
				}
				else if (targetStat.money < targetStat.maxMoney * moneyThreshold || targetLoop) {
					if (threads > 2) {
						ns.exec(path + "weakenOnce.js", host, Math.ceil(0.08 * threads), target);
						ns.exec(path + "growOnce.js", host, Math.floor(0.92 * threads), target);
					}
					else if (threads > 0) {
						ns.exec(path + "growOnce.js", host, threads, target);
					}
					statusTemp.push("growing");
				}
				else {
					if (threads > 0) {
						let hackThreads = Math.min(Math.max(Math.floor(hackThreshold / ns.hackAnalyze(target)), 1), threads);
						let remainThreads = threads - hackThreads;
						ns.exec(path + "hackOnce.js", host, hackThreads, target);
						if (remainThreads > 0) {
							ns.exec(path + "weakenOnce.js", host, remainThreads, target);
						}
					}
					statusTemp.push("hacking");
				}
				statusTemp.push(targetStat.sec - targetStat.minSec, targetStat.money / targetStat.maxMoney);
				statusList.push(statusTemp);
				j++;
			}
		}
		return statusList;
	}


	function statusDisplay(statusList, lists) { // Prints a status display to the script log.
		statusList.sort(function (a, b) { return lists[1].find(function (c) { return c[0] == b[0]; })[1] - lists[1].find(function (c) { return c[0] == a[0]; })[1]; });
		let width = statusDisplayWidth;
		let process = ["|", "/", "-", "\\"];
		let str0 = " autoHackV1 Status Display ";
		let str1 = "Hacking " + lists[1].length + " targets with " + lists[0].length + " hosts";
		let str1Tmp = (width - str1.length - 2) / 2;
		let str2 = "Re-scanning the network in " + (serverUpdateInterval - iterations) + " seconds";
		let str3 = "List sorted by target value (descending)"
		ns.clearLog();
		ns.print("=".repeat(Math.floor((width - str0.length) / 2)) + str0 + "=".repeat(Math.ceil((width - str0.length) / 2)));
		ns.print("|" + " ".repeat(Math.floor(str1Tmp)) + str1 + " ".repeat(Math.floor(Math.ceil(str1Tmp - 1) / 2)) + process[iterations % 4] + " ".repeat(Math.ceil(Math.ceil(str1Tmp - 1) / 2)) + "|");
		ns.print(textFormat(str2));
		ns.print(textFormat(str3));
		ns.print(divider());
		ns.print(statusFormat(["target", "host", "action", "security", "money"]));
		ns.print(divider());
		for (let i = 0; i < statusList.length; i++) { ns.print(statusFormat(statusList[i])); }
		ns.print("=".repeat(width));

		function textFormat(str) { return "|" + " ".repeat(Math.floor((width - str.length - 2) / 2)) + str + " ".repeat(Math.ceil((width - str.length - 2) / 2)) + "|"; }

		function divider() { return "|" + "-".repeat(width - 2) + "|"; }

		function statusFormat(list) {
			let usedSpace = 13;
			if (width > 68) { usedSpace = 31; }
			let str = "|" + center(Math.floor((width - usedSpace) / 2), list[0]) + "|" + center(Math.ceil((width - usedSpace) / 2), list[1]) + "|" + center(9, list[2]) + "|";
			if (width > 68) {
				str = str.concat(center(8, isNaN(list[3]) ? list[3] : ns.nFormat(list[3], "+0.0a")), "|", center(8, isNaN(list[4]) ? list[4] : ns.nFormat(list[4], "0%")), "|");
			}
			return str;

			function center(space, val) {
				let hSpace = (space - val.length) / 2;
				return " ".repeat(Math.max(Math.floor(hSpace), 0)) + val.slice(0, space + 1) + " ".repeat(Math.max(Math.ceil(hSpace), 0));
			}
		}
	}


	ns.disableLog("ALL");
	if (ns.args[0] == "status") { ns.tail(); }
	// Code to repeatedly call the above functions:
	let iterations = 0;
	let lists = await analyzeServers();
	while (true) {
		if (iterations >= serverUpdateInterval) {
			lists = await analyzeServers();
			iterations = 0;
		}
		let statusList = activateHosts(lists);
		if (enableStatusDisplay || ns.args[0] == "status") { statusDisplay(statusList, lists); }
		iterations++;
		await ns.asleep(1000);
	}


	// Miscellaneous
	if (false) { // Needed to prevent an error, this code will never execute.
		ns.brutessh("home");
		ns.ftpcrack("home");
		ns.relaysmtp("home");
		ns.sqlinject("home");
		ns.httpworm("home");
	}
}