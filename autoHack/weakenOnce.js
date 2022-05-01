/** @param {NS} ns **/
export async function main(ns) {
	// Weakens the target hostname once. The target is passed in the first argument.
	ns.disableLog("ALL");
	await ns.weaken(ns.args[0]);
}
