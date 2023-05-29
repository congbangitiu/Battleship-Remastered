let shipClass = function() {
    this.numberOfShips = 5; // Initialize number of Ships

    this.win = false; // Set up the game begin -> Not win (First condition)

    this.shipType = [
        // Spacecraft 1
        {color: {r: 0, g: 240, b: 0}, size: 1},
        // Spacecraft 2
        {color: {r: 0, g: 240, b: 0}, size: 3},
        // Spacecraft 3
        {color: {r: 0, g: 240, b: 0}, size: 5},
        // Spacecraft 4
        {color: {r: 0, g: 240, b: 0}, size: 2},
        // Spacecraft 5
        {color: {r: 0, g: 240, b: 0}, size: 4},
    ];
};