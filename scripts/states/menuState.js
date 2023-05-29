//draw function
var menuState = function () {
    //rectangle to go around the buttons
    fill(130, 129, 164, 220);
    rect(posX + 400, posY + 120, 350, 370, 60);
    fill(255, 255, 255);
    textSize(65);

    multiPlayerButton.draw();
    instructionButton.draw();
    statisticsButton.draw();
    singlePlayerButton.draw();

    if (mouseX > singlePlayerButton.x && mouseX < singlePlayerButton.x + singlePlayerButton.width && mouseY > singlePlayerButton.y) {
        //if mouse is pressed go to play
        if (singlePlayerButton.insideButton()) {
            singlePlayerButton.lightUpButton();
            if (mouseIsPressed) {
                menu = false;
                singlePlayer = true;
                makeNewMap = true;
                initializeRandomMap();
            }
        } else if (multiPlayerButton.insideButton()) {
            multiPlayerButton.lightUpButton();
            if (mouseIsPressed) {
                menu = false;
                multiPlayerOffline = true;
                makeNewMap = true;
                initializeRandomMap();
            }
        } else if (instructionButton.insideButton()) {
            instructionButton.lightUpButton();
            if (mouseIsPressed) {
                menu = false;
                instructions = true;
            }
        } else if (statisticsButton.insideButton()) {
            statisticsButton.lightUpButton();
            if (mouseIsPressed) {
                menu = false;
                statistics = true;
            }
        }
    }
};