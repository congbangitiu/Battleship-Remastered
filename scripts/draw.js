var player1AutoButton = new button("auto", 50, 400);
var player2AutoButton = new button("auto", 550, 400);
var player1ConfirmButton = new button("confirm", 250, 400);
var player2ConfirmButton = new button("confirm", 750, 400);

var posX = 400, posY = 70;
var singlePlayerButton = new button("single-player", posX + 100, posY + 40);
var multiPlayerButton = new button("multi-player", posX + 100, posY + 90);
var instructionButton = new button("Instructions", posX + 100, posY + 190);
var statisticsButton = new button("statistics", posX + 100, posY + 290);

var animate = new animation();

/**
 * Function is executed 60 frames per second.
 * It invokes different gameStates based on values
 */

var draw = function () {
    animate.animationPlay();

    if (densityLens) {
        background(0, 300, 0, 100);
    }
    if (menu === true) {
        menuState();
    } else if (makeNewMap === true) {
        newMapState();
    } else if (singlePlayer === true) {
        singlePlayerState();
    } else if (instructions === true) {
        instructionState();
    } else if (multiPlayerOffline === true) {
        multiPlayerOfflineState();
    } else if (statistics === true) {
        statisticsState();
    } else if (winState === true) {
        winStateCall();
    }
};
