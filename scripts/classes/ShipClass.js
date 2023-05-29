let shipClass = function () {
    this.numberOfShips = 5; // Initialize number of Ships

    this.win = false; // Set up the game begin -> Not win (First condition)
    // Màu từng ô
    this.shipType = [
        // Spacecraft 1
        {color: {r: 239, g: 182, b: 187}, size: 2},
        // Spacecraft 2
        {color: {r: 137, g: 88, b: 115}, size: 3},
        // Spacecraft 3
        {color: {r: 107, g: 72, b: 96}, size: 3},
        // Spacecraft 4
        {color: {r: 44, g: 28, b: 44}, size: 4},
        // Spacecraft 5
        {color: {r: 34, g: 21, b: 39}, size: 5},
    ];
};