const setup = () => {
    createCanvas(1300, 550);
    frameRate(50);
}

let mouseIsPressed = false;

const mouseReleased = () => {
    mouseIsPressed = false;
};

const mousePressed = () => {
    mouseIsPressed = true;
};

const touchStated = () => {
    mouseIsPressed = true;
};

/**
 * Global variables
 */
var menu = true;
var credits = false;
var instructions = false;
var multiPlayerOffline = false;
var multiPlayerOnline = false;
var statistics = false;
var winState = false;
var makeNewMap = false;

var playerOneTurn = true;
var singlePlayer = false;
var singlePlayerWin = false;
var multiPlayerWin = false;
var densityLens = false;
var statTableUpdated = false;
var playerSwitching = true;
var playerSwitchingIterator = 0;