var singlePlayerState = function () {
<<<<<<< HEAD
    var backButton1 = new button("Back", 350, 450);
    var DensityLensButtonOn = new button("DensityLensON", 550, 450, 230);
    var DensityLensButtonOff = new button("DensityLensOFF", 810, 450, 240);
=======
    var backButton1 = new button("    Back", 580, 650);
    var DensityLensButtonOn = new button(" DensityLensON", 830, 650, 230);
    var DensityLensButtonOff = new button(" DensityLensOFF", 1140, 650, 240);
>>>>>>> parent of bafa90f (Fix components' position)

    backButton1.draw();

    // draws 10*10 grid for player 1
    if (!player1.confirmButtonPushed) {
        player1.drawGridActual();
        player1AutoButton.draw();
    } else {
        player1.drawGridHidden();
        DensityLensButtonOn.draw();
        DensityLensButtonOff.draw();
        if (DensityLensButtonOn.insideButton()) {
            if (!mouseIsPressed) {
                DensityLensButtonOn.lightUpButton();
            }
            if (mouseIsPressed) {
                densityLens = true;
                mouseIsPressed = false;
            }
        }
        if (DensityLensButtonOff.insideButton()) {
            if (!mouseIsPressed) {
                DensityLensButtonOff.lightUpButton();
            }
            if (mouseIsPressed) {
                densityLens = false;
                mouseIsPressed = false;
            }
        }

    }

    // draws 10*10 grid for BOT
    bot.drawGridHidden();

    // auto button for player 1
    if (player1.shipArranged === false) {
        player1AutoButton.draw();

        if (player1AutoButton.insideButton()) {
            //check to see if the mouse is pressed
            if (!mouseIsPressed) {
                //if mouse is not pressed then light up button
                player1AutoButton.lightUpButton();
            }
            if (mouseIsPressed) {
                player1.initializeGrid();
                player1.arrangeShip();
                player1.autoButtonPushed = true;
                mouseIsPressed = false;
            }
        }
    }

    // confirm button for player1
    if (player1.autoButtonPushed) {
        player1ConfirmButton.draw();

        if (player1ConfirmButton.insideButton()) {
            //check to see if the mouse is pressed
            if (!mouseIsPressed) {
                //if mouse is not pressed then light up button
                player1ConfirmButton.lightUpButton();
            }
            if (mouseIsPressed) {
                player1.autoButtonPushed = false;
                player1.shipArranged = true;
                player1.confirmButtonPushed = true;

                // arrange bots ship
                bot.initializeGrid();
                bot.arrangeShip();
                swapMap("single-player");
                mouseIsPressed = false;
            }
        }
    }


    // if both players have deployed ships start the game
    // main multiplayer pass N play if statement
    if (player1.confirmButtonPushed) {
        if (playerSwitching) {
            // delay loop
            playerSwitchingIterator++;

            if (playerOneTurn) {
                animate.showMessage("PLAYER 1 TURN");
            } else {
                animate.showMessage("BOT TURN");
            }

            if (playerSwitchingIterator > 50) {
                playerSwitchingIterator = 0;
                playerSwitching = false;
                playerOneTurn = playerOneTurn !== true;
            }
        }
        else if (playerOneTurn) {
            // argument 3 represents bot
            //  bot.play();
            if (bot.play() === true) {
                // make separate class for win
                winState = true;
                singlePlayer = false;
                bot.win = true;
                singlePlayerWin = true;
            }
        } else {
            //  player1.play(1);
            if (player1.play(1) === true) {
                winState = true;
                singlePlayer = false;
                player1.win = true;
                singlePlayerWin = true;
            }
        }

        if (densityLens === true) {
            bot.drawProbabilityDensityGrid();
        }
    }

    // back button  - common for both the players
    if (backButton1.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            backButton1.lightUpButton();
        }

        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            singlePlayer = false;
            menu = true;
            createNewSinglePlayerObject();
            player1.initializeGrid();
            bot.initializeGrid();
            mouseIsPressed = false;
        }
    }
};