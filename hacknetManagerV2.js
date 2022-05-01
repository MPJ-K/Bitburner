/** @param {NS} ns **/
export async function main(ns) {
	// NOTE: This script tracks ONLY its own hacknet expenses (money spent on nodes and upgrades)
	// by saving them to a file "hacknetManagerV2Expenses.txt" in the same folder as the script.
	// As far as I know, there is no way to easily track other expenses via a script.
	// You can still manually purchase nodes and upgrades, but that spent money may cut into
	// the profit margin specified as "maxExpenses" in the settings below.
	// Running the script with the argument "resetExpenses" will allow the expenses to be reset,
	// but this is NOT recommended.
	// The script will spend money until expenses > maxExpenses * totalProduction, so resetting
	// expenses will also influence your net profit (since totalProduction will not reset).
	// Ideally, you start this script at the beginning of each run and never reset the expenses
	// or make any manual hacknet purchases. You can safely change the settings of the script,
	// without the expenses being lost, by killing it and (after changing settings) rerunning it.


	// SETTINGS

	const path = "/scripts/hacknetMgr/"
	// The file path to the folder in which the script is stored. The expenses tracking file
	// will also be stored in this folder.
	const minUpdateDelay = 100;
	// Minimum delay between each update (attempt to purchase or upgrade nodes), in milliseconds.
	// When making purchases back to back, the script will update at this rate. Default: 100
	const idleUpdateDelay = 60000;
	// Delay between each update when idle, in milliseconds. Every time a purchase fails,
	// the update delay will increase a bit up to this value. Default: 60000
	const maxCost = 0.2;
	// How much of your money (at time of purchase) may be used to purchase new nodes or upgrades.
	// The value is a factor, so 0.5 represents 50%. Default: 0.2
	const initialBudget = 1000;
	// The inital amount of money the script is allowed to spend to get the hacknet going,
	// unrestricted by maxExpenses. Default: 1000000000
	const maxExpenses = 0.5;
	// How much of the total hacknet production may be used to purchase new nodes or upgrades.
	// In other words, this factor is 1 minus the fraction of kept profit. Default: 0.5

	// END SETTINGS


	function money() { return maxCost * ns.getServerMoneyAvailable("home"); }


	function bestUpgrade() { // Determines the best upgrade by checking production increase / cost.
		let newCost = ns.hacknet.getPurchaseNodeCost();
		// Var "best" will contain the return values: [node index, upgrade type, upgrade cost, production / cost ratio].
		// It is initialized with the values for a new node and then updated if a better ratio upgrade is found.
		var best = [-1, "newNode", newCost, 1.5 / newCost];
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			let stats = ns.hacknet.getNodeStats(i);
			let pIncr = [];
			pIncr[0] = 1.5 * Math.pow(1.035, stats.ram - 1) * (stats.cores + 5) / 6;
			pIncr[1] = stats.level * 1.5 * (Math.pow(1.035, (2 * stats.ram) - 1) - Math.pow(1.035, stats.ram - 1)) * (stats.cores + 5) / 6;
			pIncr[2] = stats.level * 1.5 * Math.pow(1.035, stats.ram - 1) / 6;
			for (let j = 0; j < upgrades.length; j++) {
				let cost = ns.hacknet["get" + upgrades[j] + "UpgradeCost"](i);
				let ratio = pIncr[j] / cost;
				if (ratio > best[3]) { best = [i, upgrades[j], cost, ratio]; }
			}
		}
		return best;
	}


	function totalProduction() { // Returns the total production of all hacknet nodes.
		let total = 0;
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			total = total + ns.hacknet.getNodeStats(i).totalProduction;
		}
		return total;
	}


	function purchaseUpgrade(upgrade) { // Attempts to purchase an upgrade and returns a success bool.
		let returnVal;
		let type = upgrade[1];
		if (type == "newNode") { returnVal = ns.hacknet.purchaseNode(); }
		else { returnVal = ns.hacknet["upgrade" + type](upgrade[0], 1); }
		if (returnVal != -1 && returnVal != false) { return true; }
		else { return false; }
	}


	// Preparation for main loop
	ns.disableLog("ALL");
	ns.print("hacknetManagerV2 starting execution...");
	const upgrades = ["Level", "Ram", "Core"];
	var updateDelay = minUpdateDelay;
	async function resetExpenses() { await ns.write(path + "hacknetManagerV2Expenses.txt", 0, "w"); }
	// Support for resetting the expenses tracking file via terminal argument "resetExpenses".
	if (ns.args[0] == "resetExpenses") {
		if (await ns.prompt("Are you sure you would like to reset hacknetManager expenses? This cannot be undone.")) {
			await resetExpenses();
			ns.print("Expenses have been reset.");
		}
	}
	// Check if the expenses tracking file exists and create it if necessary.
	if (!ns.fileExists(path + "hacknetManagerV2Expenses.txt", "home")) {
		ns.print("Could not find expenses tracking file, creating it now.");
		await resetExpenses();
	}
	// If there are zero hacknet nodes, there must have been a reset. Then automatically reset expenses.
	if (ns.hacknet.numNodes() < 1) {
		ns.print("Detected a game reset (aug install, etc.), automatically resetting expenses.");
		await resetExpenses();
	}
	// Main loop
	while (true) {
		// First find the best value upgrade.
		let upgrade = bestUpgrade();
		let cost = upgrade[2];
		// Now read the total expenses from file and add the cost of the new upgrade.
		let expensesRaw = parseFloat(ns.read(path + "hacknetManagerV2Expenses.txt"));
		let expenses = expensesRaw + cost;
		// Try to purchase the upgrade.
		let production = totalProduction();
		if (money() > cost && (expenses < initialBudget || expenses < maxExpenses * production)) {
			if (purchaseUpgrade(upgrade)) {
				// Update the expenses file and report to the script log.
				updateDelay = minUpdateDelay;
				await ns.write(path + "hacknetManagerV2Expenses.txt", expenses, "w");
				ns.print("Purchased a new upgrade of type \"" + upgrade[1] + "\" for node " + upgrade[0] + ", costing $" + Math.round(upgrade[2]) + ".");
				expensesRaw = expenses; // Ensures that the correct value is printed to the log.
			}
			else {
				ns.print("Attempted to purchase an upgrade, but failed for some reason. Perhaps some other script used a large amount of money.");
			}
		}
		else { updateDelay = Math.min(updateDelay + 5000, idleUpdateDelay); }
		// Print some stats to the script log.
		ns.print("===              Hacknet Stats              ===");
		ns.print("Total production:             $" + Math.round(production));
		ns.print("Total expenses:               $" + Math.round(expensesRaw));
		ns.print("Total profit:                 $" + Math.round(production - expensesRaw));
		ns.print("===                Stats End                ===");
		// Finally, sleep for a bit.
		await ns.asleep(updateDelay);
	}
}