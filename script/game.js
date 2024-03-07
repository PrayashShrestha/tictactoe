let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let player1 = 'player1';
let player2 = 'player2';

let player = player1;

let moves = { player1: "O", player2: "X" };

function switchPlayer() {
    player = (player === player1) ? player2 : player1;
}


function makeMove(posX, posY) {
    // check if the position is empty or not
    if (board[posX][posY] != '') return;

    board[posX][posY] = moves[player];

    if (checkWinner(player)) {
        // give a winner message
        showWinnerMessage(player);
    }

    if (checkFilled()) {
        // show as a draw
        return;
    }

    switchPlayer();
}

function checkWinner() {
    let move = moves[player];
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === move && board[i][1] === move && board[i][2] === move) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === move && board[1][i] === move && board[2][i] === move) {
            return true;
        }
    }

    // Check diagonals
    if ((board[0][0] === move && board[1][1] === move && board[2][2] === move) ||
        (board[0][2] === move && board[1][1] === move && board[2][0] === move)) {
        return true;
    }

    return false;
}

function checkFilled() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false; // If any cell is empty, the board is not filled
            }
        }
    }
    return true;
}

function showWinnerMessage() {
    alert("Player " + player + " wins!");
}

function showDrawMessage() {
    alert("It's a draw!");
}