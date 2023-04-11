const playerClass = (player_name, player_role) => {
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
    let i = 1, j = 1, indent = 0;

    if (this.playerRole === 2)
        indent = 700;

    for (i = 0; i < this.shipName.length; i++) {
        for (j = 0; j < this.shipName[i].size; j++) {
            noFill();
            rect(indent + i * 85 + 40 + 20 * j, 40, 20, 25);
        }
        for (j = 0; j < this.currLife[i]; j++) {

        }
    }
}