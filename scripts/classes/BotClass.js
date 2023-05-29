var botClass = function () {
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
};

// Inherit all methods from Player Class
botClass.prototype = Object.create(playerClass.prototype);

// Counts the number of ships that have been destroyed
botClass.prototype.countShipStatus = function () {
    var numberOfShipsDestroyed = 0;
    for (var i = 0; i < 5; i++)
        // If the ship's life points == 0, increase the number of ship destroyed
        if (bot.currLife[i] === 0)
            numberOfShipsDestroyed++;

    return numberOfShipsDestroyed;
}

// Drawing a probability density grid
// It appears to be using the p5.js library for rendering graphics.
botClass.prototype.drawProbabilityDensityGrid = function () {
    var i, j = 1;
    var indent = 200;

    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            if (this.grid[i][j] > 2) {
                fill(this.grid[i][j] * 50, 0, 0);
                rect(indent + 550 + 30 * (i + 1), 50 + 30 * (j + 1), 30, 30);
            } else if (this.grid[i][j] === 2) {
                fill(0, 0, 0);
                rect(indent + 550 + 30 * (i + 1), 50 + 30 * (j + 1), 30, 30);
            }
        }
    }
    return 0;
}

// This function is used to find a specific pattern or arrangement of locked targets in a game.
botClass.prototype.find = function (x, y, horiz) {
    var i, set = 0;

    if (horiz) {
        for (i = 0; i < this.target_locked_x.length; i++) {
            if (this.target_locked_x[i] !== x)
                return 0;
            if (this.target_locked_y[i] >= y && (this.target_locked_y[i] <= y + this.curr_big_ship))
                set++;
        }
    } else {
        for (i = 0; i < this.target_locked_x.length; i++) {
            if (this.target_locked_y[i] !== y)
                return 0;
            if (this.target_locked_x[i] >= x && (this.target_locked_x[i] <= x + this.curr_big_ship))
                set++;
        }
    }

    if (set === this.target_locked_x.length) {
        return 1;
    }

    return 0;
};

// Filters the grid based on certain conditions.
botClass.prototype.gridFilter = function (i, j, horiz, currShip) {
    var k;

    if (horiz) {
        for (k = 0; k < currShip; k++) {
            if (this.grid[i][j + k] <= 0) {
                return 0;
            }
            if (!this.chainFire) {
                if (this.grid[i][j + k] === 1) {
                    return 0;
                }
            }
        }
    } else {
        for (k = 0; k < currShip; k++) {
            if (this.grid[i + k][j] <= 0)
                return 0;
            if (!this.chainFire) {
                if (this.grid[i + k][j] === 1)
                    return 0;
            }
        }
    }

    return 1;
}

// Finds the current biggest alive ship component.
botClass.prototype.largestAliveShip = function () {
    var i;

    for (i = 4; i >= 0; i--) {
        if (this.currLife[i] !== 0) {
            switch (i) {
                case 0:
                    i = 2;
                    break;
                case 1:
                    i = 3;
                    break;
                case 2:
                    i = 3;
                    break;
                case 3:
                    i = 4;
                    break;
                case 4:
                    i = 5;
                    break;
            }
            return i;
        }
    }
};

// Finds the current smallest ship.
botClass.prototype.smallestAliveShip = function () {
    var i;

    for (i = 0; i < 5; i++) {
        if (this.currLife[i] !== 0) {
            switch (i) {
                case 0:
                    i = 2;
                    break;
                case 1:
                    i = 3;
                    break;
                case 2:
                    i = 3;
                    break;
                case 3:
                    i = 4;
                    break;
                case 4:
                    i = 5;
                    break;
            }
            return i;
        }
    }
    return 0;
}

// Initializes the grid and other arrays
botClass.prototype.initialize = function () {
    for (var i = 0; i < 10; i++)
        this.grid[i] = new Array(10);

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (this.gridHidden[i][j] === -1 || this.gridHidden[i][j] === ISLAND)
                this.grid[i][j] = 0;
            else if (this.gridHidden[i][j] === 1)
                this.grid[i][j] = 1;
            else
                this.grid[i][j] = 2;
        }
    }

    while (this.stack_x.length > 0) {
        this.stack_x.pop();
        this.stack_y.pop();
    }
}

