var instructionState = function () {
    textSize(50);
    fill(255, 255, 255);
    text("Instructions", 850, 150);
    fill(54, 53, 109, 250);
    rect(650, 210, 670, 305, 20);
    fill(255, 255, 255);
    textSize(17);
    text("Five ships are placed on each player's map, and the players take turns playing guess-fire on the other player's map until one of them sinks every ship to claim victory. If a player hits an opponent's ship, they gain an extra turn. BOT employs a probability density map to determine the ship's coordinates.\n\n\n  1. Press 'AUTO' to place your ships in a random order on the map. Press 'AUTO' again to change the order of your ships.\n  2. Click 'CONFIRM' to launch the game.\n  3. IMPORTANT: Online multiplayer is still in its infancy.", 720, 250, 550, 450);

    // Create button
    background(104, 104, 145, 30);
    var backButton = new button("      Back", 870, 570);
    backButton.draw();

    // If the mouse is in the same place as the button
    if (mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.y + backButton.height) {
        // Check to see if the mouse is pressed
        if (!mouseIsPressed) {
            // If mouse is not pressed then light up button
            backButton.lightUpButton();
        }

        if (mouseIsPressed) {
            // If mouse is pressed then go to menu
            instructions = false;
            menu = true;
        }
    }
};

