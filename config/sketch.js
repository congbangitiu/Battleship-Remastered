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
let menu = true;
let credits = false;
let instructions = false;
let multiPlayerOffline = false;
const multiPlayerOnline = false;
let statistics = false;
const winState = false;
let makeNewMap = false;

let playerOneTurn = true;
let singlePlayer = false;
const singlePlayerWin = false;
const multiPlayerWin = false;
const densityLens = false;
const statTableUpdated = false;
let playerSwitching = true;
const playerSwitchingIterator = 0;

const randomMap = new Array(10);
for (let i = 0; i < randomMap; i++)
    randomMap[i] = new Array(10);

const initializeRandomMap = () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            randomMap[i][j] = 0;
        }
    }
};

initializeRandomMap();

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        randomMap[i][j] = 0;
    }
}

const ISLAND = -2;

// Creating statistics table
let statTable = new Array(3);
for (let i = 0; i < statTable.length; i++) {
    statTable[i] = new Array(6);
}

// Initializing statistic table
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
        statTable[i][j] = 0;
    }
}