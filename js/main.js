/*----- constants -----*/
const TOTALTURNS = 9;
const WINCONDX = "XXX";
const WINCONDO = "OOO";
/*----- app's state (variables) -----*/
let gameStatus = "inGame"
let playerTurn = "";
let turnsTaken = 0;
let playerTurnLog = "";
let turnsTakenLog = "Turns taken so far: 0";
/*----- cached element references -----*/
const replayEl = document.getElementById("replay");
const squares = document.querySelectorAll("div input");
const msgEl = document.getElementById("msg");
/*----- event listeners -----*/
document.querySelector("div").addEventListener("click", handleSquareClick);
document.getElementById("replay").addEventListener("click", init);
/*----- functions -----*/
init();
function init() {
    //rng to find 1st player 
    const randomIdx = Math.floor(Math.random() * 2);
    if(randomIdx == 0){playerTurn = "X"} else {playerTurn = "O"}
    
    board = [
        [0, 0, 0, 0, 0, 0],  // Column 0
        [0, 0, 0, 0, 0, 0],  // Column 1
        [0, 0, 0, 0, 0, 0],  // Column 2
        [0, 0, 0, 0, 0, 0],  // Column 3
        [0, 0, 0, 0, 0, 0],  // Column 4
        [0, 0, 0, 0, 0, 0],  // Column 5
        [0, 0, 0, 0, 0, 0],  // Column 6
      ];
      console.log("Variable's Reset");
      render();
}
function render() {
    // itterate over each column in  board
    board.forEach((column, columnidx) => {
        // itterate over each cell in column
        column.forEach((cell, cellidx) => {
            // find specific cell using columnidx and cellidx
            let div = document.getElementById(`c${columnidx}r${cellidx}`);
            div.style.backgroundColor = colors[cell];
        })
    });
    
    //only show replay button at the end of the game
    if (gameStatus == "inGame") {
        replayEl.style.visibility = "hidden"
    } else {
        replayEl.style.visibility = "visible"
    };
    console.log("Render has run / Page Updated");
}

function renderSquares() {
    squares.forEach(function (sqr) {
        //const tile = sqr.innerText;
        if (sqr.value == "X") {
            sqr.disabled;
            sqr.className = "X";
        } else if (sqr.value == "O") {
            sqr.disabled;
            sqr.className = "O";
        } else {
            sqr.className = "empty"
        }
    })
}

function renderMessage() {
    //win message
    if (gameStatus == "winX") {
        msgEl.innerText = "Player X wins"
    } else if (gameStatus == "winO") {
        msgEl.innerText = "Player O wins"
    } else if (gameStatus == "winT") {
        msgEl.innerText = "TIE GAME"
    } else {
        //state player's turn
        msgEl.innerHTML = `Player ${playerTurn}'s turn! <br> Good Luck!`
    }
}

function handleSquareClick(evt) {
    //if game isn't running do nothing
    getGameStatus();
    if(gameStatus !== "inGame") return false;
    
    //if square is full, do nothing. if empty, log X/O
    if (evt.target.value !== "") {
        console.log("Square is full, try again");
        return;
    } else {
        evt.target.value = `${playerTurn}`;
    };

    playerTurn == "X" ? playerTurn = "O" : playerTurn = "X";

    getGameStatus();
    
    turnsTaken++;

    render();
    GameLog();
}

