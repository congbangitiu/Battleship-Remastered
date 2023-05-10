let countMeteor = 0;
// Generate meteors
let generateMeteor = function (countMeteor) {
  let meteorStack = { xCoord: [], yCoord: [] };

  // Size of island from 0 -> 10
  meteorStack.xCoord.push(floor(random(0, 10)));
  meteorStack.yCoord.push(floor(random(0, 10)));

  // Initialize meteors area
  while (countMeteor > 0) {
    let nodeX;
    let nodeY;

    if (meteorStack.xCoord.length === 0 && countMeteor > 0) {
      while (randomMap[nodeX][nodeY] === ISLAND) {
        nodeX = floor(random(0, 10));
        nodeY = floor(random(0, 10));
      }
      meteorStack.xCoord.push(nodeX);
      meteorStack.yCoord.push(nodeY);
    }

    nodeX = meteorStack.xCoord.pop();
    nodeY = meteorStack.yCoord.pop();

    while (
      meteorStack.xCoord.length !== 0 &&
      randomMap[nodeX][nodeY] === ISLAND
    ) {
      nodeX = meteorStack.xCoord.pop();
      nodeY = meteorStack.yCoord.pop();
    }

    if (randomMap[nodeX][nodeY] === ISLAND) {
      continue;
    }

    randomMap[nodeX][nodeY] = ISLAND;
    countMeteor--;

    let meteorArray = [[], []];

    if (nodeX + 1 < 10 && randomMap[nodeX + 1][nodeY] !== ISLAND) {
      meteorArray[0].push(nodeX + 1);
      meteorArray[1].push(nodeY);
    }
    if (nodeY + 1 < 10 && randomMap[nodeX][nodeY + 1] !== ISLAND) {
      meteorArray[0].push(nodeX);
      meteorArray[1].push(nodeY + 1);
    }
    if (nodeX - 1 >= 0 && randomMap[nodeX - 1][nodeY] !== ISLAND) {
      meteorArray[0].push(nodeX - 1);
      meteorArray[1].push(nodeY);
    }
    if (nodeY - 1 >= 0 && randomMap[nodeX][nodeY - 1] !== ISLAND) {
      meteorArray[0].push(nodeX);
      meteorArray[1].push(nodeY - 1);
    }

    let randNumber = floor(random(0, meteorArray[0].length));

    if (meteorArray[0].length === 0) {
      continue;
    }

    meteorStack.xCoord.push(meteorArray[0][randNumber]);
    meteorStack.yCoord.push(meteorArray[1][randNumber]);

    meteorArray[0].splice(randNumber, 1);
    meteorArray[1].splice(randNumber, 1);
  }
};

// // Draw map with meteor for playing
// let drawGeneratedMap = function (randomMap) {
//   let indent = 340;

//   for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//       fill(64, 54, 255);

//       if (randomMap[i][j] !== ISLAND) {
//         rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
//       } else {
//         fill(255, 212, 128);
//         rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
//       }
//     }
//   }
// };

// // Create new map state
// let newMapState = function () {
//   let backButton = new button("Back", 250, 450);
//   let newMapButton = new button("New map", 450, 450);
//   let startButton = new button("Start", 650, 450);

//   let meteorX = 600,
//     meteorY = 385;
//   let meteorCountButton = new button(
//     "    " + countMeteor,
//     meteorX,
//     meteorY,
//     120,
//     40
//   );
//   let leftArrow = new button("<", meteorX + 5, meteorY + 5, 30, 30);
//   let rightArrow = new button(">", meteorX + 120 - 35, meteorY + 5, 30, 30);

//   fill(255, 255, 255);
//   text("Meteor Area Blocks:", meteorX - 200, meteorY + 7, 200, 40);

//   backButton.draw();
//   startButton.draw();
//   newMapButton.draw();
//   meteorCountButton.draw();
//   leftArrow.draw();
//   rightArrow.draw();

//   drawGeneratedMap(randomMap);

//   if (leftArrow.insideButton()) {
//     if (!mouseIsPressed) {
//       leftArrow.lightUpButton();
//     } else {
//       if (countMeteor > 0) {
//         countMeteor--;
//       }
//       mouseIsPressed = false;
//     }
//   }

//   if (rightArrow.insideButton()) {
//     if (!mouseIsPressed) {
//       rightArrow.lightUpButton();
//     } else {
//       if (countMeteor < 25) {
//         countMeteor++;
//         mouseIsPressed = false;
//       }
//     }
//   }

//   if (startButton.insideButton()) {
//     //check to see if the mouse is pressed
//     if (!mouseIsPressed) {
//       //if mouse is not pressed then light up button
//       startButton.lightUpButton();
//     }
//     if (mouseIsPressed) {
//       //if mouse is pressed go to menu
//       makeNewMap = false;

//       if (singlePlayer === true) {
//         createNewSinglePlayerObject();
//       } else {
//         createNewMultiplayerObject();
//       }
//       mouseIsPressed = false;
//     }
//   }

//   if (newMapButton.insideButton()) {
//     //check to see if the mouse is pressed
//     if (!mouseIsPressed) {
//       //if mouse is not pressed then light up button
//       newMapButton.lightUpButton();
//     }
//     if (mouseIsPressed) {
//       //if mouse is pressed go to menu
//       for (let i = 0; i < 10; i++) {
//         for (let j = 0; j < 10; j++) {
//           randomMap[i][j] = 0;
//         }
//       }
//       generateIslands(countMeteor);
//       mouseIsPressed = false;
//     }
//   }
//   // back button  - common for both the players
//   if (backButton.insideButton()) {
//     //check to see if the mouse is pressed
//     if (!mouseIsPressed) {
//       //if mouse is not pressed then light up button
//       backButton.lightUpButton();
//     }
//     if (mouseIsPressed) {
//       //if mouse is pressed go to menu
//       makeNewMap = false;
//       singlePlayer = false;
//       multiPlayerOffline = false;
//       menu = true;
//       mouseIsPressed = false;
//     }
//   }
// };
