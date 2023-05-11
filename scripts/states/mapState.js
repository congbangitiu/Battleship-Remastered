let countMeteor = 0;

// Generate meteors
let generateMeteor = function (countMeteor) {
  let meteorStack = { xCoord: [], yCoord: [] };

  // Size of island from 0 -> 10
  meteorStack.xCoord.push(floor(random(0, 10)));
  meteorStack.yCoord.push(floor(random(0, 10)));

  // Initialize meteors area
  while (countMeteor > 0) {
    let nodeX = meteorStack.xCoord.pop();
    let nodeY = meteorStack.yCoord.pop();

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

// Draw map with meteor for playing
let drawGeneratedMap = function (randomMap) {
  let indent = 340;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      fill(64, 54, 255);

      if (randomMap[i][j] !== ISLAND) {
        rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
      } else {
        fill(255, 212, 128);
        rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
      }
    }
  }
};

let newMapState = function () {
  const backButton = new Button("Back", 250, 450);
  const newMapButton = new Button("New Map", 450, 450);
  const startButton = new Button("Start", 650, 450);

  let meteorCount = countMeteor;
  const meteorX = 600;
  const meteorY = 385;
  const meteorCountButton = new Button(
    `    ${meteorCount}`,
    meteorX,
    meteorY,
    120,
    40
  );
  const leftArrow = new Button("<", meteorX + 5, meteorY + 5, 30, 30);
  const rightArrow = new Button(">", meteorX + 120 - 35, meteorY + 5, 30, 30);

  fill(255, 255, 255);
  text("Meteor Area Blocks:", meteorX - 200, meteorY + 7, 200, 40);

  backButton.draw();
  startButton.draw();
  newMapButton.draw();
  meteorCountButton.draw();
  leftArrow.draw();
  rightArrow.draw();

  drawGeneratedMap(randomMap);

  if (leftArrow.insideButton() && mouseIsPressed) {
    if (meteorCount > 0) {
      meteorCount--;
    }
  }

  if (rightArrow.insideButton() && mouseIsPressed) {
    if (meteorCount < 25) {
      meteorCount++;
    }
  }

  if (meteorCount !== countMeteor) {
    countMeteor = meteorCount;
    meteorCountButton.setText(`    ${countMeteor}`);
  }

  if (startButton.insideButton() && mouseIsPressed) {
    makeNewMap = false;

    if (singlePlayer) {
      createNewSinglePlayerObject();
    } else {
      createNewMultiplayerObject();
    }
  }

  if (newMapButton.insideButton() && mouseIsPressed) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        randomMap[i][j] = 0;
      }
    }
    generateIslands(countMeteor);
  }

  if (backButton.insideButton() && mouseIsPressed) {
    makeNewMap = false;
    singlePlayer = false;
    multiPlayerOffline = false;
    menu = true;
  }
};
