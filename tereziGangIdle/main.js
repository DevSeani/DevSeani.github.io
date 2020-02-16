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
var tereziGangMembers = 0;
var tps = 0;
var wool = 0;
var sheep = 0;

function save() {
	var save = {
		tereziCount: tereziCount,
		tereziGangMembers: tereziGangMembers
	};
	localStorage.setItem("save", JSON.stringify(save));
}

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (savegame == null) return false;
	if (typeof savegame.tereziCount !== "undefined")
		tereziCount = savegame.tereziCount;
	if (typeof savegame.tereziGangMembers !== "undefined")
		tereziGangMembers = savegame.tereziGangMembers;
}

function deleteSave() {
	localStorage.removeItem("save");
	location.reload();
}

window.onload = load();

function format(value) {
	let power = Math.floor(Math.log10(value));
	if (power < 1) return value.toFixed(0);
	value = value / Math.pow(10, power);
	if (power < 3 == 0) return value.toFixed(3);
	return value.toFixed(2);
}

function formatPower(value) {
	let power = Math.floor(Math.log10(value)) + 1;
	if (power < 0) return "0";
	return power;
}

function tereziClick(number) {
	tereziCount = tereziCount + number;
}

function buyTereziGangMember() {
	var tereziGangMemberCost = Math.floor(10 * Math.pow(1.1, tereziGangMembers));
	if (tereziCount >= tereziGangMemberCost) {
		tereziGangMembers = tereziGangMembers + 1;
		tereziCount = tereziCount - tereziGangMemberCost;
	}
	var nextCost = Math.floor(10 * Math.pow(1.1, tereziGangMembers));
}

window.setInterval(function() {
	tereziClick(tereziGangMembers);
}, 1000);

window.setInterval(function() {
	save();
}, 2000);

window.setInterval(function() {
	updateText();
}, 100);

function calculateTPS() {
	tps = tereziGangMembers;
	return tps;
}

function updateText() {
	tps = calculateTPS();
	document.getElementById("tps").innerHTML = tps;
	document.getElementById("tereziCount").innerHTML =
		format(tereziCount) + " x10";
	document.getElementById("tereziCountPower").innerHTML = formatPower(
		tereziCount
	);
	document.title = "Terezi count: " + tereziCount;
	setFavicon("/tereziGangIdle/images/favicon.ico");
	document.getElementById("tereziGangMembers").innerHTML = tereziGangMembers;
	document.getElementById("tereziGangMemberCost").innerHTML = Math.floor(
		10 * Math.pow(1.1, tereziGangMembers)
	);
}
