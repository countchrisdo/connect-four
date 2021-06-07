/*----- constants -----*/
const TOTALTURNS = 42;
const testVar = 0;

/*----- app's state (variables) -----*/
let gameStatus = "inGame"
let playerTurn = "Black"; //Black or Red
let turnsTaken = 0;

/*----- cached element references -----*/
const replayEl = document.getElementById("replay");
const slotsEl = document.getElementsByClassName("slot");
const msgEl = document.getElementById("msg");

/*----- event listeners -----*/
document.querySelector("td").addEventListener("click", handleSlotClick);
document.getElementById("replay").addEventListener("click", init);

/*----- functions -----*/
init();

function init() {
    //rng to find 1st player 
    const randomIdx = Math.floor(Math.random() * 2);
    if(randomIdx == 0){playerTurn = "Black"} else {playerTurn = "Red"}
    
    board = [
        [0, 0, 0, 0, 0, 0],  // Column 0
        [0, 0, 0, 0, 0, 0],  // Column 1
        [0, 0, 0, 0, 0, 0],  // Column 2
        [0, 0, 0, 0, 0, 0],  // Column 3
        [0, 0, 0, 0, 0, 0],  // Column 4
        [0, 0, 0, 0, 0, 0],  // Column 5
        [0, 0, 0, 0, 0, 0],  // Column 6
      ];
      console.log("Game started/restarted");
      console.log("Variables Reset");
      renderMessage()
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

// function renderSlots() {
//     slotsEl.forEach(function (sqr) {
//         //const tile = sqr.innerText;
//         if (sqr.value == "X") {
//             sqr.disabled;
//             sqr.className = "X";
//         } else if (sqr.value == "O") {
//             sqr.disabled;
//             sqr.className = "O";
//         } else {
//             sqr.className = "empty"
//         }
//     })
// }

function renderMessage() {
    //win message
    if (gameStatus == "winB") {
        msgEl.innerText = "Player Black wins"
    } else if (gameStatus == "winR") {
        msgEl.innerText = "Player White wins"
    } else if (gameStatus == "winT") {
        msgEl.innerText = "TIE GAME"
    } else {
        //state player's turn
        msgEl.innerHTML = `Player ${playerTurn}'s turn! <br> Good Luck!`
    }
}

function handleSlotClick(evt) {
    //if game isn't running do nothing
    getGameStatus();
    if(gameStatus !== "inGame") {
        console.log("Game not running, click failed")
        return false;}
    
    //if Slot is full, do nothing. if empty, log X/O
    if (evt.target.className !== "") {
        console.log("Slot is full, try again");
        return;
    } else {
        evt.target.value = `${playerTurn}`;
    };

    playerTurn == "Black" ? playerTurn = "Red" : playerTurn = "Black";

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
    if (turnsTaken >= 4) {

       
        //tie game
        if (testVar) {
            return gameStatus = "winT"
        };
        return gameStatus = "inGame";
    } 
}
gameStatus = getGameStatus();

if (turnsTaken >= "42") {
    getGameStatus();
    render();
}