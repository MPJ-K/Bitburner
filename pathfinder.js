/** @param {NS} ns **/
export async function main(ns) {
	// This script will return the network path to the target hostname passed in the first argument.
	// Passing "list" as the first argument returns a hostname list of all servers (excluding player servers).

	const target = ns.args[0];
	var found = false;
	var path = ["home"];

	if (target == "list") {
		let servList = findServers();
		ns.tprint("Found " + servList.length + " servers:")
		ns.tprint(servList.sort(function (a, b) { return a.toLowerCase().localeCompare(b.toLowerCase()); }));
	}
	else {
		if (target != "home") { recursiveSearch(ns.scan("home")); }
		if (path.length == 0) { ns.tprint("Could not find any server with hostname \"" + target + "\"."); }
		else {
			ns.tprint("Located the target hostname via the following path:");
			ns.tprint(path);
			ns.tprint("Information about this target:");
			const info = ns.getServer(target);
			ns.tprint(`Root access: ${info.hasAdminRights} | Ports required: ${info.numOpenPortsRequired} | Hacking skill required: ${info.requiredHackingSkill} (currently ${ns.getHackingLevel()})`);
		}
	}


	function recursiveSearch(list) { // Recursive searching function because recursion is cool.
		if (list.length > 1) { // Check that this is not the end of the current path.
			for (let i = 0; i < list.length; i++) { // Cycle all servers in the current list.
				let serv = list[i];
				if (!path.includes(serv) && !found) { // Do not search anything that has already been searched.
					path.push(serv); // Add the next node to the path.
					if (serv == target) { found = true; } // Check if the target has been found.
					else { recursiveSearch(ns.scan(serv)); } // If the target has not been found, keep searching.
				}
			}
			if (!found) { path.pop(); } // Rewind the path when the target has not been found at this node.
		}
		else { // If this is the end of the path and the target has not been found, rewind the path.
			path.pop();
		}
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
}
