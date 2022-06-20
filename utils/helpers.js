/**
 * README
 * 
 * This file contains useful functions that can be imported for use in other scripts.
 * Usage: import { function1, function2, ... } from "/utils/helpers.js"
**/


/**
 * This function is used to test whether "ns" is passed as the first argument to functions that
 * require it. An error will be thrown if "ns" is missing.
 * @param {NS} ns
**/
function testNS(ns, source = "this function") {
	if (!ns.print) { throw new Error(`The first argument of ${source} must be "ns"`); }
}


/**
 * A simple logging function that can optionally print to the terminal or toast.
 * @param {NS} ns
**/
export function log(ns, message = "", toTerminal = false, toastType = "", toastTime = 2000) {
	testNS(ns, "log");
	ns.print(message);
	if (toTerminal) { ns.tprint(message); }
	if (toastType) { ns.toast(message, toastType, toastTime); }
}


/**
 * A simple function that formats the input number as a dollar amount.
 * The 'decimals' argument specifies the number of decimal spaces. Defaults to the maximum of 3.
 * @param {NS} ns
**/
export function formatMoney(ns, number, decimals = 3) {
	testNS(ns, "formatMoney");
	if (decimals <= 0) { return ns.nFormat(number, "$0a"); }
	return ns.nFormat(number, "$0." + "0".repeat(Math.min(decimals, 3)) + "a");
}


/**
 * A simple function that formats the input number as a byte amount.
 * The 'decimals' argument specifies the number of decimal spaces. Defaults to the maximum of 3.
 * The 'multiplier' argument specifies a multiplier applied to the input number. It defaults to
 * 1 billion to adjust for the game's tendency to supply GB amounts instead of B amounts.
 * @param {NS} ns
**/
export function formatBytes(ns, number, decimals = 3, multiplier = 1e9) {
	testNS(ns, "formatBytes");
	if (decimals <= 0) { return ns.nFormat(multiplier * number, "0b"); }
	return ns.nFormat(multiplier * number, "0." + "0".repeat(Math.min(decimals, 3)) + "b");
}


/**
 * A simple function that formats the input number as a percentage.
 * The 'decimals' argument specifies the number of decimal spaces. Defaults to the maximum of 3.
 * @param {NS} ns
**/
export function formatPercent(ns, number, decimals = 3) {
	testNS(ns, "formatPercent");
	if (decimals <= 0) { return ns.nFormat(number, "0%"); }
	return ns.nFormat(number, "0." + "0".repeat(Math.min(decimals, 3)) + "%");
}


/**
 * Returns true if the player currently has access to the specified source file level.
 * If the minimum level is zero (or unspecified), then the function will also return true if
 * the player is currently inside the bitNode with the same number as the specified source file.
 * Otherwise, the function will return false.
 * @param {NS} ns
**/
export function hasSourceFile(ns, fileNumber = 1, minLevel = 0) {
	testNS(ns, "hasSourceFile");
	const sourceFile = ns.getOwnedSourceFiles().find(file => file.n == fileNumber);
	if (sourceFile) { if (sourceFile.lvl >= minLevel) { return true; } }
	else if (minLevel <= 0 && ns.getPlayer().bitNodeN == fileNumber) { return true; }
	else { return false; }
}
