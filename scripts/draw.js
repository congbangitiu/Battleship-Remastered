var player1AutoButton = new button("      Auto", 350, 520);
var player2AutoButton = new button("      Auto", 1150, 520);
var player1ConfirmButton = new button("    Confirm", 580, 520);
var player2ConfirmButton = new button("    Confirm", 1380, 520);

var posX = 400, posY = 70;
var singlePlayerButton = new button("Singleplayer", posX + 475, posY + 150);
var multiPlayerButton = new button(" Multiplayer", posX + 475, posY + 230);
var instructionButton = new button(" Instructions", posX + 475, posY + 310);
var statisticsButton = new button("   Statistics", posX + 475, posY + 390);

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
