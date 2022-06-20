/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");

	/**
	 * README
	 * 
	 * Welcome to hashnetManager.js by MPJ. This script automates the upgrading of hashnet servers using best return
	 * on investment logic. It features high adjustability and, if properly configured, requires zero manual intervention.
	 * 
	 * The user can set a target profit margin, which is upheld by tracking the money spent and generated by the script.
	 * Manual hashnet purchases are not tracked and will cut into overall profits. Tracking is done using a file and
	 * therefore persists even when the script is killed. The tracking file is reset automatically when a soft game
	 * reset (aug install, etc.) is detected.
	 * 
	 * Other scripts are free to use hashes. However, because this script does not generate money directly by selling
	 * hashes (except during the early stages), it may significantly slow down the upgrading process.
	 * 
	 * Once all hashnet nodes are fully upgraded, the script no longer serves any purpose and will stop itself.
	 * The script accepts no arguments. Adjusting parameters is done through the settings below.
	 * 
	 * The code has a decent amount of comments, so feel free to explore and try to understand the inner workings.
	 * I am no professional programmer, please do not judge my code too harshly. ;-)
	 * 
	 * Important note #1: Even though the game calls hitting the hash cap a 'waste,' it causes no problems. Excess hashes
	 * are automatically converted to money by the game when hashrate is above 20 hashes per second.
	 * 
	 * Important note #2: This script bypasses the need for the Formulas API by using equations from the game's source code.
	 * This could be considered an exploit, so decide for yourself if you are okay with using the script.
	**/


	// SETTINGS

	const path = "/scripts/hashnetMgr/";
	// IMPORTANT: The file path to the folder in which the expenses tracking file is stored.
	// Default: The folder in which the script itself is stored
	const updateDelay = 5000;
	// Minimum delay between each update (main loop iteration) in milliseconds. Default: 5000
	const maxCyclesUntilUpgrade = 60000 / updateDelay;
	// The script will try to buy hashnet upgrades at least once every maxCyclesUntilUpgrade cycles.
	// One cycle is one main loop iteration. Default: 60000 / updateDelay (1 minute between upgrades)
	const maxCost = 0.5;
	// How much of your money (at time of purchase) may be used to purchase new nodes or upgrades.
	// This value is a multiplier. Default: 0.1
	const initialBudget = 1e+9;
	// The inital amount of money the script is allowed to spend to get the hashnet going,
	// unrestricted by maxExpenses. This setting is hard capped using Math.max() to at least allow
	// the purchase of the first hashnet node. Default: 1e+9
	const maxExpenses = 1;
	// How much of the hashnet's total monetary production may be used to purchase new nodes
	// or upgrades. This value is a multiplier. A value of 1 results in breaking even. Default: 1
	const forceNewNodeThreshold = 0.125;
	// Forces the purchase of a new node when the next upgrade costs more than this factor multiplied
	// by the cost of the new node. A low value (<= 1) will result in faster node purchases, while
	// a high value (> 1) will shift focus towards upgrading existing nodes. For optimal production,
	// a value below 1 is recommended. Default: 0.125
	const minHashrate = 21;
	// Hashes will be sold for money until this total hashrate (hashes per second) is reached.
	// This setting is hard capped using Math.max() to be at least 20 (the game does not auto-sell
	// hashes at hashrates below 20). Default: 20
	const keptHashesMult = 60;
	// While under the effect of minHashrate, this setting determines the amount of hashes kept
	// in storage. The amount of kept hashes is this factor multiplied by the current hashrate.
	// Low values (or even zero) is recommended to speed up the early stages of the hashnet.
	// This setting is capped to slightly below the current hash capacity for safety. Default: 60
	const minFillTime = 300;
	// The minimum amount of time in seconds it should take to fill the entire hash capacity.
	// Hashnet cache (hash capacity) will be upgraded in attempt to uphold this.
	// Using very large values is NOT recommended. This setting is only meant to control the
	// upgrading of the hashnet cache. Default: 300 (5 minutes)

	// END OF SETTINGS


	// WARNING: CHANGING ANY CODE BEYOND THIS POINT IS NOT RECOMMENDED UNLESS YOU KNOW WHAT YOU ARE DOING


	// Reads the expenses tracking file and returns the contents.
	function getExpenses() { return parseFloat(ns.read(expensesFile)); }


	// Writes a value to the expenses tracking file.
	async function setExpenses(value) { await ns.write(expensesFile, value, "w"); }


	// Returns the current maximum cost of any purchase made by the script.
	function budget() { return maxCost * ns.getServerMoneyAvailable("home"); }


	// Used to close the script after every node has been fully upgraded.
	function allDone() {
		const msg = "The hashnet has been fully upgraded. hashnetManager.js will now stop execution.";
		ns.print(msg);
		ns.tprint(msg);
		ns.exit();
	}


	// Returns the combined hashrate of all nodes.
	function getHashrate() {
		let sum = 0;
		for (let i = 0; i < ns.hacknet.numNodes(); i++) { sum += ns.hacknet.getNodeStats(i).production; }
		return sum;
	}


	/**
	 * Super awesome function that calculates the total monetary revenue generated by
	 * all hashnet nodes. How is this possible? Calculate the total number of hashes
	 * spent on upgrades (excluding "Sell for Money") and subtract it from the total
	 * number of generated hashes minus the current amount of stored hashes.
	 * The result will be the amount of hashes that were converted to money.
	**/
	function getRevenue() {
		// Calculate the total hash production across all nodes.
		let totalProduction = 0;
		for (let i = 0; i < ns.hacknet.numNodes(); i++) { totalProduction += ns.hacknet.getNodeStats(i).totalProduction; }
		// For each hash upgrade, calculate the total cost.
		// The cost function for all upgrades is baseCost * level, so using math
		// identities for Sigma: totalCost = baseCost*level*(level+1)/2
		let totalCost = 0;
		for (let i = 0; i < hashUpgrades.length; i++) {
			const level = ns.hacknet.getHashUpgradeLevel(hashUpgrades[i]);
			totalCost += hashUpgradesCost[i] * level * (level + 1) / 2;
		}
		// Calculate and return the total revenue.
		return (totalProduction - ns.hacknet.numHashes() - totalCost) * 250000;
	}


	/**
	 * Determines the best overall upgrade by checking the production increase to cost ratio.
	 * Returns an array "best", containing the following information about the best upgrade:
	 * [node index, upgrade type, upgrade cost, production / cost ratio].
	**/
	function getBestUpgrade() {
		const nodes = ns.hacknet.numNodes();
		// Start with the option of buying a new node.
		const newCost = ns.hacknet.getPurchaseNodeCost();
		const newNode = [nodes, "newNode", newCost, baseHashRate / newCost];
		let best = newNode;
		for (let i = 0; i < nodes; i++) {
			const stats = ns.hacknet.getNodeStats(i);
			let pIncr = [];
			// Level upgrade
			pIncr.push(baseHashRate * Math.pow(1.07, Math.log2(stats.ram)) * (1 + (stats.cores - 1) / 5));
			// Ram upgrade
			pIncr.push(stats.level * baseHashRate * (Math.pow(1.07, Math.log2(stats.ram) + 1) - Math.pow(1.07, Math.log2(stats.ram))) * (1 + (stats.cores - 1) / 5));
			// Core upgrade
			pIncr.push(stats.level * baseHashRate * Math.pow(1.07, Math.log2(stats.ram)) / 5);
			// Test for a new best upgrade.
			for (let j = 0; j < upgrades.length; j++) {
				const cost = ns.hacknet["get" + upgrades[j] + "UpgradeCost"](i);
				const ratio = pIncr[j] / cost;
				if (ratio > best[3]) { best = [i, upgrades[j], cost, ratio]; }
			}
		}
		// Prioritize buying a new node if the best upgrade is more expensive than a new node.
		// A new node grants access to low level upgrades, which have good return on investment.
		if (best[2] > forceNewNodeThreshold * newCost) { best = newNode; }
		return best;
	}


	// Attempts to purchase an upgrade and returns a success boolean.
	function purchaseUpgrade(upgrade) {
		const type = upgrade[1];
		let returnVal = false;
		if (type == "newNode") { returnVal = ns.hacknet.purchaseNode(); }
		else { returnVal = ns.hacknet["upgrade" + type](upgrade[0], 1); }
		if (returnVal !== -1 && returnVal !== false) {
			ns.print("Purchased an upgrade of type \"" + type + "\" for node " + upgrade[0] + ", costing " + ns.nFormat(upgrade[2], "$0.000a") + ".");
			return true;
		}
		else {
			ns.print("Attempted to purchase an upgrade, but failed for some reason. Perhaps some other script used a large amount of money.");
			return false;
		}
	}


	// Purchases upgrades until budget runs out.
	// Returns a boolean indicating whether or not any purchases were made.
	async function upgradeNodes() {
		const revenue = getRevenue();
		const initialExpenses = getExpenses();
		let upgrade = [];
		let expenses = initialExpenses;
		let done = false;
		while (!done) {
			// Find the best value upgrade.
			upgrade = getBestUpgrade();
			const cost = upgrade[2];
			// If the best upgrade has Infinite cost, everything is maxed out.
			if (cost == Infinity) {
				upgradesMaxed = true;
				ns.print("Maxed out hashnet upgrades!");
				if (cacheMaxed) { allDone(); }
				break;
			}
			// Try to purchase the upgrade.
			if (budget() > cost && (expenses + cost < maxExpenses * revenue || expenses < initialBudgetSafe)) {
				if (purchaseUpgrade(upgrade)) { expenses += cost; }
			}
			else { done = true; }
		}
		// Check whether or not any purchases were made and update the expenses file accordingly.
		if (expenses != initialExpenses) {
			ns.print("Next upgrade: Type \"" + upgrade[1] + "\" for node " + upgrade[0] + ", costing " + ns.nFormat(upgrade[2], "$0.000a") + ".");
			ns.print("Production: " + ns.nFormat(revenue, "$0.000a") + " | Expenses: " + ns.nFormat(expenses, "$0.000a") + " | Profit: " + ns.nFormat(revenue - expenses, "$0.000a"));
			await setExpenses(expenses);
			return true;
		}
		else { return false; }
	}


	// Attempts to upgrade the cache of the node with the lowest cache level
	// until the time required to fill the current hash capacity exceeds minFillTime.
	async function upgradeNodeCache() {
		const hashrate = getHashrate();
		const nodes = ns.hacknet.numNodes();
		const revenue = getRevenue();
		const initialExpenses = getExpenses();
		let expenses = initialExpenses;
		let minCost = Infinity;
		let target = 0;
		let done = false;
		while (!done && ns.hacknet.hashCapacity() / hashrate < minFillTime) {
			minCost = Infinity;
			for (let i = 0; i < nodes; i++) {
				const cost = ns.hacknet.getCacheUpgradeCost(i);
				if (cost < minCost) {
					target = i;
					minCost = cost;
				}
			}
			if (budget() > minCost && (expenses + minCost < maxExpenses * revenue || expenses < initialBudgetSafe)) {
				if (purchaseUpgrade([target, "Cache", minCost])) { expenses += minCost; }
			}
			else { done = true; }
		}
		// Set a flag when all nodes have max cache.
		if (minCost == Infinity && nodes >= ns.hacknet.maxNumNodes()) {
			cacheMaxed = true;
			ns.print("Maxed out hashnet cache!");
			if (upgradesMaxed) { allDone(); }
		}
		// Check whether or not any purchases were made and update the expenses file accordingly.
		if (expenses != initialExpenses) {
			ns.print("Production: " + ns.nFormat(revenue, "$0.000a") + " | Expenses: " + ns.nFormat(expenses, "$0.000a") + " | Profit: " + ns.nFormat(revenue - expenses, "$0.000a"));
			await setExpenses(expenses);
		}
	}


	// Variable preparation
	const expensesFile = path + "expenses.txt";
	const upgrades = ["Level", "Ram", "Core"];
	const baseHashRate = 0.001;
	const hashToMoney = "Sell for Money";
	const hashToMoneyCost = ns.hacknet.hashCost(hashToMoney);
	const hashUpgrades = ns.hacknet.getHashUpgrades().filter(upg => upg != hashToMoney);
	const hashUpgradesCost = hashUpgrades.map(upg => ns.hacknet.hashCost(upg) / (ns.hacknet.getHashUpgradeLevel(upg) + 1));

	let initialBudgetSafe = initialBudget;
	let upgradeCycles = 0;
	let passedCycles = 0;
	let upgradesMaxed = false;
	let cacheMaxed = false;


	// Preparation for main loop
	// Check if the expenses tracking file exists and create it if necessary.
	if (!ns.fileExists(expensesFile, "home")) {
		ns.print("Could not find the expenses tracking file, creating it now.");
		await setExpenses(0);
	}
	// If there are zero hacknet nodes, there must have been a reset.
	// Then automatically reset expenses and ensure that at least one node can be purchased.
	if (ns.hacknet.numNodes() < 1) {
		ns.print("Detected a game reset (aug install, etc.), automatically resetting expenses.");
		await setExpenses(0);
		initialBudgetSafe = Math.max(initialBudget, 1.1 * ns.hacknet.getPurchaseNodeCost());
	}
	// Main loop
	while (true) {
		// If hashrate is below minHashrate, sell hashes to speed up the early upgrades.
		const hashrate = getHashrate();
		let sellCount = 0;
		if (hashrate < Math.max(minHashrate, 20)) {
			// Some math logic to fool-proof maxHashes, the while loop may get stuck otherwise.
			const maxHashes = Math.max(Math.min(keptHashesMult * hashrate, ns.hacknet.hashCapacity() - hashToMoneyCost - (1.2 * hashrate * updateDelay / 1000)), hashToMoneyCost);
			while (ns.hacknet.numHashes() > maxHashes) {
				ns.hacknet.spendHashes(hashToMoney);
				sellCount++;
			}
		}
		if (sellCount > 0) { ns.print("Sold " + (hashToMoneyCost * sellCount) + " hashes for " + ns.nFormat(sellCount * 1e6, "$0.000a") + "."); }
		// Purchase upgrades until budget runs out. Skipped when everything is maxed out.
		if (!upgradesMaxed) {
			passedCycles++;
			if (passedCycles >= upgradeCycles) {
				passedCycles = 0;
				// If no purchases could be made, increase upgradeCycles.
				if (await upgradeNodes()) { upgradeCycles = 0; }
				else { upgradeCycles = Math.min(upgradeCycles + Math.round(maxCyclesUntilUpgrade / 6), maxCyclesUntilUpgrade); }
			}
		}
		// If budget allows, upgrade hashnet cache. Only runs if no upgrades could be purchased for
		// a long time. Always runs when other upgrades are maxed out.
		if (!cacheMaxed && (upgradeCycles >= maxCyclesUntilUpgrade || upgradesMaxed)) { await upgradeNodeCache(); }
		// Sleep for a bit.
		await ns.sleep(updateDelay);
	}
}