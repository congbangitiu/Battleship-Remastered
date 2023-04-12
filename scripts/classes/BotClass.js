const botClass = () => {
    // Create constructor Bot Class
    playerClass.call(this, "p2", 2);

    this.chainFire = false;
    this.curr_big_ship = 5;
    this.smallSize = 0;

    this.grid = new Array(10);

    this.target_locked_x = [];
    this.target_locked_y = [];
    this.missed_target_x = [];
    this.missed_target_y = [];
    this.stack_x = [];
    this.stack_y = [];
}

// Inherit all methods from Player Class
botClass.prototype = Object.create(playerClass.prototype);

botClass.prototype.countShipStatus = (str) => {
    var numberOfShipsDestroyed = 0;
    for (let i = 0; i < 5; i++)
        if(bot.currLife[i] === 0)
            numberOfShipsDestroyed++;

    return numberOfShipsDestroyed;
}

botClass.prototype.drawProbabilityDensityGrid = () => {
    let i = 1, j = 1;
    const indent = 200;

    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            if (this.grid[i][j] > 2) {
                fill(this.grid[i][j] * 50, 0, 0);
                rect(indent + 550 + 30 * (i + 1), 50 + 30 * (j + 1), 30, 30);
            }
            else if (this.grid[i][j] === 2) {
                fill(0, 0, 0);
                rect(indent + 550 + 30 * (i + 1), 50 + 30 * (j + 1), 30, 30);
            }
        }
    }
    return 0;
}