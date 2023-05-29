var statisticsState = function () {

    background(104, 104, 145, 40);
    var backButton = new button("      Back", 870, 600);
    backButton.draw();

    var statTableX = 570, statTableY = 260;
    var slotHeight = 40 * 1.5, slotWidth = 100 * 1.5;


    fill(53, 71, 95, 300);



    rect(statTableX - slotWidth, statTableY - slotHeight * 2, statTableX * 2 - 55, statTableY * 1.5 - 15, 30);
    strokeWeight(2);

    fill(237, 237, 245);

    textSize(20);
    text("WON", 20 + statTableX, 12.5 + statTableY + slotHeight * -1, slotWidth, slotHeight);
    text("LOST", 20 + statTableX + slotWidth, 12.5 + statTableY + slotHeight * -1, slotWidth, slotHeight);
    text("SHIPS DESTROYED", 10 + statTableX + slotWidth * 2, 12.5 + statTableY + slotHeight * -1, slotWidth, slotHeight);
    text("SHIPS LOST", 20 + statTableX + slotWidth * 3, 12.5 + statTableY + slotHeight * -1, slotWidth, slotHeight);
    text("AVG TURNS TO WIN", 20 + statTableX + slotWidth * 4, 12.5 + statTableY + slotHeight * -1, slotWidth, slotHeight);
    text("WIN %", 20 + statTableX + slotWidth * 5, 12.5 + statTableY + slotHeight * -1, slotWidth, slotHeight);

    text("PLAYER 1", 30 + statTableX - slotWidth, 12.5 + statTableY, slotWidth, slotHeight);
    text("PLAYER 2", 30 + statTableX - slotWidth, 12.5 + statTableY + slotHeight, slotWidth, slotHeight);
    text("     BOT", 30 + statTableX - slotWidth, 12.5 + statTableY + slotHeight * 2, slotWidth, slotHeight);

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 6; j++) {
            var highestValInCol = false;

            for (var k = 0; k < 3; k++) {
                if (statTable[i][j] >= statTable[k][j]) {
                    highestValInCol = true;
                } else {
                    highestValInCol = false;
                    break;
                }
            }

            if (highestValInCol) {
                fill(155, 154, 182);
            } else {
                fill(255, 0, 0);
            }

            rect(statTableX + slotWidth * j, statTableY + slotHeight * i, slotWidth, slotHeight);

            fill(0, 0, 0);
            textSize(30);
            text(statTable[i][j], 30 + statTableX + slotWidth * j, 15 + statTableY + slotHeight * i, slotWidth, slotHeight);
        }
    }

    strokeWeight(1);
    if (backButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            backButton.lightUpButton()
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            statistics = false;
            menu = true;
        }
    }
};