var player1AutoButton = new button("auto", 50, 400);
var player2AutoButton = new button("auto", 550, 400);
var player1ConfirmButton = new button("confirm", 250, 400);
var player2ConfirmButton = new button("confirm", 750, 400);

var posX = 400, posY = 70;
var singlePlayerButton = new button("Singleplayer", posX + 150, posY + 40);
var multiPlayerButton = new button("Multiplayer", posX + 150, posY + 120);
var instructionButton = new button("Instructions", posX + 150, posY + 200);
var statisticsButton = new button("Statistics", posX + 150, posY + 280);

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
