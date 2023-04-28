let setup = () => {
    createCanvas(1300, 550);
    frameRate(50);
}

let mouseIsPressed = false;

let mouseReleased = () => {
    mouseIsPressed = false;
};

let mousePressed = () => {
    mouseIsPressed = true;
};

let touchStated = () => {
    mouseIsPressed = true;
};


//Global variables
 
let menu = true;
let credits = false;
let instructions = false;
let multiPlayerOffline = false;
let multiPlayerOnline = false;
let statistics = false;
let winState = false;
let makeNewMap = false;

let playerOneTurn = true;
let singlePlayer = false;
let singlePlayerWin = false;
let multiPlayerWin = false;
let densityLens = false;
let statTableUpdated = false;
let playerSwitching = true;
let playerSwitchingIterator = 0;

let randomMap = new Array(10);
for (let i = 0; i < randomMap; i++)
    randomMap[i] = new Array(10);

let initializeRandomMap = () => {
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