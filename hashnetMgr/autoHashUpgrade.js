import { log } from "/utils/helpers.js"

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");

	/**
	 * README
	 * 
	 * This simple script will purchase the selected hash upgrade until a configurable cost and/or level
	 * threshold is reached. Default settings are determined by the settings area below, but these can be
	 * overwritten using arguments of the same name. For example: --targetUpgrade "Improve Gym Training"
	**/


	// SETTINGS

	const targetUpgrade = "Improve Studying";
	// The target upgrade
	const hashBudget = 1;
	// This setting determines the fraction of the total hash capacity that may be used to purchase
	// upgrades. Its value cannot exceed 1. Default: 1
	const costThreshold = 60;
	// Upgrades will be purchased until the cost of the next upgrade level exceeds the current hashrate 
	// multiplied by this value. In other words, it will take costThreshold seconds to cover the cost of
	// the next upgrade. Set this to Infinity to disable the threshold. Default: 60
	const levelThreshold = Infinity;
	// The script will stop purchasing upgrades when the level of the upgrade is greater than or equal to
	// this value. Set this to Infinity to disable the threshold. Default: Infinity

	// END OF SETTINGS


	// Returns the combined hashrate of all nodes.
	function getHashrate() {
		let sum = 0;
		for (let i = 0; i < ns.hacknet.numNodes(); i++) { sum += ns.hacknet.getNodeStats(i).production; }
		return sum;
	}


	// Simple function to exit gracefully when a stop condition is triggered.
	function stop() {
		log(ns, `SUCCESS: autoHashUpgrade.js stopped running because one of the set stop conditions was met`, true);
		ns.exit();
	}


	// Variable preparation
	const argsSchema = [
		["help", false],
		["targetUpgrade", targetUpgrade],
		["hashBudget", hashBudget],
		["costThreshold", costThreshold],
		["levelThreshold", levelThreshold]
	];
	const options = ns.flags(argsSchema);
	const upgrades = ns.hacknet.getHashUpgrades().filter(upg => !["Sell for Money", "Reduce Minimum Security", "Increase Maximum Money"].includes(upg));
	const sleepTime = 60e3;


	// Preparation for main loop
	// Optinally print help information.
	if (options.help) {
		log(ns, `\nSupported arguments:\n`
			+ `--targetUpgrade ["string"]\n--hashBudget [number between 0 and 1]\n--costThreshold [number]\n--levelThreshold [number]\n`
			+ `For more detailed argument descriptions, please read the settings section inside autoHashUpgrade.js`, true);
		ns.exit();
	}
	// Check if the target upgrade is valid.
	if (!upgrades.includes(options.targetUpgrade)) {
		log(ns, `ERROR: targetUpgrade is not a valid hash upgrade`, true);
		log(ns, `Valid hash upgrades (case sensitive):\n${JSON.stringify(upgrades, null, 1)}`, true);
		ns.exit();
	}
	log(ns, `autoHashUpgrade.js starting execution using the following settings: ${JSON.stringify(options, null, 1)}`);
	log(ns, `Purchase attempts will start in approximately ${sleepTime} ms`, true);
	let level = ns.hacknet.getHashUpgradeLevel(options.targetUpgrade);
	let cost = ns.hacknet.hashCost(options.targetUpgrade);
	// Main loop
	while (true) {
		// Wait at the start of the loop to allow the user to cancel the script before any purchases happen.
		await ns.sleep(sleepTime);
		// Attempt to purchase upgrades while the set conditions are met.
		let purchases = 0;
		while (ns.hacknet.numHashes() > cost && ns.hacknet.numHashes() - cost > (1 - Math.min(options.hashBudget, 1)) * ns.hacknet.hashCapacity() && options.costThreshold * getHashrate() > cost) {
			if (level >= options.levelThreshold) {
				log(ns, `Purchased ${purchases} level(s) of hash upgrade ${options.targetUpgrade}, the target level of ${options.levelThreshold} has been reached`);
				stop();
			}
			if (ns.hacknet.spendHashes(options.targetUpgrade)) { purchases++; }
			level = ns.hacknet.getHashUpgradeLevel(options.targetUpgrade);
			cost = ns.hacknet.hashCost(options.targetUpgrade);
		}
		if (purchases > 0) { log(ns, `Purchased ${purchases} level(s) of hash upgrade ${options.targetUpgrade}, current level is ${level}`); }
	}
}
