// Using DFS with a number of island blocks being customizable to generate the random island
var generateIslands = function (islandsCount) {
    var stack = {first: [], second: []};

    stack.first.push(floor(random(0, 10)));
    stack.second.push(floor(random(0, 10)));

    while (islandsCount > 0) {
        var nodeX;
        var nodeY;

        // If the stack is empty and there are islands left to generate,
        // find a random coordinate that is not already an island.
        if (stack.first.length === 0 && islandsCount > 0) {
            while (randomMap[nodeX][nodeY] === ISLAND) {
                nodeX = floor(random(0, 10));
                nodeY = floor(random(0, 10));
            }
            stack.first.push(nodeX);
            stack.second.push(nodeY);
        }

        // Pop the last coordinates from the stack.
        nodeX = stack.first.pop();
        nodeY = stack.second.pop();

        // If the popped coordinates are already an island, continue to the next iteration.
        while (stack.first.length !== 0 && randomMap[nodeX][nodeY] === ISLAND) {
            nodeX = stack.first.pop();
            nodeY = stack.second.pop();
        }

        if (randomMap[nodeX][nodeY] === ISLAND) {
            continue;
        }

        // Mark the current coordinates as an island on the randomMap.
        randomMap[nodeX][nodeY] = ISLAND;

        islandsCount--;

        var ar = [[], []];

        // Check neighboring coordinates and add valid ones to the ar array.
        if (nodeX + 1 < 10 && randomMap[nodeX + 1][nodeY] !== ISLAND) {
            ar[0].push(nodeX + 1);
            ar[1].push(nodeY);
        }
        if (nodeY + 1 < 10 && randomMap[nodeX][nodeY + 1] !== ISLAND) {
            ar[0].push(nodeX);
            ar[1].push(nodeY + 1);
        }
        if (nodeX - 1 >= 0 && randomMap[nodeX - 1][nodeY] !== ISLAND) {
            ar[0].push(nodeX - 1);
            ar[1].push(nodeY);
        }
        if (nodeY - 1 >= 0 && randomMap[nodeX][nodeY - 1] !== ISLAND) {
            ar[0].push(nodeX);
            ar[1].push(nodeY - 1);
        }

        // Randomly select a coordinate from the ar array.
        const randNumber = floor(random(0, ar[0].length));

        if (ar[0].length === 0) {
            continue;
        }

        // Push the selected coordinate to the stack and remove it from the ar array.
        stack.first.push(ar[0][randNumber]);
        stack.second.push(ar[1][randNumber]);

        ar[0].splice(randNumber, 1);
        ar[1].splice(randNumber, 1);
    }
};

var drawGeneratedMap = function (randomMap) {
    var indent = 770;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            fill(237, 237, 245);
            if (randomMap[i][j] !== ISLAND) {
                rect(indent + 50 + 30 * i, 100 + 30 * j, 30, 30);
            } else {
                fill(255, 212, 128);
                rect(indent + 50 + 30 * i, 100 + 30 * j, 30, 30);
            }
        }
    }
};

var islandsCount = 0;

var newMapState = function () {

    var backButton = new button("      Back", 590, 550);
    var newMapButton = new button("   New map", 870, 550);
    var startButton = new button("      Start", 1150, 550);

    var islandX = 1000, islandY = 450;
    var islandsCountButton = new button("      " + islandsCount, islandX, islandY, 120, 40);
    var leftArrow = new button(" <", islandX , islandY + 5, 30, 30);
    var rightArrow = new button(" >", islandX + 120 - 35, islandY + 5, 30, 30);

    fill(255, 255, 255);
    text("Island Blocks:", islandX - 200, islandY + 15, 200, 40);

    backButton.draw();
    startButton.draw();
    newMapButton.draw();
    islandsCountButton.draw();
    leftArrow.draw();
    rightArrow.draw();

    drawGeneratedMap(randomMap);

    if (leftArrow.insideButton()) {

        if (!mouseIsPressed) {

            leftArrow.lightUpButton();
        } else {
            if (islandsCount > 0) {
                islandsCount--;
            }
            mouseIsPressed = false;
        }
    }

    if (rightArrow.insideButton()) {

        if (!mouseIsPressed) {

            rightArrow.lightUpButton();
        } else {
            if (islandsCount < 25) {
                islandsCount++;
                mouseIsPressed = false;
            }
        }
    }

    if (startButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            startButton.lightUpButton();
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            makeNewMap = false;

            if (singlePlayer === true) {
                createNewSinglePlayerObject();
            } else {
                createNewMultiPlayerObject();
            }
            mouseIsPressed = false;
        }
    }

    if (newMapButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            newMapButton.lightUpButton();
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    randomMap[i][j] = 0;
                }
            }
            generateIslands(islandsCount);
            mouseIsPressed = false;
        }
    }
    // back button  - common for both the players
    if (backButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            backButton.lightUpButton();
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            makeNewMap = false;
            singlePlayer = false;
            multiPlayerOffline = false;
            menu = true;
            mouseIsPressed = false;
        }
    }
};