
$(document).ready(function () {
    // Initialize the game
    initializeGame();
    setTimeout(() => {
        $('.screen').css('display', 'flex');
        $('.loading').css('display', 'none');
    }, 2000);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            $('.grid-container').append(`<div class="grid-item" onclick="setOnClickAttr(this)" data-row="${i}" data-col="${j}"></div>`);
        }
    }
    const symbols = ['TIC', 'TAC', 'TOE'];
    count = 0;
    let inthandle = setInterval(() => {
        document.getElementById("change").innerHTML = symbols[count];
        count = (count + 1) % symbols.length;
    }, 2000);
});

function setOnClickAttr(self) {
    let row = $(self).data('row');
    let col = $(self).data('col');
    makeMove(self, row, col);
}

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let player1 = 'player1';
let player2 = 'player2';
let finishStatus = false;

const player1_anim = '<div class="cross-container"><div class="cross-line cross-line1"></div><div class="cross-line cross-line2"></div></div>';
const player2_anim = '<div class="circle"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" /></svg></div>';

let player = player1;

let moves = { player1: "O", player2: "X" };

// Function to initialize the game
function initializeGame() {
    // Clear the board
    clearBoard();
    // Display current player
    displayCurrentPlayer();
    player1 = 'player1';
    player2 = 'player2';
    finishStatus = false;
    player = player1;
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
    $('.currentPlayer').text(player == player1 ? player1 : player2);
}

function switchPlayer() {
    player = (player === player1) ? player2 : player1;
    displayCurrentPlayer();

}


function makeMove(self, posX, posY) {
    if (finishStatus) return;
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
    anime = player == player1 ? player1_anim : player2_anim;
    $(self).append(anime);
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
    finishStatus = true;
    $(".result-text").text(`${player} wins`);

    setTimeout(() => {
        overlayOn();
    }, 1000);
}

function showDrawMessage() {
    finishStatus = true;
    $(".result-text").text(`It's a draw`);
    setTimeout(() => {
        overlayOn();
    }, 1000);

}

function overlayOn() {
    $("#overlay").css('display', "block");
}

function overlayOff() {
    $("#overlay").css('display', "none");
    initializeGame();
}