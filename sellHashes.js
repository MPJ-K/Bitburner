/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	/**
	 * This simple script will sell hashes according to the factor passed
	 * in the first argument. Example: Passing 0.5 will sell half of all
	 * your hashes.
	**/
	if (isNaN(ns.args[0])) {
		ns.tprint("Error: Sell factor is NaN");
		return;
	}
	const sellAmt = parseFloat(ns.args[0]);
	if (sellAmt < 0 || sellAmt > 1) {
		ns.tprint("Error: Sell factor must be a value from 0 to 1");
		return;
	}
	const hashToMoney = "Sell for Money";
	const hashToMoneyCost = ns.hacknet.hashCost(hashToMoney);
	const initialHashes = ns.hacknet.numHashes();
	const targetHashes = Math.max(initialHashes * (1 - sellAmt), hashToMoneyCost);
	let spentHashes = 0;
	while (ns.hacknet.numHashes() > targetHashes) {
		ns.hacknet.spendHashes(hashToMoney);
		spentHashes += hashToMoneyCost;
	}
	if (spentHashes > 0) { ns.tprint("Sold " + spentHashes + " hashes for money."); }
	else { ns.tprint("Not enough hashes to sell."); }
}