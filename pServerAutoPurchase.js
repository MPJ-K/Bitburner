/** @param {NS} ns **/
export async function main(ns) {
	const amount = ns.args[0];
	const ram = ns.args[1];
	const pServers = ns.getPurchasedServers();
	var purchased = 0;
	var hostNumber = 0;
	var hostname = "tmp";
	for (let i = 0; i < pServers.length; i++) {
		let serv = pServers[i];
		let servRAM = parseInt(serv.slice(7));
		let servIndex = parseInt(serv.slice(serv.indexOf("B") + 1));
		if (servRAM == ram && servIndex >= hostNumber) { hostNumber = servIndex + 1; }
	}
	while (purchased < amount) {
		if (ns.getPurchasedServerCost(ram) < ns.getServerMoneyAvailable("home")) {
			hostname = "pServer" + ram + "GB" + (hostNumber + purchased);
			ns.purchaseServer(hostname, ram);
			ns.tprint("Purchased a " + ram + "GB server with hostname " + hostname + ".");
			purchased++;
		}
		else {
			await ns.sleep(60000);
		}
	}
}