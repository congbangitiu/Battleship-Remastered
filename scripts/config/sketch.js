// Khung bao game
function setup() {
    createCanvas(1900, 840);
    frameRate(50);
}

var mouseIsPressed = false;

var mouseReleased = function () {
    mouseIsPressed = false;
};

var mousePressed = function () {
    mouseIsPressed = true;
};

var touchStarted = function () {
    mouseIsPressed = true;
};

//Global variables

var menu = true;
var instructions = false;
var multiPlayerOffline = false;
var statistics = false;
var winState = false;
var makeNewMap = false;

var playerOneTurn = true;
var singlePlayer = false;
var singlePlayerWin = false;
var densityLens = false;
var statTableUpdated = false;
var playerSwitching = true;
var playerSwitchingIterator = 0;

var randomMap = new Array(10);
for (var i = 0; i < randomMap.length; i++)
    randomMap[i] = new Array(10);

var initializeRandomMap = function () {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            randomMap[i][j] = 0;
        }
    }
};

initializeRandomMap();

for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        randomMap[i][j] = 0;
    }
}

const ISLAND = -2;

// Creating statistics table
var statTable = new Array(3);
for (var i = 0; i < statTable.length; i++) {
    statTable[i] = new Array(6);
}

// Initializing statistic table
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 6; j++) {
        statTable[i][j] = 0;
    }
}