// Calculates the probability density grid based on the current game state
botClass.prototype.calcProbabilityDensity = function () {
    var i, j, k;

    this.initialize();

    // Determine the biggest alive ship
    // When chainFire is enabled, we will reduce filter to the smallest ship
    if (this.chainFire) {
        this.curr_big_ship = this.smallestAliveShip() + this.smallSize;
    }
    // Strategy always search for biggest unlinked ship
    else {
        this.curr_big_ship = this.largestAliveShip();
    }

    for (i = 0; i < 10; i++) {
        for (j = 0; j <= 10 - this.curr_big_ship; j++) {
            // Enable probability filter when chainFire is active
            if (this.chainFire && !(this.gridFilter(i, j, 1, this.curr_big_ship) && this.find(i, j, 1))) {
                continue;
            } else if (!this.gridFilter(i, j, 1, this.curr_big_ship)) {
                continue;
            }

            for (k = 0; k < this.curr_big_ship; k++) {
                if (this.grid[i][j + k] > 1) {
                    if (this.chainFire) {
                        this.grid[i][j + k] = this.grid[i][j + k] + 100;
                    } else {
                        this.grid[i][j + k]++;
                    }
                }
            }
        }
    }

    // vertical probability update
    for (i = 0; i <= 10 - this.curr_big_ship; i++) {
        for (j = 0; j < 10; j++) {
            if (this.chainFire && !(this.gridFilter(i, j, 0, this.curr_big_ship) && this.find(i, j, 0))) {
                continue;
            } else if (!this.gridFilter(i, j, 0, this.curr_big_ship)) {
                continue;
            }

            for (k = 0; k < this.curr_big_ship; k++) {
                if (this.grid[i + k][j] > 1) {
                    this.grid[i + k][j] = this.grid[i + k][j] + 100;
                } else {
                    ++this.grid[i + k][j];
                }
            }
        }
    }
    return 0;
}

// Finds the maximum probability value in the grid
botClass.prototype.maxProbability = function () {
    var i, j, max = 0;

    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            if (this.grid[i][j] >= max)
                max = this.grid[i][j];
        }
    }

    return max;
}

// Determines the next move for the bot player based on the calculated probability
// density grid and other game conditions
botClass.prototype.play = function () {
    var botHitX = 0, botHitY = 0;

    if (this.checkShipLifeStatus()) {
        return true;
    }

    if ((this.missed_target_x.length > 0) && (!this.chainFire)) {
        this.chainFire = true;
        var tempX = this.missed_target_x.pop();
        var tempY = this.missed_target_y.pop();

        // Give lock high probability
        this.grid[tempX][tempY] = this.grid[tempX][tempY] + 20;
        this.target_locked_x.push(tempX);
        this.target_locked_y.push(tempY);
        this.hitShipType = this.gridActual[tempX][tempY];
    }

    this.calcProbabilityDensity();

    var max = this.maxProbability();

    while (this.stack_x.length > 0) {
        this.stack_x.pop();
        this.stack_y.pop();
    }

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (this.grid[i][j] === max) {
                if (this.chainFire === false || this.target_locked_x[0] === i || this.target_locked_y[0] === j) {
                    this.stack_x.push(i);
                    this.stack_y.push(j);
                }
            }
        }
    }

    // Selects target randomly from the highest density block
    var randomNumber = floor(random(0, this.stack_x.length));

    botHitX = this.stack_x[randomNumber];
    botHitY = this.stack_y[randomNumber];

    while (this.stack_x.length > 0) {
        this.stack_x.pop();
        this.stack_y.pop();
    }

    // If shot missed execute this
    if ((this.gridActual[botHitX][botHitY] === 0) && (this.gridHidden[botHitX][botHitY] === 0)) {
        this.gridHidden[botHitX][botHitY] = -1;
        playerSwitching = true;
        this.turn++;
    }

    // If shot hit execute this
    else if ((this.gridActual[botHitX][botHitY] > 0) && (this.gridHidden[botHitX][botHitY] === 0)) {
        // Reduce ships life which is hit
        // Mark as hit on hidden grid
        this.gridHidden[botHitX][botHitY] = 1;
        this.currLife[this.gridActual[botHitX][botHitY] - 1]--;

        if (this.chainFire) {
            // If we hit another ship then add its coordinate to stack
            if (this.hitShipType !== this.gridActual[botHitX][botHitY]) {
                this.missed_target_x.push(botHitX);
                this.missed_target_y.push(botHitY);
            } else if (this.currLife[this.gridActual[botHitX][botHitY] - 1] > 0) {
                this.target_locked_x.push(botHitX);
                this.target_locked_y.push(botHitY);

                if (this.smallestAliveShip() <= this.target_locked_x.length) {
                    this.smallSize++;
                }
            }
            // If ship sunk execute this else
            else {
                while (this.target_locked_x.length > 0) {
                    this.target_locked_x.pop();
                    this.target_locked_y.pop();
                }
                this.smallSize = 0;
                this.hitShipType = 0;
                this.chainFire = false;
            }
        }
        // If chain fire is off
        else {
            this.hitShipType = this.gridActual[botHitX][botHitY];
            this.target_locked_x.push(botHitX);
            this.target_locked_y.push(botHitY);

            this.chainFire = true;
        }
    }

    return 0;
}