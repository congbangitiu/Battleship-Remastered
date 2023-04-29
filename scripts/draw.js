let player1AutoButton = new buttonClass("auto", 50, 400);
let player2AutoButton = new buttonClass("auto", 550, 400);
let player1ConfirmButton = new buttonClass("confirm", 250, 400);
let player2ConfirmButton = new buttonClass("confirm", 750, 400);

let posX = 400, posY = 70;
let singlePlayerButton = new buttonClass("single-player", posX + 100, posY + 40);
let multiPlayerButton = new buttonClass("multi-player", posX + 100, posY + 90);
let onlineButton = new buttonClass("online", posX + 100, posY + 140);
let instructionButton = new buttonClass("instructions", posX + 100, posY + 190);
let creditButton = new buttonClass("credits", posX + 100, posY + 240);
let statisticsButton = new buttonClass("statistics", posX + 100, posY + 290);

let animate = new animation();

/**
 * Function is executed 60 frames per second.
 * It invokes different gameStates based on values
 */

let draw = () => {
    animate.animationPlay();

    if (densityLens) {
        background(0, 300, 0, 100);
    }
    if (menu === true) {
        menuState();
    }
    else if (makeNewMap === true) {
        newMapState();
    }
    else if (singlePlayer === true) {
        singlePlayerState();
    }
    else if (multiPlayerOnline === true) {
        multiPlayerOnlineState();
    }
    else if (instructions === true) {
        instructionState();
    }
    else if (multiPlayerOffline === true) {
        multiPlayerOfflineState();
    }
    else if (statistics === true) {
        statisticsState();
    }
    else if (winState === true) {
        winStateCall();
    }
};
