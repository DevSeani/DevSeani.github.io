// Comments with // Pretty epic

document.title = "Pyrope Farms!";

function setFavicon(faviconImage) {
	let headTitle = document.querySelector("head");
	let setFavicon = document.createElement("link");
	setFavicon.setAttribute("rel", "shortcut icon");
	setFavicon.setAttribute("href", faviconImage);
	headTitle.appendChild(setFavicon);
}

var saveList = { state: "createListNext" };

var tereziCount = 0;
var tereziGangMembersTotal = 1;
var tereziGangMembersAvailable = 1;
var currentTereziWorkers = 0;
var currentSheepWorkers = 0;
var tps = 0;
var wool = 0;
//Order = tereziGain, woolGain memberPriceReduction
var multiplierChange = [1.0, 1.0, 1.0];
var upgradeTypes = ["tereziGain", "woolGain", "memberPriceReduction"];
var upgradeAmount = [0, 0, 0];

var saveData = { saveInfo: {} };

function fileSelect(saveName) {
	saveFile = {
		saveName: saveName
	};

	localStorage.setItem("fileChecker", JSON.stringify(saveFile));
}

function fileCheck() {
	var saveFile = JSON.parse(localStorage.getItem("fileChecker"));
	if (saveFile == null) {
		console.log("No file called fileChecker found");
		return false;
	}
	console.log("File check found");

	if (typeof saveFile.saveName !== "undefined")
		saveData.saveName = saveFile.saveName;
}

function changeSaveFile(saveFile) {
	let confirmation = confirm(
		"You are about to change save file. Only click ok if that is ok."
	);
	if (confirmation == true) {
		save();
		fileSelect(saveFile);
		setTimeout(() => {
			location.reload();
		}, 1000);
	} else return;
}

window.onload = fileCheck();

function save() {
	saveData.saveInfo = {
		tereziCount: tereziCount,
		wool: wool,
		tereziGangMembersAvailable: tereziGangMembersAvailable,
		tereziGangMembersTotal: tereziGangMembersTotal,
		currentTereziWorkers: currentTereziWorkers,
		currentSheepWorkers: currentSheepWorkers,
		upgradeAmount: upgradeAmount
	};
	localStorage.setItem(saveData.saveName, JSON.stringify(saveData.saveInfo));
}

function load() {
	let oldsystem = false;
	var savegame = JSON.parse(localStorage.getItem(saveData.saveName));
	if (savegame == null) {
		var savegame = JSON.parse(localStorage.getItem("save"));
		oldsystem = true;
		if (savegame == null) {
			console.log("No save called " + saveData.saveName + " found");
			return false;
		}
	}
	if (saveData.saveName == "save") {
		oldsystem = true;
	}
	console.log("Old Save System: " + oldsystem);
	console.log("Save found: " + saveData.saveName);
	if (typeof savegame.tereziCount !== "undefined")
		tereziCount = savegame.tereziCount;
	if (typeof savegame.tereziGangMembersAvailable !== "undefined")
		tereziGangMembersAvailable = savegame.tereziGangMembersAvailable;
	if (typeof savegame.tereziGangMembersTotal !== "undefined")
		tereziGangMembersTotal = savegame.tereziGangMembersTotal;
	if (typeof savegame.currentTereziWorkers !== "undefined")
		currentTereziWorkers = savegame.currentTereziWorkers;
	if (typeof savegame.currentSheepWorkers !== "undefined")
		currentSheepWorkers = savegame.currentSheepWorkers;
	if (typeof savegame.wool !== "undefined") wool = savegame.wool;
	if (typeof savegame.upgradeAmount !== "undefined")
		upgradeAmount = savegame.upgradeAmount;
	if (oldsystem == true) {
		saveData.saveName = "save1";
		save();
		fileSelect("save1");
		localStorage.removeItem("save");
		setTimeout(() => {
			location.reload();
		}, 500);
	}
}

function deleteSave(saveFile) {
	let confirmation = confirm(
		"You are about to delete your save. Only click ok if that is ok."
	);
	if (confirmation == true) {
		localStorage.removeItem(saveFile);
		setTimeout(() => {
			location.reload();
		}, 1000);
	} else return;
}

window.onload = load();
window.onload = upgradeMultiplierChange();
window.onload = myFunction();

