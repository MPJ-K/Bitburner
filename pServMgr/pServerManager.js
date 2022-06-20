import { formatMoney, formatBytes } from "/utils/helpers.js"

/** @param {NS} ns **/
export async function main(ns) {
	const debugMode = false;
	const maxServ = ns.getPurchasedServerLimit();
	let currServ = ns.getPurchasedServers();
	let cmd = "tmp";
	const cmdList = ["list", "purchase", "mock purchase", "remove", "exit"];

	ns.tprint("Welcome to the player server manager utility.");
	ns.tprint("You currently own " + currServ.length + " server(s) out of the maximum of " + maxServ + " servers.");
	while (cmd != "exit") {
		if (ns.scriptRunning("/scripts/pServMgr/pServerAutoPurchase.js", ns.getHostname())) {
			ns.tprint("There is an automatic purchase in progress. You cannot enter any new commands until it completes.");
			if (await ns.prompt("Stop automatic purchase?")) {
				ns.tprint("Stopping automatic purchase.");
				ns.scriptKill("/scripts/pServMgr/pServerAutoPurchase.js", ns.getHostname());
				await ns.sleep(500);
			}
			else { cmd = "exit"; }
		}
		else {
			currServ = ns.getPurchasedServers();
			cmd = await ns.prompt("Please select a command:", { type: "select", choices: cmdList });
			switch (cmd) {
				case "list":
					listServers();
					break;
				case "purchase":
					var success = false;
					while (!success) {
						success = await purchaseManager(false);
					}
					break;
				case "mock purchase":
					var success = false;
					while (!success) {
						success = await purchaseManager(true);
					}
					break;
				case "remove":
					var success = false;
					while (!success) {
						success = await removeManager();
					}
					break;
			}
		}
	}
	ns.tprint("Exiting the player server manager utility.");


	function listServers() {
		if (currServ.length < 1) {
			ns.tprint("You do not currently own any servers.");
			return false;
		}
		ns.tprint("List of all the servers you own:");
		for (let i = 0; i < currServ.length; i++) { ns.tprint(currServ[i]); }
		return true;
	}


	async function purchaseManager(mock = false) {
		const maxPurchase = maxServ - currServ.length;
		let listRAM = [];
		for (let i = 1; i < 21; i++) { listRAM[i] = Math.pow(2, i); }
		if (maxPurchase <= 0 && !mock) {
			ns.tprint("You already own the maximum number of servers, remove some to purchase new servers.");
			return true;
		}
		ns.tprint("You can purchase a maximum of " + maxPurchase + " server(s).");
		let newServAmount = await ns.prompt("Enter the number of servers to purchase:", { type: "text" });
		newServAmount = parseInt(newServAmount);
		if (newServAmount != newServAmount || (newServAmount > maxPurchase && !mock) || newServAmount < 0) {
			ns.tprint("ERROR: You either did not enter a positive integer or exceeded the purchase limit.");
			return false;
		}
		if (newServAmount == 0) { return true; }
		const newServRAM = await ns.prompt("Select the desired amount of RAM:", { type: "select", choices: listRAM });
		const money = ns.getServerMoneyAvailable("home");
		const newServCost = ns.getPurchasedServerCost(newServRAM) * newServAmount;
		ns.tprint("You are about to purchase " + newServAmount + " server(s) with " + formatBytes(ns, newServRAM) + " of RAM.");
		ns.tprint("This purchase will cost " + formatMoney(ns, newServCost) + " in total.");
		if (mock) {
			ns.tprint("Because this is a mock purchase, the command ends here.");
			return true;
		}
		if (newServCost > money) {
			ns.tprint("You do not have enough money to make this purchase.");
			if (await ns.prompt("Wait for money to become available and automatically purchase?") && !debugMode) {
				ns.run("/scripts/pServMgr/pServerAutoPurchase.js", 1, newServAmount, newServRAM);
			}
			else {
				const maxAffordable = Math.floor((money / newServCost) * newServAmount);
				ns.tprint("You have enough money to buy " + maxAffordable + " server(s).");
				if (maxAffordable > 0) {
					if (await ns.prompt("Buy " + maxAffordable + " server(s) instead?")) {
						purchaseServers(maxAffordable, newServRAM);
					}
				}
			}
			return true;
		}
		if (await ns.prompt("Are you sure you would like to make this purchase?")) {
			purchaseServers(newServAmount, newServRAM);
		}
		return true;
	}


	function purchaseServers(amount, ram) {
		if (debugMode) { return; }
		let hostNumber = 0;
		for (let i = 0; i < currServ.length; i++) {
			let serv = currServ[i];
			let servRAM = parseInt(serv.slice(7));
			let servIndex = parseInt(serv.slice(serv.indexOf("B") + 1));
			if (servRAM == ram && servIndex >= hostNumber) { hostNumber = servIndex + 1; }
		}
		for (let i = hostNumber; i < hostNumber + amount; i++) {
			ns.purchaseServer("pServer" + ram + "GB" + i, ram)
		}
		ns.tprint("Purchased " + amount + " server(s) with " + formatBytes(ns, ram) + " of RAM.");
	}


	async function removeManager() {
		if (!listServers()) {
			return true;
		}
		let listTargetRAM = ["all"];
		for (let i = 0; i < currServ.length; i++) {
			const servRAM = parseInt(currServ[i].slice(7)).toString();
			if (!listTargetRAM.includes(servRAM)) { listTargetRAM.push(servRAM); }
		}
		listTargetRAM.push("cancel");
		const targetRAM = await ns.prompt("Select a RAM category for removal:", { type: "select", choices: listTargetRAM });
		if (targetRAM == "cancel") { return true; }
		if (targetRAM == "all") {
			if (await ns.prompt("Are you sure you would like to remove all servers?")) { removeServers("all"); }
			return true;
		}
		let maxTargetAmount = 0;
		for (let i = 0; i < currServ.length; i++) {
			if (parseInt(currServ[i].slice(7)) == parseInt(targetRAM)) { maxTargetAmount++; }
		}
		ns.tprint("You own " + maxTargetAmount + " server(s) with " + formatBytes(ns, targetRAM) + " of RAM.");
		let targetAmount = await ns.prompt("Enter the number of servers to remove:", { type: "text" });
		targetAmount = parseInt(targetAmount);
		if (targetAmount != targetAmount || targetAmount > maxTargetAmount || targetAmount < 0) {
			ns.tprint("ERROR: The value you entered is either too large or not a positive integer.");
			return false;
		}
		if (targetAmount == 0) { return true; }
		if (await ns.prompt("Are you sure you would like to remove " + targetAmount + " server(s)?")) {
			removeServers(targetAmount, targetRAM);
		}
		return true;
	}


	function removeServers(amount, ram) {
		if (debugMode) { return; }
		if (amount == "all") {
			for (let i = 0; i < currServ.length; i++) {
				const serv = currServ[i];
				ns.killall(serv);
				ns.deleteServer(serv);
			}
			ns.tprint("Removed all servers.");
		}
		else {
			let targetList = [];
			for (let i = 0; i < currServ.length; i++) {
				const serv = currServ[i];
				if (parseInt(serv.slice(7)).toString() == ram) {
					targetList.push(serv);
				}
			}
			for (let i = targetList.length - amount; i < targetList.length; i++) {
				const serv = targetList[i];
				ns.killall(serv);
				ns.deleteServer(serv);
			}
			ns.tprint("Removed " + amount + " server(s) with " + formatBytes(ns, ram) + "GB of RAM.");
		}
	}
}
