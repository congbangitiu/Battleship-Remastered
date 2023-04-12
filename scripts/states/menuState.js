//draw function
var menuState = () => {
    //rectangle to go around the buttons
    fill(255, 100, 0, 220);
    rect(posX + 10, posY + 15, 350, 370, 60);
    fill(255, 255, 255);
    textSize(65);

    multiplayerButton.draw();
    instructionsButton.draw();
    creditsButton.draw();
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
        }
        else if (multiplayerButton.insideButton()) {
            multiplayerButton.lightUpButton();
            if (mouseIsPressed) {
                menu = false;
                multiPlayerOffline = true;
                makeNewMap = true;  
                initializeRandomMap();
            }    
        }
        else if (instructionsButton.insideButton()) {
            instructionsButton.lightUpButton();
            if (mouseIsPressed) {
                menu = false;
                instructions = true;
            }
        }
        else if (creditsButton.insideButton()) {
            creditsButton.lightUpButton();
            if (mouseIsPressed) {
                menu = false;
                credits = true;
            }    
        }
        else if (statisticsButton.insideButton()) {
            statisticsButton.lightUpButton();
            if (mouseIsPressed) {
                menu = false;
                statistics = true;
            }    
        }
    }
};