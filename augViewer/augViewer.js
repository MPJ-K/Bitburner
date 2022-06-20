import { hasSourceFile } from "/utils/helpers.js"
import { generalAugLibrary } from "/scripts/augViewer/augLibrary.js"

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");

	/**
	 * README
	 * 
	 * This script allows searching through all general augmentations in the game using
	 * configurable search conditions. All user input is accepted through ns.prompt.
	 * The only exception is passing "last" as the first argument, which will pull up
	 * the most recent search result.
	 * 
	 * IMPORTANT: Set the 'path' variable below to the folder this script is stored in.
	 * Also, do not forget to ensure that the helpers and augLibrary imports located at
	 * the very top of the script have correct paths!
	 * 
	 * WARNING: The imported hasSourceFile function contains potential story spoilers!
	 * This script itself does not contain spoilers.
	**/


	const path = "/scripts/augViewer/";


	// Variable preparation
	const bonusFilterList = [
		"done",
		"hacking_mult", "strength_mult", "defense_mult", "dexterity_mult", "agility_mult",
		"charisma_mult", "hacking_exp_mult", "strength_exp_mult", "defense_exp_mult",
		"dexterity_exp_mult", "agility_exp_mult", "charisma_exp_mult", "hacking_chance_mult",
		"hacking_speed_mult", "hacking_money_mult", "hacking_grow_mult", "company_rep_mult",
		"faction_rep_mult", "crime_money_mult", "crime_success_mult", "work_money_mult",
		"hacknet_node_money_mult", "hacknet_node_purchase_cost_mult", "hacknet_node_ram_cost_mult",
		"hacknet_node_core_cost_mult", "hacknet_node_level_cost_mult", "bladeburner_max_stamina_mult",
		"bladeburner_stamina_gain_mult", "bladeburner_analysis_mult", "bladeburner_success_chance_mult",
		"infiltration_base_rep_increase", "infiltration_rep_mult", "infiltration_trade_mult",
		"infiltration_sell_mult", "infiltration_timer_mult", "infiltration_damage_reduction_mult",
		"startingMoney", "programs"
	];
	const factionFilterList = [
		"done", "current factions",
		"Illuminati", "Daedalus", "The Covenant", "ECorp", "MegaCorp", "Bachman & Associates",
		"Blade Industries", "NWO", "Clarke Incorporated", "OmniTek Incorporated", "Four Sigma",
		"KuaiGong International", "Fulcrum Secret Technologies", "BitRunners", "The Black Hand",
		"NiteSec", "Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12", "Volhaven",
		"Speakers for the Dead", "The Dark Army", "The Syndicate", "Silhouette", "Tetrads",
		"Slum Snakes", "Netburners", "Tian Di Hui", "CyberSec", "Bladeburners",
		"Church of the Machine God", "Shadows of Anarchy"
	];
	const sortOptions = ["Default order", "Cost", "Reputation"];


	// Filter function
	function filterAugs(aug) {
		return (
			(bonusFilters.length > 0 ? bonusFilters.some(fltr => aug[fltr] ? true : false) : true) &&
			(factionFilters.length > 0 ? factionFilters.some(fltr => aug.factions.includes(fltr)) : true) &&
			(filterOwned ? !ownedAugs.includes(aug.name) : true)
		);
	}


	// Sort function
	function sortAugs(a, b) {
		if (sortOrder == sortOptions[1]) { return a.moneyCost - b.moneyCost; }
		if (sortOrder == sortOptions[2]) { return a.repCost - b.repCost; }
	}


	// Function to convert augmentation data to more readable form
	function visualize(aug) {
		function listStats() {
			let str = ``;
			bonusFilterList.forEach(fltr => str += aug[fltr] ? `----${fltr}: ${aug[fltr]}\n` : ``);
			return str;
		}

		function listFactions() {
			let str = ``;
			if (aug.factions) { aug.factions.forEach(faction => str += `${faction}, `); }
			return str.length > 0 ? str.slice(0, str.length - 2) : str;
		}

		return (
			`NAME: .............. ${aug.name}\n` +
			`BASE COST: ......... ${ns.nFormat(aug.moneyCost, "$0.000a")}\n` +
			`REPUTATION COST: ... ${ns.nFormat(aug.repCost, "0.000a")}\n` +
			`MULTIPLIERS:\n${listStats()}` +
			`FACTIONS: .......... ${listFactions()}\n` +
			`INFO: ${aug.info}\n` +
			(aug.stats ? `${aug.stats}\n\n` : `\n`)
		);
	}


	// Code for the "last" argument
	if (ns.args[0] == "last") {
		if (ns.fileExists(path + "lastResult.txt")) { ns.alert(ns.read(path + "lastResult.txt")); }
		else { ns.tprint(`ERROR: Could not display the last result because it does not exist`); }
		ns.exit();
	}

	// Get search conditions from the user
	ns.tprint(
		`Please select the desired search conditions and sort order through the prompts...\n` +
		`Note: Stats and faction filters use OR logic, while their combination uses AND logic`
	);

	let bonusFilters = [];
	while (true) {
		const filter = await ns.prompt(
			`Select stat multiplier filters and then select "done"`,
			{ type: "select", choices: bonusFilterList.filter(fltr => !bonusFilters.includes(fltr)) }
		);
		if (filter == "done") { break; }
		bonusFilters.push(filter);
		ns.tprint(`Added stat multiplier filter: ${filter}`);
	}

	let factionFilters = [];
	while (true) {
		const filter = await ns.prompt(
			`Select faction filters and then select "done"`,
			{ type: "select", choices: factionFilterList.filter(fltr => !factionFilters.includes(fltr)) }
		);
		if (filter == "done") { break; }
		// Handy feature that adds all of the player's current factions
		if (filter == "current factions") {
			for (const faction of ns.getPlayer().factions) {
				if (!factionFilters.includes(faction)) { factionFilters.push(faction); }
			}
			ns.tprint(`Added faction filter: current factions`);
			continue;
		}
		factionFilters.push(filter);
		ns.tprint(`Added faction filter: ${filter}`);
	}

	// Allow filtering by owned augmentations if the player has access to singularity functions
	let ownedAugs = [];
	let filterOwned = false;
	if (hasSourceFile(ns, 4)) {
		if (await ns.prompt(`Filter out owned augmentations?`)) {
			filterOwned = true;
			// Create and run another script to collect the singularity data.
			// This prevents massively increasing the RAM cost of this script.
			await ns.write(
				path + "getOwnedAugs.js",
				`export async function main(ns) { await ns.write("${path}ownedAugs.txt", ` +
				`JSON.stringify(ns.singularity.getOwnedAugmentations()), "w"); }`,
				"w"
			);
			await ns.sleep(50);
			if (ns.run(path + "getOwnedAugs.js") == 0) {
				ns.tprint(`WARNING: Could not retrieve owned augmentations, home may be out of RAM`);
				filterOwned = false;
			}
			else {
				let attempts = 0;
				do {
					await ns.sleep(50);
					attempts++;
				}
				while (!ns.fileExists(path + "ownedAugs.txt") && attempts < 10);
				ownedAugs = JSON.parse(ns.read(path + "ownedAugs.txt"));
				ns.rm(path + "ownedAugs.txt");
			}
		}
	}
	else {
		ns.tprint(
			`INFO: Filtering owned augmentations is not available because you do not have access to ` +
			`singularity functions. These functions can be unlocked by progressing the game. To avoid ` +
			`story spoilers, no further information can be provided.`
		);
	}

	const sortOrder = await ns.prompt(`Select the desired sort order`, { type: "select", choices: sortOptions });

	// Apply the search conditions and print the result
	let searchResult = generalAugLibrary.filter(aug => filterAugs(aug));
	if (sortOrder != sortOptions[0]) { searchResult.sort((a, b) => sortAugs(a, b)); }
	if (searchResult.length < 1) {
		ns.alert(
			`No results matching the selected search conditions could be found.\n` +
			`Please try again with fewer search conditions.`
		);
	}
	else {
		let printResult = ``;
		searchResult.forEach(res => printResult += visualize(res));
		ns.alert(printResult);
		await ns.write(path + "lastResult.txt", printResult, "w");
		ns.tprint(`INFO: Search result saved as ${path}lastResult.txt`);
	}
}
