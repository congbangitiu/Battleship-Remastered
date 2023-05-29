// Define basic enumerate value
const statisticsEnum = {
    row: {
        Player1: 0,
        Player2: 1,
        botPlayer: 2,
    },
    col: {
        matchesWon: 0,
        matchesLost: 1,
        shipsDestroyed: 2,
        shipsLost: 3,
        avgTurnsToWin: 4,
        winPercentage: 5,
    },
};

// Modify roundTo function
function roundTo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

// Initialize state call
var winStateCall = function () {
    fill(240, 218, 240);

    // display victory message too
    if (player1.win === true) {
        textSize(40);
        text(
            "Player 1 VICTORY --- Player 1 win !!! turns: " + player1.turn,
            800, 350,
            400,
            400
        );

        if (singlePlayerWin === true) {
            bot.drawGridActual();

            if (!statTableUpdated) {
                // opponent loses match
                statTable[statisticsEnum.row.botPlayer][
                    statisticsEnum.col.matchesLost
                    ]++;

                // matches won by player
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon]++;

                // average turns to win
                statTable[statisticsEnum.row.Player1][
                    statisticsEnum.col.avgTurnsToWin
                    ] += player1.turn;
                statTable[statisticsEnum.row.Player1][
                    statisticsEnum.col.avgTurnsToWin
                    ] = roundTo(
                    statTable[statisticsEnum.row.Player1][
                        statisticsEnum.col.avgTurnsToWin
                        ] /
                    statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon]
                );

                // win percentage
                statTable[statisticsEnum.row.Player1][
                    statisticsEnum.col.winPercentage
                    ] = roundTo(
                    (statTable[statisticsEnum.row.Player1][
                            statisticsEnum.col.matchesWon
                            ] /
                        (statTable[statisticsEnum.row.Player1][
                                statisticsEnum.col.matchesWon
                                ] +
                            statTable[statisticsEnum.row.Player1][
                                statisticsEnum.col.matchesLost
                                ])) *
                    100
                );
                statTable[statisticsEnum.row.botPlayer][
                    statisticsEnum.col.winPercentage
                    ] = roundTo(
                    (statTable[statisticsEnum.row.botPlayer][
                            statisticsEnum.col.matchesWon
                            ] /
                        (statTable[statisticsEnum.row.botPlayer][
                                statisticsEnum.col.matchesWon
                                ] +
                            statTable[statisticsEnum.row.botPlayer][
                                statisticsEnum.col.matchesLost
                                ])) *
                    100
                );
                // number of ships destroyed

                var numberOfShipsLost = 0;
                for (var i = 0; i < 5; i++) {
                    if (player1.currLife[i] === 0) {
                        numberOfShipsLost++;
                    }
                }

                statTable[statisticsEnum.row.Player1][
                    statisticsEnum.col.shipsDestroyed
                    ] += numberOfShipsLost;
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsLost] +=
                    numberOfShipsLost;
                // number of ships lost

                statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] +=
                    bot.countShipStatus();
                statTable[statisticsEnum.row.botPlayer][
                    statisticsEnum.col.shipsDestroyed
                    ] += bot.countShipStatus();
                statTableUpdated = true;
            }
        } else {
            player2.drawGridActual();

            if (!statTableUpdated) {
                statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesLost]++;

                statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon]++;

                // average turns to win
                statTable[statisticsEnum.row.Player1][
                    statisticsEnum.col.avgTurnsToWin
                    ] += player1.turn;
                statTable[statisticsEnum.row.Player1][
                    statisticsEnum.col.avgTurnsToWin
                    ] = roundTo(
                    statTable[statisticsEnum.row.Player1][
                        statisticsEnum.col.avgTurnsToWin
                        ] /
                    statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon]
                );

                // win percentage
                statTable[statisticsEnum.row.Player1][
                    statisticsEnum.col.winPercentage
                    ] = roundTo(
                    (statTable[statisticsEnum.row.Player1][
                            statisticsEnum.col.matchesWon
                            ] /
                        (statTable[statisticsEnum.row.Player1][
                                statisticsEnum.col.matchesWon
                                ] +
                            statTable[statisticsEnum.row.Player1][
                                statisticsEnum.col.matchesLost
                                ])) *
                    100.0
                );
                statTable[statisticsEnum.row.Player2][
                    statisticsEnum.col.winPercentage
                    ] = roundTo(
                    (statTable[statisticsEnum.row.Player2][
                            statisticsEnum.col.matchesWon
                            ] /
                        (statTable[statisticsEnum.row.Player2][
                                statisticsEnum.col.matchesWon
                                ] +
                            statTable[statisticsEnum.row.Player2][
                                statisticsEnum.col.matchesLost
                                ])) *
                    100.0
                );
                // number of ships destroyed
                var numberOfShipsDestroyed = 0;
                for (var i = 0; i < 5; i++) {
                    if (player2.currLife[i] === 0) {
                        numberOfShipsDestroyed++;
                    }
                }
                var numberOfShipsLost = 0;
                for (var i = 0; i < 5; i++) {
                    if (player1.currLife[i] === 0) {
                        numberOfShipsLost++;
                    }
                }
                statTable[statisticsEnum.row.Player1][
                    statisticsEnum.col.shipsDestroyed
                    ] += numberOfShipsLost;
                statTable[statisticsEnum.row.Player2][statisticsEnum.col.shipsLost] +=
                    numberOfShipsLost;
                // number of ships lost

                statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] +=
                    numberOfShipsDestroyed;
                statTable[statisticsEnum.row.Player2][
                    statisticsEnum.col.shipsDestroyed
                    ] += numberOfShipsDestroyed;
                statTableUpdated = true;
            }
        }
    } else if (player2.win === true) {
        textSize(40);
        text(
            "Player 2 VICTORY --- Player 2 win !!! turns : " + player2.turn,
            800, 350,
            400,
            400
        );

        if (!statTableUpdated) {
            statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon]++;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost]++;

            // average turns to win
            statTable[statisticsEnum.row.Player2][statisticsEnum.col.avgTurnsToWin] +=
                player2.turn;
            statTable[statisticsEnum.row.Player2][statisticsEnum.col.avgTurnsToWin] =
                roundTo(
                    statTable[statisticsEnum.row.Player2][
                        statisticsEnum.col.avgTurnsToWin
                        ] /
                    statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon]
                );

            // win percentage
            statTable[statisticsEnum.row.Player2][statisticsEnum.col.winPercentage] =
                roundTo(
                    (statTable[statisticsEnum.row.Player2][
                            statisticsEnum.col.matchesWon
                            ] /
                        (statTable[statisticsEnum.row.Player2][
                                statisticsEnum.col.matchesWon
                                ] +
                            statTable[statisticsEnum.row.Player2][
                                statisticsEnum.col.matchesLost
                                ])) *
                    100.0
                );
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] =
                roundTo(
                    (statTable[statisticsEnum.row.Player1][
                            statisticsEnum.col.matchesWon
                            ] /
                        (statTable[statisticsEnum.row.Player1][
                                statisticsEnum.col.matchesWon
                                ] +
                            statTable[statisticsEnum.row.Player1][
                                statisticsEnum.col.matchesLost
                                ])) *
                    100.0
                );
            // number of ships destroyed
            var numberOfShipsDestroyed = 0;
            for (var i = 0; i < 5; i++) {
                if (player1.currLife[i] === 0) {
                    numberOfShipsDestroyed++;
                }
            }
            var numberOfShipsLost = 0;
            for (var i = 0; i < 5; i++) {
                if (player2.currLife[i] === 0) {
                    numberOfShipsLost++;
                }
            }

            statTable[statisticsEnum.row.Player2][
                statisticsEnum.col.shipsDestroyed
                ] += numberOfShipsLost;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] +=
                numberOfShipsLost;
            // number of ships lost

            statTable[statisticsEnum.row.Player2][statisticsEnum.col.shipsLost] +=
                numberOfShipsDestroyed;
            statTable[statisticsEnum.row.Player1][
                statisticsEnum.col.shipsDestroyed
                ] += numberOfShipsDestroyed;

            statTableUpdated = true;
        }
        player1.drawGridActual();
    } else {
        fill(54, 53, 109, 250); 
        rect(760, 330, 420, 130, 20);
        fill(230, 230, 237);
        textSize(40);
        text("BOT VICTORY --- Bot win !!! turns: " + bot.turn, 800, 350, 400, 400);

        if (statTableUpdated === false) {
            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon]++;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost]++;

            // average turns to win
            statTable[statisticsEnum.row.botPlayer][
                statisticsEnum.col.avgTurnsToWin
                ] += bot.turn;
            statTable[statisticsEnum.row.botPlayer][
                statisticsEnum.col.avgTurnsToWin
                ] = roundTo(
                statTable[statisticsEnum.row.botPlayer][
                    statisticsEnum.col.avgTurnsToWin
                    ] /
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon]
            );

            // win percentage
            statTable[statisticsEnum.row.botPlayer][
                statisticsEnum.col.winPercentage
                ] = roundTo(
                (statTable[statisticsEnum.row.botPlayer][
                        statisticsEnum.col.matchesWon
                        ] /
                    (statTable[statisticsEnum.row.botPlayer][
                            statisticsEnum.col.matchesWon
                            ] +
                        statTable[statisticsEnum.row.botPlayer][
                            statisticsEnum.col.matchesLost
                            ])) *
                100
            );
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] =
                roundTo(
                    (statTable[statisticsEnum.row.Player1][
                            statisticsEnum.col.matchesWon
                            ] /
                        (statTable[statisticsEnum.row.Player1][
                                statisticsEnum.col.matchesWon
                                ] +
                            statTable[statisticsEnum.row.Player1][
                                statisticsEnum.col.matchesLost
                                ])) *
                    100
                );
            // number of ships destroyed
            var numberOfShipsDestroyed = 0;
            for (var i = 0; i < 5; i++) {
                if (player1.currLife[i] === 0) {
                    numberOfShipsDestroyed++;
                }
            }

            statTable[statisticsEnum.row.botPlayer][
                statisticsEnum.col.shipsDestroyed
                ] += bot.countShipStatus();
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] +=
                bot.countShipStatus();
            // number of ships lost

            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsLost] +=
                numberOfShipsDestroyed;
            statTable[statisticsEnum.row.Player1][
                statisticsEnum.col.shipsDestroyed
                ] += numberOfShipsDestroyed;

            statTableUpdated = true;
        }

        player1.drawGridActual();
    }

    var backButton = new button("     Menu", 800, 550);
    backButton.draw();

    if (backButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            backButton.lightUpButton();
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            winState = false;
            menu = true;
            statTableUpdated = false;

            singlePlayerWin = false;
            player1.initializeGrid();
            player2.initializeGrid();
            bot.initializeGrid();
            createNewMultiPlayerObject();
            createNewSinglePlayerObject();
        }
    }
};
