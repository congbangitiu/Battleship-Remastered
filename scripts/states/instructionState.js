const instructionState = () => {
    textSize(35);
    fill(255, 255, 255);
    text("Instructions", 50, 50);
    fill(237, 34, 93, 250);
    rect(100,100,500,350,20);
    fill(255,255,255);
    textSize(17);
    text("Five ships are placed on each player's map, and the players take turns playing guess-fire on the other player's map until one of them sinks every ship to claim victory. If a player hits an opponent's ship, they gain an extra turn. BOT employs a probability density map to determine the ship's coordinates.\n\n\n  1. Press 'AUTO' to place your ships in a random order on the map. Press 'AUTO' again to change the order of your ships.\n  2. Click 'CONFIRM' to launch the game.\n  3. IMPORTANT: Online multiplayer is still in its infancy.", 125, 125, 450, 300);

    // Create button

    /* This part has not done */
    let backButton = new button("back", 255, 500);
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

