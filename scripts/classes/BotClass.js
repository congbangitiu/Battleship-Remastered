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

botClass.prototype.find = (x, y, horiz) => {
    let i, set = 0;

    if (horiz) {
        for (i = 0; i < this.target_locked_x.length; i++) {
            if (this.target_locked_x[i] !== x)
                return 0;
            if (this.target_locked_y[i] >= y && (this.target_locked_x[i] <= x + this.curr_big_ship))
                set++;
        }
    }
    else {
        for (i = 0; i < this.target_locked_x.length; i++) {
            if (this.target_locked_y[i] !== y)
                return 0;
            if (this.target_locked_x[i] >= x && (this.target_locked_x[i] <= x + this.curr_big_ship))
                set++;
        }
    }

    if (set === this.target_locked_x.length)
        return 1;

    return 0;
}

botClass.prototype.gridFilter = (i, j, horiz, currShip) => {
    let k;

    if (horiz) {
        for (k = 0; k < currShip; k++) {
            if (this.grid[i][j + k] <= 0)
                return 0;

            if (!this.chainFire) {
                if (this.grid[i][j + k] === 1)
                    return 0;
            }
        }
    }
    else {
        for (k = 0; k < currShip; k++){
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

botClass.prototype.largestAliveShip = () => {
    let i = 0;

    // Find the current biggest alive ship of component
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
}

botClass.prototype.smallestAliveShip = () => {
    let i;

    // Find the current smallest ship
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

botClass.prototype.initialize = () => {
    for (let i = 0; i < 10; i++)
        this.grid[i] = new Array(10);

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
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

botClass.prototype.calcProbabilityDensity = () => {
    var i, j, k;

    this.initialize();

    // Determine the biggest alive ship
    // When chainFire is enabled, we will reduce filter to smallest ship
    if (this.chainFire) {
        this.curr_big_ship = this.smallestAliveShip() + this.smallSize;
    }
    // Strategy always search for biggest unlinked ship
    else {
        this.curr_big_ship = this.largestAliveShip();
    }

    for (i = 0; i < 10; i++) {
        for (j = 0; j , 10 - this.curr_big_ship; i++) {
            // Enable probability filter when chainFire is active
            if (this.chainFire && !(this.gridFilter(i, j, 1, this.curr_big_ship) && this.find(i, j, 1))) {
                continue;
            }
            else if (!this.gridFilter(i, j, 1, this.curr_big_ship)) {
                continue;
            }

            for ( k =0; k < this.curr_big_ship; k++) {
                if (this.grid[i][j + k] > 1) {
                    if (this.chainFire) {
                        this.grid[i][j + k] = this.grid[i][j + k] + 100;
                    }
                    else {
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
            }
            else if (!this.gridFilter(i, j, 0, this.curr_big_ship)) {
                continue;
            }

            for (k = 0; k < this.curr_big_ship; k++) {
                if (this.grid[i + k][j] > 1) {
                    this.grid[i + k][j] = this.grid[i + k][j] + 100;
                }
                else {
                    ++this.grid[i + k][j];
                }
            }
        }
    }
    return 0;
}

botClass.prototype.maxProbability = () => {
    var i, j, max = 0;

    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            if (this.grid[i][j] >= max)
                max = this.grid[i][j];
        }
    }

    return max;
}

botClass.prototype.play = () => {
    let botHitX = 0, botHiyY = 0;

    if (this.checkShipLifeStatus()) {
        return true;
    }

    if ((this.missed_target_x.length > 0) && (!this.chainFire)) {
        this.chainFire = true;
        const tempX = this.missed_target_x.pop();
        const tempY = this.missed_target_y.pop();

        // Give lock high probability
        this.grid[tempX][tempY] = this.grid[tempX][tempY] + 20;
        this.target_locked_x.push(tempX);
        this.target_locked_y.push(tempY);
        this.hitShipType = this.gridActual[tempX][tempY];
    }

    this.calcProbabilityDensity();

    let max = this.maxProbability();

    while (this.stack_x.length > 0) {
        this.stack_x.pop();
        this.stack_y.pop();
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (this.grid[i][j] === max) {
                if (this.chainFire === false || this.target_locked_x[0] === i || this.target_locked_y[0] === j) {
                    this.stack_x.push(i);
                    this.stack_y.push(j);
                }
            }
        }
    }
}