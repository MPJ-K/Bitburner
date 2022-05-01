/** @param {NS} ns **/
export async function main(ns) {
	// Grows the target hostname once. The target is passed in the first argument.
	ns.disableLog("ALL");
	await ns.grow(ns.args[0]);
}