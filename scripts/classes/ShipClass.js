class ShipClass {
    constructor() {
        this.numberOfShips = 5; // Initialize number of Ships

        this.win = false; // Set up the game begin -> Not win (First condition)

        this.shipType = [
            // Ship 1
            { color: { r: 0, g: 240, b: 0 }, size: 1 },
            // Ship 2
            { color: { r: 0, g: 240, b: 0 }, size: 3 },
            // Ship 3
            { color: { r: 0, g: 240, b: 0 }, size: 5 },
            // Ship 4
            { color: { r: 0, g: 240, b: 0 }, size: 2 },
            // Ship 5
            { color: { r: 0, g: 240, b: 0 }, size: 4 },
        ];
    };
};