//Checking the state of the game
function getGameStatus() {
    if (turnsTaken == TOTALTURNS) {
        console.log("Game Status after Game Status Check: " + gameStatus);
        return "winT"
    }
    //Checking Winner 
    if (turnsTaken >= 3) {

        let topRowCount = squares[0].value.length + squares[1].value.length + squares[2].value.length;
        let midRowCount = squares[3].value.length + squares[4].value.length + squares[5].value.length;
        let botRowCount = squares[6].value.length + squares[7].value.length + squares[8].value.length;
        let leftColCount = squares[0].value.length + squares[3].value.length + squares[6].value.length;
        let midColCount = squares[1].value.length + squares[4].value.length + squares[7].value.length;
        let rightColCount = squares[2].value.length + squares[5].value.length + squares[8].value.length;
        let diagCount = squares[0].value.length + squares[2].value.length + squares[4].value.length + squares[6].value.length + squares[8].value.length;

        //top row
        if (topRowCount == 3) {
            console.log("Top ROW RAN")

            if (squares[0].value + squares[1].value + squares[2].value == WINCONDX) {
                console.log("X IS THE WINNER");
                return gameStatus = "winX";
            } else if (squares[0].value + squares[1].value + squares[2].value == WINCONDO) {
                console.log("O IS THE WINNER");

                return gameStatus = "winO";
            }
        }
        //middle row
        if (midRowCount == 3) {

            if (squares[3].value + squares[4].value + squares[5].value == WINCONDX) {
                console.log("X IS THE WINNER");
                return gameStatus = "winX";
            } else if (squares[3].value + squares[4].value + squares[5].value == WINCONDO) {
                console.log("O IS THE WINNER");
                return gameStatus = "winO";
            }
        }
        //bottom row
        if (botRowCount == 3) {
            if (squares[6].value + squares[7].value + squares[8].value == WINCONDX) {
                console.log("X IS THE WINNER");
                return gameStatus = "winX";
            } else if (squares[6].value + squares[7].value + squares[8].value == WINCONDO) {
                console.log("O IS THE WINNER");
                return gameStatus = "winO";
            }
        }
        //left col
        if (leftColCount == 3) {
            if (squares[0].value + squares[3].value + squares[6].value == WINCONDX) {
                console.log("X IS THE WINNER");
                return gameStatus = "winX";
            } else if (squares[0].value + squares[3].value + squares[6].value == WINCONDO) {
                console.log("O IS THE WINNER");
                return gameStatus = "winO";
            }
        }
        //mid col
        if (midColCount == 3) {
            if (squares[1].value + squares[4].value + squares[7].value == WINCONDX) {
                console.log("X IS THE WINNER");
                return gameStatus = "winX";
            } else if (squares[1].value + squares[4].value + squares[7].value == WINCONDO) {
                console.log("O IS THE WINNER");
                return gameStatus = "winO";
            }
        }
        //bottom col
        if (rightColCount == 3) {
            if (squares[2].value + squares[5].value + squares[8].value == WINCONDX) {
                console.log("X IS THE WINNER");
                return gameStatus = "winX";
            } else if (squares[2].value + squares[5].value + squares[8].value == WINCONDO) {
                console.log("O IS THE WINNER");
                return gameStatus = "winO";
            }
        }
        //diag
        if (diagCount >= 3) {
            if (squares[0].value + squares[4].value + squares[8].value == WINCONDX) {
                console.log("X IS THE WINNER");
                return gameStatus = "winX";
            } else if (squares[0].value + squares[4].value + squares[8].value == WINCONDO) {
                console.log("O IS THE WINNER");
                return gameStatus = "winO";
            } else if (squares[2].value + squares[4].value + squares[6].value == WINCONDX) {
                console.log("X IS THE WINNER");
                return gameStatus = "winX";
            } else if (squares[2].value + squares[4].value + squares[6].value == WINCONDO) {
                console.log("O IS THE WINNER");
                return gameStatus = "winO";
            }
        }
        //tie game
        if (topRowCount + botRowCount + midRowCount == 9) {
            return gameStatus = "winT"
        };
        return gameStatus = "inGame";
    } else if (turnsTaken == 9) {
        gameStatus = "winT";
    } else {
        gameStatus = "inGame";
    }
}
gameStatus = getGameStatus();

if (turnsTaken >= "8") {
    getGameStatus();
    render();
}

//Game Log
function GameLog(){
    playerLog=document.getElementById("playerLog");
    playerLog.innerText = (playerTurnLog)
    turnLog = document.getElementById("turnLog")
    turnLog.innerText = (turnsTakenLog)

}
GameLog();