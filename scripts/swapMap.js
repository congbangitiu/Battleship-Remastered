// Create new instances of player1, player2
let player1 = new playerClass("player-1", 1);
let player2 = new playerClass("player-2", 2);
let bot = new botClass();

/**
 * Re-initialize instances of Multiplayer object
 */

let createNewMultiPlayerObject = () => {
    player1 = new playerClass("player-1", 1);
    player1.initializeGrid();

    player2 = new playerClass("player-2", 2);
    player2.initializeGrid();
};

/**
 * Re-initialize instances of single player object
 */

let createNewSinglePlayerObject = () => {
    player1 = new playerClass("player-1", 1);
    player1.initializeGrid();

    // Destructor equivalent for precious...
    densityLens = false;
    bot = new botClass();
    bot.initializeGrid();
};