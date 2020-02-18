// Comments with // Pretty epic

document.title = "Pyrope Farms!";

function setFavicon(faviconImage) {
	let headTitle = document.querySelector("head");
	let setFavicon = document.createElement("link");
	setFavicon.setAttribute("rel", "shortcut icon");
	setFavicon.setAttribute("href", faviconImage);
	headTitle.appendChild(setFavicon);
}

var tereziCount = 0;
var tereziGangMembers = 1;
var tereziGangMembersTotal = 1;
var tereziGangMembersAvailable = 1;
var currentTereziWorkers = 0;
var tereziMultiplier = 1.0;
var currentSheepWorkers = 0;
var woolMultiplier = 1.0;
var tps = 0;
var wool = 0;

function save() {
	var save = {
		tereziCount: tereziCount,
		tereziGangMembers: tereziGangMembers,
		tereziGangMembersAvailable: tereziGangMembersAvailable,
		tereziGangMembersTotal: tereziGangMembersTotal,
		currentTereziWorkers: currentTereziWorkers,
		currentSheepWorkers: currentSheepWorkers
	};
	localStorage.setItem("save", JSON.stringify(save));
}

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (savegame == null) return false;
	if (typeof savegame.tereziCount !== "undefined")
		tereziCount = savegame.tereziCount;
	if (typeof savegame.tereziGangMembers !== "undefined") {
		console.log(savegame.tereziGangMembers);
		if (savegame.tereziGangMembers !== 1) {
			console.log(savegame.tereziGangMembers);
			tereziGangMembersAvailable = savegame.tereziGangMembers;
			tereziGangMembersTotal = savegame.tereziGangMembers;
			currentTereziWorkers = 0;
			currentSheepWorkers = 0;
			tereziGangMembers = 1;
		} else {
			if (typeof savegame.tereziGangMembersAvailable !== "undefined")
				tereziGangMembersAvailable = savegame.tereziGangMembersAvailable;
			if (typeof savegame.tereziGangMembersTotal !== "undefined")
				tereziGangMembersTotal = savegame.tereziGangMembersTotal;
			if (typeof savegame.currentTereziWorkers !== "undefined")
				currentTereziWorkers = savegame.currentTereziWorkers;
			if (typeof savegame.currentSheepWorkers !== "undefined")
				currentSheepWorkers = savegame.currentSheepWorkers;
		}
	}
}

function deleteSave() {
	let confirmation = confirm(
		"You are about to delete your save. Only click ok if that is ok."
	);
	if (confirmation == true) {
		window.clearInterval(autoSave);
		localStorage.removeItem("save");
		location.reload();
	} else return;
}

window.onload = load();

function format(value) {
	let power = Math.floor(Math.log10(value));
	if (power < 1) return value.toFixed(1);
	value = value / Math.pow(10, power);
	if (power < 3 == 0) return value.toFixed(3);
	return value.toFixed(2);
}

function formatPower(value) {
	let power = Math.floor(Math.log10(value)) + 1;
	if (power < 0) return "0";
	return power;
}

function tereziCountChange(number) {
	tereziCount = tereziCount + number * tereziMultiplier;
}

function woolCountChange(number) {
	wool = wool + number * 0.1 * woolMultiplier;
}

function tereziGangAllocation(number, gangMemberLocation) {
	let lower = gangMemberLocation;
	let locationName =
		gangMemberLocation.charAt(0).toUpperCase() + lower.substring(1);
	let checkName = "current" + locationName + "Workers";

	if (number > 0) {
		if (tereziGangMembersAvailable > 0) {
			tereziGangMembersAvailable = tereziGangMembersAvailable - number;
			adjustGangMembers(number, gangMemberLocation);
		}
	} else if (number < 0) {
		if (tereziGangMembersAvailable < tereziGangMembersTotal) {
			if (window[checkName] > 0) {
				tereziGangMembersAvailable = tereziGangMembersAvailable - number;
				adjustGangMembers(number, gangMemberLocation);
			}
		}
	} else {
		tereziGangMembersAvailable = tereziGangMembersAvailable;
	}
}

function adjustGangMembers(number, gangMemberLocation) {
	let functionName = gangMemberLocation + "Allocation";
	let parameters = number;
	window[functionName](parameters);
}

function tereziAllocation(number) {
	currentTereziWorkers = currentTereziWorkers + number;
}

function sheepAllocation(number) {
	currentSheepWorkers = currentSheepWorkers + number;
}

function buyTereziGangMember() {
	var tereziGangMemberCost = Math.floor(
		10 * Math.pow(1.1, tereziGangMembersTotal - 1)
	);
	if (tereziCount >= tereziGangMemberCost) {
		tereziGangMembersTotal = tereziGangMembersTotal + 1;
		tereziGangMembersAvailable = tereziGangMembersAvailable + 1;
		tereziCount = tereziCount - tereziGangMemberCost;
	}
	var nextCost = Math.floor(10 * Math.pow(1.1, tereziGangMembersTotal - 1));
}

window.setInterval(function() {
	tereziCountChange(currentTereziWorkers);
	woolCountChange(currentSheepWorkers);
}, 1000);

let autoSave = window.setInterval(function() {
	save();
}, 2000);

window.setInterval(function() {
	updateText();
}, 100);

function calculateTPS() {
	tps = currentTereziWorkers * tereziMultiplier;
	return tps.toFixed(0);
}

function calculateWPS() {
	wps = currentSheepWorkers * 0.1 * woolMultiplier;
	return wps.toFixed(1);
}

function updateText() {
	tps = calculateTPS();
	document.getElementById("tps").innerHTML = tps;
	wps = calculateWPS();
	document.getElementById("wps").innerHTML = wps;
	document.getElementById("tereziCount").innerHTML =
		format(tereziCount) + " x10";
	document.getElementById("tereziCountPower").innerHTML = formatPower(
		tereziCount
	);
	document.getElementById("wool").innerHTML = format(wool) + " x10";
	document.getElementById("woolCountPower").innerHTML = formatPower(wool);
	document.title = "Terezi count: " + tereziCount;
	setFavicon("../terezigangidle/images/favicon.ico");
	document.getElementById(
		"tereziGangMembersTotal"
	).innerHTML = tereziGangMembersTotal;
	document.getElementById(
		"tereziGangMembersAvailable"
	).innerHTML = tereziGangMembersAvailable;
	document.getElementById("tereziGangMemberCost").innerHTML = Math.floor(
		10 * Math.pow(1.1, tereziGangMembersTotal - 1)
	);
	document.getElementById(
		"currentTereziWorkers"
	).innerHTML = currentTereziWorkers;
	document.getElementById(
		"currentSheepWorkers"
	).innerHTML = currentSheepWorkers;
}
