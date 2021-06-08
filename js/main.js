/*----- constants -----*/
const colors = {
    '1' : "#ffc2e2", //red
    '-1' : "#bbbaff", //black
    '0' : "#f7fcff" //white
}
const TOTALTURNS = 42;

CLEARBOARD = [
    [0, 0, 0, 0, 0, 0],  // Column 0
    [0, 0, 0, 0, 0, 0],  // Column 1
    [0, 0, 0, 0, 0, 0],  // Column 2
    [0, 0, 0, 0, 0, 0],  // Column 3
    [0, 0, 0, 0, 0, 0],  // Column 4
    [0, 0, 0, 0, 0, 0],  // Column 5
    [0, 0, 0, 0, 0, 0],  // Column 6
];

/*----- app's state (variables) -----*/
let testVar = 1;
let board;
let turnsTaken = 0;
let playerTurn; // 1, -1
let winner; // null, 1, -1, "T"
 
/*----- cached element references -----*/
const colBtns = [...document.querySelectorAll("#column-buttons > div")];
const replayEl = document.getElementById("replay");
const headerEl = document.getElementById("header");

 /*----- event listeners -----*/
document.getElementById("column-buttons").addEventListener("click", handleMove);
document.getElementById("replay").addEventListener("click", init);
// /*----- functions -----*/
init();

function init() {
     //rng to find 1st player 
     const randomIdx = Math.floor(Math.random() * 2);
     if(randomIdx == 0){playerTurn = 1} else {playerTurn = -1}
    
    turnsTaken = 0;
    board = CLEARBOARD;
    playerTurn = 1;
    winner = null;

    console.log("Game started/restarted");
    console.log("Variables Reset");
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
        });
        colBtns[columnidx].style.visibility = column.includes(0) ? "visible" : "hidden";
    });
    //render message
    if(playerTurn == 1){
    headerEl.innerHTML = `Player ${playerTurn}'s turn! <br> Good Luck!`
    } else {`Player 2's turn! <br> Change Later`}

    console.log("Render has run / Page Updated");

    // if (gameStatus == "winB") {
    //     msgEl.innerText = "Player Black wins"
    // } else if (gameStatus == "winR") {
    //     msgEl.innerText = "Player White wins"
    // } else if (gameStatus == "winT") {
    //     msgEl.innerText = "TIE GAME"
    // } else {
    //     //state player's turn
    //     msgEl.innerHTML = `Player ${playerTurn}'s turn! <br> Good Luck!`
    // }
}

//win logic (not done)
function getWinner(colIdx, rowIdx) {

}

function handleMove(evt) {
    //   //if game isn't running do nothing
    //   getGameStatus();
    //   if(gameStatus !== "inGame") {
    //       console.log("Game not running, click failed")
    //       return false;}
      
    
    // update all impacted state
    const colIdx = colBtns.indexOf(evt.target);
    
    if (colIdx === -1 || winner) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    
    if (rowIdx === -1) return;
    colArr[rowIdx] = playerTurn;
    playerTurn = playerTurn * -1;

    winner = getWinner(colIdx, rowIdx);
    render();


}