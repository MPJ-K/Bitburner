/** @param {NS} ns **/
export async function main(ns) {
	// Hacks the target hostname once. The target is passed in the first argument.
	ns.disableLog("ALL");
	await ns.hack(ns.args[0]);
}