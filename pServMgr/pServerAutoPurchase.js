/** @param {NS} ns **/
export async function main(ns) {
	const amount = ns.args[0];
	const ram = ns.args[1];
	const pServers = ns.getPurchasedServers();
	let purchased = 0;
	let hostNumber = 0;
	for (let i = 0; i < pServers.length; i++) {
		const serv = pServers[i];
		const servIndex = parseInt(serv.slice(serv.indexOf("B") + 1));
		if (parseInt(serv.slice(7)) == ram && servIndex >= hostNumber) { hostNumber = servIndex + 1; }
	}
	while (purchased < amount) {
		if (ns.getPurchasedServerCost(ram) < ns.getServerMoneyAvailable("home")) {
			let hostname = "pServer" + ram + "GB" + (hostNumber + purchased);
			ns.purchaseServer(hostname, ram);
			ns.tprint("Purchased a " + ram + "GB server with hostname " + hostname + ".");
			purchased++;
		}
		else {
			await ns.sleep(60000);
		}
	}
}
