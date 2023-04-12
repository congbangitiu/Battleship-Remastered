const playerClass = (playerName, playerRole) => {
    // Inherits objects from Network Class
    NetworkClass.call(this);

    // Inherits objects from Ship Class
    ShipClass.call(this);

    // Initialize the hidden grid 10x10.
    // Goal: When we hover the mouse, there will be the animation to change the displayed color of each element (each grid)
    // First, create an array with length 10, then inside each element of the array, we create new array of length 10
    // to form a 10x10 array
    this.gridHidden = new Array(10);
    for (let i = 0; i < this.gridHidden.length; i++)
        this.gridHidden[i] = new Array(10);

    this.gridActual = new Array(10);
    for (let i = 0; i < this.gridActual.length; i++)
        this.gridActual[i] = new Array(10);

    this.currLife = [2, 3, 3, 4, 5];
    this.name = player_name;
    this.playerRole = player_role;

    this.turn = 0;
    this.shipArranged = 0;
    this.autoButtonPushed = false;
    this.confirmButtonPushed = false;

    // Initialize ships position
    this.ship = [
        // Spacecraft 1
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        },
        // Spacecraft 2
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        },
        // Spacecraft 3
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        },
        // Spacecraft 4
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        },
        // Spacecraft 5
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        }
    ];
};

// Inherit methods from PlayerClass to playerClass.
// playerClass.prototype = Object.create(PlayClass.prototype);
playerClass.prototype.drawGridActual = () => {
    var i = 1, j = 1, indent = 0;

    if (this.playerRole === 2)
        indent = 700;

    for (i = 0; i < this.shipName.length; i++) {
        for (j = 0; j < this.shipName[i].size; j++) {
            noFill();
            rect(indent + i * 85 + 40 + 20 * j, 40, 20, 25);
        }
        for (j = 0; j < this.currLife[i]; j++) {
            fill(this.shipName[i].color.r, this.shipName[i].color.g, this.shipName[i].color.b);
            rect(indent + i * 85 + 40 + 20 * j, 40, 20, 25);
        }
    }


    fill(64, 54, 255);
    for (i = 1; i <= 10; i++) {
        for (j = 1; j <= 10; j++) {

            fill(64, 54, 255);
            rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);

            // draws the ships on the map
            if (this.gridActual[i - 1][j - 1] > 0) {

                fill(this.shipName[this.gridActual[i - 1][j - 1] - 1].color.r, this.shipName[this.gridActual[i - 1][j - 1] - 1].color.g, this.shipName[this.gridActual[i - 1][j - 1] - 1].color.b);
                ellipse(indent + 65 + 30 * i, 65 + 30 * j, 25, 25);
            }

            if(this.gridActual[i - 1][j - 1] === ISLAND){
                fill(255, 212, 128);
                rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
            }
        }
    }
};

player.prototype.drawGridHidden = function () {
    var i = 1, j = 1, indent = 0;
    
    fill(255, 255, 255);
    textSize(30);

    if (this.player_role === 2) {
        indent = 700;
        text("Player 2", 160 + indent, 400, 200, 50);
    }
    else {
        text("Player 1", 160 + indent, 400, 200, 50);
    }

    textSize(20);
    text("turn : " + this.turn, 90 + indent, 10, 100, 20);

    for (i = 0; i < this.shipName.length; i++) {
        for (j = 0; j < this.shipName[i].size; j++) {
            noFill();
            if(this.currLife[i] > 0 && j < this.shipName[i].size){
                fill(this.shipName[i].color.r, this.shipName[i].color.g, this.shipName[i].color.b);  
            }
            rect(indent + i * 85 + 40 + 20 * j, 40, 20, 25);
        }
    }


    fill(64, 54, 255);

    for (i = 1; i <= 10; i++) {

        for (j = 1; j <= 10; j++) {

            // block not yet hit
            //   if(this.gridHidden[i-1][j-1] === 0){

            fill(64, 54, 255);
            if(densityLens === false || this.playeris !== 2){

            if(this.gridHidden[i - 1][j - 1] === ISLAND){
                //sandy beach colour
                fill(255, 212, 128);
            }
    
            rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
               }
            // target hit inside the block
            if (this.gridHidden[i - 1][j - 1] > 0) {
                // red color
                fill(255, 56, 63);
                ellipse(indent + 65 + 30 * i, 65 + 30 * j, 20, 20);
            }

            // missed inside block
            else if (this.gridHidden[i - 1][j - 1] === -1) {
                // yellow color
                fill(255, 255, 0);
                ellipse(indent + 65 + 30 * i, 65 + 30 * j, 20, 20);
            }
        }
    }
    return 0;
};

player.prototype.arrangeShip = function () {
    // solve random function ceiling
    var size;
    var a, b, i, num, shipOverlapped = false;

    for (size = 5; size > 0; size--) {
        // put condition for overlap check 
        shipOverlapped = false;
        num = size;

        if (size === 1 || size === 2) {
            num++;
        }

        if (floor(random(0, 2))) { // horizontal arrangement trigger       
            while (1) {
                a = floor(random(0, 10));
                b = floor(random(0, 11 - num));

                for (i = 0; i < num; i++) {

                    if (this.gridActual[a][b + i] !== 0) {
                        shipOverlapped = true;
                        // break and search for a non-overlapping spot again 
                        break;
                    }
                }

                if (!shipOverlapped) {
                    // updates ships begin coordinate which will be sent to database
                    this.ship[size - 1].begin.x = a;
                    this.ship[size - 1].begin.y = b;

                    for (i = 0; i < num; i++) {

                        this.gridActual[a][b + i] = size; //  horizontal arrangement by random
                    }

                    // updates ships end coordinate which will be sent to database
                    this.ship[size - 1].end = a;
                    this.ship[size - 1].end = b + i;
                    break; // breaks from while loop as ship is arranged successfully
                }
                shipOverlapped = false;
            }

        }

        else {
            while (1) {
                b = floor(random(0, 10));
                a = floor(random(0, 11 - num));

                for (i = 0; i < num; i++) {
                    if (this.gridActual[a + i][b] !== 0) {
                        shipOverlapped = true;
                        // break from for loop if ship overlaps
                        break;
                    }
                }

                if (!shipOverlapped) {
                    // updates ships begin coordinate which will be sent to database
                    this.ship[size - 1].begin.x = a;
                    this.ship[size - 1].begin.x = b;

                    for (i = 0; i < num; i++) {
                        this.gridActual[a + i][b] = size; //  vertical arrangement by random
                    }
                    // updates ships end coordinate which will be sent to database
                    this.ship[size - 1].end = a + i;
                    this.ship[size - 1].end = b;
                    break;
                }
                shipOverlapped = false;
            }
        }
    }
};

player.prototype.initializeGrid = function () {
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            this.gridHidden[i][j] = randomMap[i][j];
            this.gridActual[i][j] = randomMap[i][j];
        }
    }

    this.turn = 0;
    this.shipArranged = false;
    this.autoButtonPushed = false;
    this.confirmButtonPushed = false;

    this.currLife = [2, 3, 3, 4, 5];
    this.ship = [
        // Spacecraft 1
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        },
        // Spacecraft 2
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        },
        // Spacecraft 3
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        },
        // Spacecraft 4
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        },
        // Spacecraft 5
        {
            begin: { x: 0, y : 0 },
            end: { x: 0, y : 0 }
        }
    ];

    this.sendHtppRequest = true;
    this.startOnlineGame = false;
};