function saveListController() {
	saveListState = () => saveList.state;

	saveListButton = document.getElementById("saveListButton");

	function saveListCreator() {
		var saveListContainerDiv = document.createElement("DIV");
		saveListContainerDiv.setAttribute("id", "saveListContainer");
		saveListContainerDiv.setAttribute("class", "saveListContainer");
		saveListContainerDiv.style.padding = "0";
		saveListContainerDiv.style.width = "100%";
		saveListContainerDiv.style.height = "0";
		saveListContainerDiv.style.display = "flex";
		saveListContainerDiv.style.borderBottom = "1px #0e1116 solid";
		saveListContainerDiv.style.flexDirection = "column";
		saveListContainerDiv.style.justifyContent = "center";
		saveListContainerDiv.style.alignContent = "center";
		saveListContainerDiv.style.background = "#008282";
		saveListContainerDiv.style.transitionProperty = "height";
		saveListContainerDiv.style.transitionDuration = "3.5s";
		saveListContainerDiv.style.transitionTimingFunction = "ease-in";
		document.getElementById("saveListHolder").appendChild(saveListContainerDiv);

		var saveSelectListContainerDiv = document.createElement("DIV");
		saveSelectListContainerDiv.setAttribute("id", "saveSelectListContainer");
		saveSelectListContainerDiv.style.display = "flex";
		saveSelectListContainerDiv.style.justifyContent = "center";
		saveSelectListContainerDiv.style.alignContent = "center";
		saveSelectListContainerDiv.style.opacity = "0";
		saveSelectListContainerDiv.style.transitionProperty = "opacity";
		saveSelectListContainerDiv.style.transitionDuration = "1s";
		saveSelectListContainerDiv.style.transitionDelay = "2.75s";
		saveListContainerDiv.style.transitionTimingFunction = "ease-in";
		document
			.getElementById("saveListContainer")
			.appendChild(saveSelectListContainerDiv);

		for (let i = 0; i < 3; i++) {
			var saveSelectButton = document.createElement("button");
			saveSelectButton.setAttribute("class", "saveSelectButton");
			saveSelectButton.innerHTML = "Load Save File " + (i + 1);
			saveSelectButton.onclick = function() {
				changeSaveFile("save" + (i + 1));
			};
			document
				.getElementById("saveSelectListContainer")
				.appendChild(saveSelectButton);
		}

		var saveDeleteListContainerDiv = document.createElement("DIV");
		saveDeleteListContainerDiv.setAttribute("id", "saveDeleteListContainer");
		saveDeleteListContainerDiv.style.display = "flex";
		saveDeleteListContainerDiv.style.justifyContent = "center";
		saveDeleteListContainerDiv.style.alignContent = "center";
		saveDeleteListContainerDiv.style.opacity = "0";
		saveDeleteListContainerDiv.style.transitionProperty = "opacity";
		saveDeleteListContainerDiv.style.transitionDuration = "1s";
		saveDeleteListContainerDiv.style.transitionDelay = "2.2s";
		saveListContainerDiv.style.transitionTimingFunction = "ease-in";
		document
			.getElementById("saveListContainer")
			.appendChild(saveDeleteListContainerDiv);

		for (let j = 0; j < 3; j++) {
			var saveDeleteButton = document.createElement("button");
			saveDeleteButton.setAttribute("class", "saveDeleteButton");
			saveDeleteButton.innerHTML = "Delete File " + (j + 1);
			saveDeleteButton.onclick = function() {
				deleteSave("save" + (j + 1));
			};
			document
				.getElementById("saveDeleteListContainer")
				.appendChild(saveDeleteButton);
		}
	}

	function createSaveListButton() {
		saveListCreator();
		saveList.state = "removeListNext";
	}
	function removeSaveListButton() {
		var saveListContainer = document.getElementById("saveListContainer");
		saveListContainer.remove();
		saveList.state = "createListNext";
	}

	function transitionPlay(direction) {
		let saveListContainerDiv = document.getElementById("saveListContainer");
		let saveSelectListContainerDiv = document.getElementById(
			"saveSelectListContainer"
		);
		let saveDeleteListContainerDiv = document.getElementById(
			"saveDeleteListContainer"
		);
		if (direction == "forward") {
			saveListContainerDiv.style.height = "100px";
			saveSelectListContainerDiv.style.opacity = "1";
			saveDeleteListContainerDiv.style.opacity = "1";
		}
		if (direction == "backward") {
			saveListContainerDiv.style.height = "0px";
			saveSelectListContainerDiv.style.opacity = "0";
			saveDeleteListContainerDiv.style.opacity = "0";
		}
	}

	if (saveListState() == "createListNext") {
		saveListButton.disabled = true;
		createSaveListButton();
		setTimeout(function() {
			transitionPlay("forward");
		}, 20);
		setTimeout(() => {
			saveListButton.disabled = false;
		}, 3000);
	} else {
		saveListButton.disabled = true;
		transitionPlay("backward");
		setTimeout(function() {
			removeSaveListButton();
		}, 4000);
		setTimeout(() => {
			saveListButton.disabled = false;
		}, 3000);
	}
}

