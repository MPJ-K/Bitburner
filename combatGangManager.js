/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	ns.tail();


	// README
	// Welcome to "combatGangManager.js" by MPJ.
	// This is (to my untrained eye) an advanced combat gang management script that aims to
	// reach 100% territory control as fast as possible while preventing gang member deaths.
	// It features a territory tick predictor that can anticipate the game's territory
	// update ticks that happen approximately once every 20 seconds. This allows only briefly
	// assigning members to territory warfare during ticks to grow gang power, while time
	// between ticks can be used to make money or do other tasks. Member deaths are prevented
	// by ensuring they are never assigned to territory warfare while engaging in it.
	// The behavior of the script can be customized by adjusting the settings below.
	// Currently the best time to 100% territory is about 20 hours with default settings.
	// The code has some comments, but they do not go into that much detail. I may update
	// the comments later.
	// I am by no means a professional programmer and for all I know this code could be
	// terribly inefficient, but I tried my best and really enjoyed writing this script.


	// SETTINGS

	const safety = true;
	// Enabling this setting will assign all members to training and disable territory warfare
	// when the script dies for whatever reason. This puts the gang in a state where it should
	// not be possible for anything bad to happen. If disabled, members will keep whatever task
	// they had when the script died and warfare will remain in whatever state it was in.
	// Does nothing when quitting the game itself. When installing augmentations, this will
	// not work and cause an error message to appear. Default: true
	const maxMemberCount = 12;
	// Maximum number of members that can be recruited. The game's hard limit is 12
	// and the script will respect it regardless of this setting. Default: 12
	const maxUpdateDelay = 5000;
	// Maximum delay between updates such as task assignments or ascending in ms.
	// The script may choose to run faster than this setting, but never slower. Default: 5000
	const ascensionThreshold = 1.25;
	// How much higher the average ascension bonus multiplier must become after ascending
	// with respect to the current average. This value is a multiplier. Default: 1.25
	const equipmentPurchases = true;
	// Whether or not to purchase equipment at all. Default: true
	const excludedEquipment = [];
	// Equipment that the script will never purchase. This should be an array of strings.
	// By default, it will be all upgrades that do not provide any combat benefits:
	// ["NUKE Rootkit", "Soulstealer Rootkit", "Demon Rootkit", "Hmap Node", "Jack the Ripper", "BitWire", "Neuralstimulator", "DataJack"]
	const maxCost = 0.5;
	// How much of the player's current money may be used to purchase equipment for
	// gang members. This value is a multiplier. Default: 0.1
	const equipThreshold = 7;
	// How high a member's average ascension stat multiplier must be before purchasing any
	// non-augmentation equipment for them. If set to a low value, a lot of money will be
	// 'wasted' on buying equipment that disappears due to ascending. Default: 7
	const minStats = 200;
	// The minimum total combat stat levels a member must have before being allowed to do
	// anything other than training. Default: 200
	const minOpsStats = 3000;
	// The minimum total combat stat levels a member must have before being allowed to do
	// operations such as terrorism or money making. Default: 3000
	const statsThreshold = 0.67;
	// Members will be trained until their total combat stat levels are above this factor
	// multiplied by the highest stat member in the gang. Default: 0.67
	const trainChance = 0.25;
	// When no other important tasks are available, members will first increase respect to the
	// set minimum and otherwise make money. This option represents the chance that, when
	// performing one of these tasks, the member will train instead. Default: 0.25
	const warfareWinChance = 0.9;
	// How high the chance to win a clash must be to engage in territory warfare.
	// Note: The required gang power will be x/(1-x) times higher than the highest enemy power,
	// where x is the warfareWinChance. This function has an asymptote to infinity when approaching
	// 100% win chance (x=1), so using values very close to 1 is NOT recommended. For safety,
	// the value is hard-capped at around 0.99. Setting it higher does nothing. Default: 0.9
	const maxWantedLevel = Infinity;
	// The maximum wanted level before assigning members to reduce it.
	// Will OR with maxWantedPenalty. Default: Infinity
	const maxWantedPenalty = 0.99995;
	// The maximum wanted penalty before assigning members to reduce it.
	// Will OR with maxWantedLevel. Default: 0.99995
	const minRespect = 2e+6;
	// The minimum amount of respect needed before assigning members to make money.
	// Default: 2e+6

	// END OF SETTINGS


	// WARNING: CHANGING ANY CODE BEYOND THIS POINT IS NOT RECOMMENDED UNLESS YOU KNOW WHAT YOU ARE DOING


	function money() { return ns.getServerMoneyAvailable("home") * maxCost; }


	function recruit() { // Recruits as many members as possible.
		let members = ns.gang.getMemberNames();
		while (ns.gang.canRecruitMember() && members.length < maxMembers) {
			members = ns.gang.getMemberNames();
			let id = 0;
			while (members.includes("member" + id)) { id++; }
			ns.gang.recruitMember("member" + id);
			ns.print("Recruited new member with name \"member" + id + "\"");
		}
	}


	function ascend() { // Will ascend any members that meet the requirements.
		let members = ns.gang.getMemberNames();
		for (let member of members) {
			let result = ns.gang.getAscensionResult(member);
			if (result) { // Checks if ascension is possible.
				if ((result.str + result.def + result.dex + result.agi) / 4 > ascensionThreshold) {
					ns.gang.ascendMember(member);
					ns.print(member + " ascended");
				}
			}
		}
	}


	function equip() { // Attempts to purchase equipment for all gang members.
		let members = ns.gang.getMemberNames();
		for (let eq of equipment) {
			for (let member of members) {
				if (money() > ns.gang.getEquipmentCost(eq)) {
					let stats = ns.gang.getMemberInformation(member);
					let averageMult = (stats.str_asc_mult + stats.def_asc_mult + stats.dex_asc_mult + stats.agi_asc_mult) / 4;
					if (!stats.upgrades.includes(eq) && !stats.augmentations.includes(eq) && (averageMult > equipThreshold || augEquipment.includes(eq))) {
						ns.gang.purchaseEquipment(member, eq);
						ns.print("Purchased " + eq + " for " + member);
					}
				}
				else { break; }
			}
		}
	}


	function getGangPowers() { // Returns an array containing the power of all other gangs.
		let otherGangsInfo = ns.gang.getOtherGangInformation();
		let powers = [];
		for (let gangName of otherGangNames) {
			powers.push(otherGangsInfo[gangName].power);
		}
		return powers;
	}


	function tickPredictor(tickTime) { // Updates the tickBuffer and returns the current average.
		if (tickBuffer.push(tickTime) > 3) { tickBuffer.shift(); }
		let sum = 0;
		for (let val of tickBuffer) { sum += val; }
		return sum / tickBuffer.length;
	}


	function getStatSum(member) { // Returns the sum of a member's combat stats.
		let info = ns.gang.getMemberInformation(member);
		return info.str + info.def + info.dex + info.agi;
	}


	function getBestStat() { // Returns the highest combat stats sum between all members.
		let members = ns.gang.getMemberNames();
		let bestStat = 0;
		for (let member of members) { bestStat = Math.max(bestStat, getStatSum(member)); }
		return bestStat;
	}


	function updateGang(warfare) { // Updates and assigns tasks to members.
		// Run member management functions.
		recruit();
		ascend();
		if (equipmentPurchases) { equip(); }
		// Check if the gang is powerful enough for territory warfare.
		let info = ns.gang.getGangInformation();
		if (!king) {
			let maxEnemyPower = 0;
			for (let pwr of currentPowers) { maxEnemyPower = Math.max(maxEnemyPower, pwr); }
			if (info.power > maxEnemyPower * warfareThreshold && info.territory < 1) {
				ns.gang.setTerritoryWarfare(true);
				warfare = false;
			}
			else {
				// Allow a small 1% margin before turning off warfare to prevent rapidly turning on and off.
				if (info.power * 1.01 < maxEnemyPower * warfareThreshold || info.territory == 1) { ns.gang.setTerritoryWarfare(false); }
				// The following check should completely prevent gang member deaths.
				if (info.territoryClashChance > 0) { warfare = false; }
				// The gang is "king" when it owns 100% territory and clash chance is zero.
				king = info.territory == 1 && info.territoryClashChance == 0;
			}
		}
		// Select the highest priority task applying to all members.
		let task = "";
		let members = ns.gang.getMemberNames();
		let bestStats = getBestStat();
		// If the wanted penalty is too large, do vigilante justice.
		// Else if the gang is not full or respect is low, gain respect.
		// Else make money (or train).
		if ((info.wantedLevel > maxWantedLevel || info.wantedPenalty < maxWantedPenalty) && info.wantedLevel > 1000) { task = "Vigilante Justice"; }
		else if (members.length < maxMembers || info.respect < minRespect) { task = "Terrorism"; }
		else { task = "Human Trafficking"; }
		// Now assign the tasks, with member specific tasks taking priority.
		for (let member of members) {
			let memTask = task;
			let sum = getStatSum(member);
			// If member stats are too low, train.
			// Else if this is a safe territory tick, do territory warfare.
			// Else if the gang is less than half of its maximum size, mug people to gain respect.
			// Else if stats are too low for terrorism or compared to other members, train.
			// Also, if the task is not vigilante justice, there is a random chance to train.
			// Else do the previously selected task.
			if (sum < minStats) { memTask = "Train Combat"; }
			else if (warfare) { memTask = "Territory Warfare"; }
			else if (members.length < maxMembers / 2) { memTask = "Mug People"; }
			else if (sum < Math.max(minOpsStats, bestStats * statsThreshold) || (task != "Vigilante Justice" && Math.random() < trainChance)) { memTask = "Train Combat"; }
			ns.gang.setMemberTask(member, memTask);
		}
		// When doing vigilante justice, speed up the next task update to avoid wasting time.
		if (task == "Vigilante Justice") { lastUpdate = Date.now() - (0.75 * maxUpdateDelay); }
		else { lastUpdate = Date.now(); }
	}


	// If not in a gang, report the error and exit.
	if (!ns.gang.inGang()) {
		ns.tprint("Error: You are currently not in any gang. Join a gang and try again.");
		return;
	}


	// If safety is on, assign everyone to training and disable territory warfare when the script dies for whatever reason.
	if (safety) {
		ns.atExit(() => {
			ns.gang.setTerritoryWarfare(false);
			let members = ns.gang.getMemberNames();
			for (let member of members) { ns.gang.setMemberTask(member, "Train Combat"); }
		});
	}


	// VARIABLE PREPARATION

	// Information constants:
	const otherGangNames = ["Slum Snakes", "Speakers for the Dead", "The Black Hand", "The Dark Army", "The Syndicate", "NiteSec", "Tetrads"].filter(function (item) { return item != ns.gang.getGangInformation().faction; });
	const equipment = ns.gang.getEquipmentNames().filter(function (item) { return !excludedEquipment.includes(item); });
	const augEquipment = ns.gang.getEquipmentNames().slice(-11);
	const warfareThreshold = Math.min(warfareWinChance / (1 - warfareWinChance), 99);
	const maxMembers = Math.min(maxMemberCount, 12);
	// Territory tick predictor variables:
	let lastTick = Date.now();
	let lastPowers = getGangPowers();
	let currentPowers = lastPowers;
	let tickBuffer = [];
	let expectedTickTime = 20000;
	let expectingTick = false;
	let king = false;
	// Other:
	let lastUpdate = Date.now();

	// END VARIABLE PREPARATION


	// Main loop
	while (true) {
		// Territory tick predictor loop code
		let now = Date.now();
		let sinceLastTick = now - lastTick;
		currentPowers = getGangPowers();
		// Check if gang powers have changed, which indicates that a territory tick happened.
		if (currentPowers.some((val, index) => val != lastPowers[index])) {
			expectedTickTime = tickPredictor(sinceLastTick);
			ns.print("Detected territory tick after " + sinceLastTick + " ms");
			ns.print("Next tick expected after " + expectedTickTime + " ms");
			lastTick = now;
			sinceLastTick = now - lastTick;
			lastPowers = currentPowers;
			expectingTick = false;
			if (!king) { updateGang(false); }
		}
		// Sleep time is a function of expectedTickTime to speed up the script during Bonus Time.
		let sleepTime = Math.floor(Math.pow(expectedTickTime, 0.6));
		// Anticipate incoming territory ticks, but not when the gang is king.
		if (sinceLastTick >= (expectedTickTime - (sleepTime * 2) - 50) && !expectingTick && !king) {
			expectingTick = true;
			ns.print("Expecting territory tick during next iteration (" + sinceLastTick + " ms since last tick)");
			updateGang(true);
		}
		// Ensure the gang is updated at the set minimum rate regardless of territory ticks.
		if (now - lastUpdate >= maxUpdateDelay) { updateGang(false); }
		await ns.asleep(sleepTime);
	}
}