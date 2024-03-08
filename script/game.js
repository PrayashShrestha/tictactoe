$(document).ready(function () {
    // Initialize the game
    initializeGame();

    // Event listener for clicking on grid items
    $('.grid-item').each(function () {
        let posX = $(this).data('posX');
        let posY = $(this).data('posY');
        $(this).click(function () {
            makeMove(posX, posY);
        });
    });
});

function setOnClickAttr(self) {
    let posX = $(self).data('posX');
    let posY = $(self).data('posY');
    makeMove(self, posX, posY);
}

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let player1 = 'player1';
let player2 = 'player2';

let player = player1;

let moves = { player1: "O", player2: "X" };

// Function to initialize the game
function initializeGame() {
    // Clear the board
    clearBoard();
    // Display current player
    displayCurrentPlayer();
}

// Function to clear the board
function clearBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    $('.grid-item').text('');
}

// Function to display current player
function displayCurrentPlayer() {
    $('.player1').text(player === player1 ? 'Current Player: ' + player1 : '');
    $('.player2').text(player === player2 ? 'Current Player: ' + player2 : '');
}

function switchPlayer() {
    player = (player === player1) ? player2 : player1;
}


function makeMove(self, posX, posY) {
    // check if the position is empty or not
    if (board[posX][posY] != '') return;

    board[posX][posY] = moves[player];

    addMove(self);
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

function addMove(self) {
    console.log(self);
    $(self).text(moves[parent]);
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