function myFunction() {
	document.getElementById("treeDisplayStack").style.display = "none";
}

function format(value) {
	let power = Math.floor(Math.log10(value));
	if (power < 1) return value.toFixed(1);
	value = value / Math.pow(10, power);
	if (power < 3 == 0) return value.toFixed(3);
	return value.toFixed(2);
}

function formatPower(value) {
	let power = Math.floor(Math.log10(value));
	if (power < 0) return "0";
	return power;
}

function tereziCountChange(number) {
	tereziCount = tereziCount + number * multiplierChange[0];
}

function woolCountChange(number) {
	let value = wool + number * 0.1 * multiplierChange[1];
	return Math.round(value * 100) / 100;
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
		10 * Math.pow(1.1, tereziGangMembersTotal - 1) * multiplierChange[2]
	);
	if (tereziCount >= tereziGangMemberCost) {
		tereziGangMembersTotal = tereziGangMembersTotal + 1;
		tereziGangMembersAvailable = tereziGangMembersAvailable + 1;
		tereziCount = tereziCount - tereziGangMemberCost;
	}
}

//SHOP

function upgradeMultiplierChange() {
	multiplierChange[0] = 1 + upgradeAmount[0] * 0.1; //terezi
	multiplierChange[1] = 1 + upgradeAmount[1] * 0.1; //wool
	multiplierChange[2] = reduceGangMemberCost(upgradeAmount[2]); //gang mem cost
}

function reduceGangMemberCost(value) {
	let tempMulti2 = 1.0;

	for (let i = 0; i < value; i++) {
		tempMulti2 = (tempMulti2 / 100) * 90;
	}
	return tempMulti2;
}

function shopPrices(item) {
	let shopBasePrice = [10, 50, 100];
	if (upgradeAmount[item] > 0) {
		var returnPrice =
			(shopBasePrice[item] / 100) * (115 * (upgradeAmount[item] + 1));
		return Math.round(returnPrice * 100) / 100;
	} else {
		return shopBasePrice[item];
	}
}

function shopBuyUpgrade(item) {
	if (wool >= shopPrices(item)) {
		wool = wool - shopPrices(item);
		upgradeAmount[item] = upgradeAmount[item] + 1;
	}
	upgradeMultiplierChange();
}

//GAME LOOP AND DISPAY UPDATES

window.setInterval(function() {
	tereziCountChange(currentTereziWorkers);
	wool = woolCountChange(currentSheepWorkers);
}, 1000);

let autoSave = window.setInterval(function() {
	save();
}, 2000);

window.setInterval(function() {
	updateText();
}, 100);

function calculateTPS() {
	tps = currentTereziWorkers * multiplierChange[0];
	if (tps % 1 != 0) return tps.toFixed(1);
	else return tps.toFixed(0);
}

function calculateWPS() {
	wps = currentSheepWorkers * 0.1 * multiplierChange[1];
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
	document.title = "Terezi count: " + Math.round(tereziCount * 100) / 100;
	setFavicon("../terezigangidle/images/favicon.ico");
	document.getElementById(
		"tereziGangMembersTotal"
	).innerHTML = tereziGangMembersTotal;
	document.getElementById(
		"tereziGangMembersAvailable"
	).innerHTML = tereziGangMembersAvailable;
	document.getElementById("tereziGangMemberCost").innerHTML = Math.floor(
		10 * Math.pow(1.1, tereziGangMembersTotal - 1) * multiplierChange[2]
	);
	document.getElementById(
		"currentTereziWorkers"
	).innerHTML = currentTereziWorkers;
	document.getElementById(
		"currentSheepWorkers"
	).innerHTML = currentSheepWorkers;
	//SHOP
	document.getElementById("shopUpgradeTereziPurchased").innerHTML =
		upgradeAmount[0];
	document.getElementById("shopUpgradeWoolPurchased").innerHTML =
		upgradeAmount[1];
	document.getElementById("shopUpgradeGangMemberPurchased").innerHTML =
		upgradeAmount[2];
	document.getElementById("shopUpgradeTerezi").innerHTML = shopPrices(0);
	document.getElementById("shopUpgradeWool").innerHTML = shopPrices(1);
	document.getElementById("shopUpgradeGangMember").innerHTML = shopPrices(2);
}
