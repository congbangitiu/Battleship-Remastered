// Create new instances of player1, player2
var player1 = new playerClass("player-1", 1);
var player2 = new playerClass("player-2", 2);
var bot = new botClass();

/**
 * Re-initialize instances of Multiplayer object
 */

var createNewMultiPlayerObject = function () {
    player1 = new playerClass("player-1", 1);
    player1.initializeGrid();

    player2 = new playerClass("player-2", 2);
    player2.initializeGrid();
};

/**
 * Re-initialize instances of single player object
 */

var createNewSinglePlayerObject = function () {
    player1 = new playerClass("player-1", 1);
    player1.initializeGrid();

    // Destructor equivalent for precious...
    densityLens = false;
    bot = new botClass();
    bot.initializeGrid();
};

/**
 * Takes argument as a string, if the parameter is "singlePlayer" it swaps the maps of player1 and bot,
 *                              if the parameter is "multiPlayer" it swaps the maps of player1 and player2
 *
 * @Param {String} gameType  gameType = "singlePlayer" or "multiPlayer"
 */

var swapMap = function (gameType) {
    let temp = new Array(10);
    for (let i = 0; i < 10; i++) {
        temp[i] = new Array(10);
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            temp[i][j] = player1.gridActual[i][j];
        }
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gameType === "single-player") {
                player1.gridActual[i][j] = bot.gridActual[i][j];
            } else {
                player1.gridActual[i][j] = player2.gridActual[i][j];
            }
        }
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gameType === "single-player") {
                bot.gridActual[i][j] = temp[i][j];
            } else {
                player2.gridActual[i][j] = temp[i][j];
            }
        }
    }
};
