import {Ship, Gameboard, Player} from "./structure.js";
import { showShip } from "./render.js";

const newGame = document.getElementById('newGame');
const board1 = document.querySelector('.board1');
const board2 = document.querySelector('.board2');

const square1List = [];
const square2List = [];

for(let i = 0; i < 100; i++){
    let square1 = document.createElement('div');
    square1.className = 'square1';
    board1.append(square1);
    square1List.push(square1);

    let square2 = document.createElement('div');
    square2.className = 'square2';
    board2.append(square2);
    square2List.push(square2);
}


let player1 = new Player();
let player2 = new Player(true);
let currentPlayer;
let playerShips = [];
let computerShips = [];
let shipSizes = [4, 3, 3, 2, 2, 1]; 

board2.classList.add("disabled-board"); //Disable Board 2 at Start

function placeShipsRandomly(board, ships, squareList) {
    ships.length = 0;

    shipSizes.forEach((shipSize) => {
        let placed = false;

        while (!placed) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            let isHorizontal = Math.random() < 0.5;
            let shipCoords = [];

            for (let i = 0; i < shipSize; i++) {
                let r = isHorizontal ? row : row + i;
                let c = isHorizontal ? col + i : col;

                if (r >= 10 || c >= 10 || squareList[r * 10 + c].dataset.ship) break;

                shipCoords.push([r, c]);
            }

            if (shipCoords.length === shipSize) {
                let newShip = new Ship(shipSize);
                ships.push(newShip);
                board.placeShip(newShip, shipCoords);

                shipCoords.forEach(([r, c]) => {
                    squareList[r * 10 + c].dataset.ship = "true";
                    if (squareList === square1List) {
                        squareList[r * 10 + c].style.backgroundColor = "gray";
                    }
                });

                placed = true;
            }
        }
    });
}

placeShipsRandomly(player1.board, playerShips, square1List);
placeShipsRandomly(player2.board, computerShips, square2List);

alert("Welcome to Battleship! ⚔️🔥\n\nYour fleet is ready, and ships are placed automatically! Click 'Start Game' to unleash war on the high seas! 🌊💣");



newGame.addEventListener('click', (event) => {
    event.preventDefault();

    board1.classList.add("disabled-board");
    board2.classList.remove("disabled-board");

    showShip(player1.board.grid, player2.board.grid, square1List, square2List);

    currentPlayer = player1;
});

function switchPlayer(){
    if (currentPlayer === player1) {
        board2.classList.add("disabled-board"); 
        board1.classList.remove("disabled-board");
        currentPlayer = player2;
        setTimeout(computerMove, 1000);
    } else {
        board1.classList.add("disabled-board"); 
        board2.classList.remove("disabled-board");
        currentPlayer = player1;
    }
}

//the idea and logic thought process behind this enhanced intelligence of Computer's move was of mine ->
// -> but the code implementation wouldn't have been this polished without the help of GPT.
// ------------------------------------------------------------------------------------------
// -> (Will surely improvise it on my own in future.)

let hitQueue = [];

function computerMove() {
    let visited = false;

    while (!visited) {
        let row, col;

        // Remove already visited positions from hitQueue
        hitQueue = hitQueue.filter(([r, c]) => !square1List[r * 10 + c].dataset.visited);

        if (hitQueue.length > 0) {
            [row, col] = hitQueue.shift();
        } else {
            do {
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
            } while (square1List[row * 10 + col].dataset.visited);
        }

        const square = square1List[row * 10 + col];

        if (!square.dataset.visited) {
            player1.board.receiveAttack(row, col);
            square.dataset.visited = 'true';

            if (square.dataset.ship) {
                square.textContent = "🔥";
                square.style.backgroundColor = '#00008B';
                addAdjacentTargets(row, col);
            } else {
                square.textContent = "❌";
                square.style.backgroundColor = 'oklch(0.879 0.169 91.605)';
            }

            visited = true;
            setTimeout(switchPlayer, 500);
        }
    }
}

function addAdjacentTargets(row, col) {
    const directions = [
        [row - 1, col], // Up
        [row + 1, col], // Down
        [row, col - 1], // Left
        [row, col + 1]  // Right
    ];

    directions.forEach(([r, c]) => {
        if (r >= 0 && r < 10 && c >= 0 && c < 10) {
            let targetSquare = square1List[r * 10 + c];
            if (!targetSquare.dataset.visited) {
                hitQueue.push([r, c]);
            }
        }
    });
}

function checkGameOver() {
    if (player1.board.allSunk()) {

        setTimeout(() => {
            alert('Computer wins! 😶‍🌫️🎉 \n\n' +
                '(Click ok for another game)'
            );
            resetGame();
        }, 100);

    } else if (player2.board.allSunk()) {

        setTimeout(() => {
            alert('Player wins! 🎉🫂 \n\n' +
                '(Click ok for another game)'
            );
            resetGame();
        }, 100);
    }
}

function resetGame(){
    location.reload();
}


square2List.forEach((square, index) => {
    square.addEventListener('click', function handleAttack() {

        if(square.dataset.visited)return;

        const row = Math.floor(index / 10);
        const col = index % 10;
        
        player2.board.receiveAttack(row, col);
        square.dataset.visited = 'true';

        if(square.dataset.ship){
            square.textContent = "🔥";
            square.style.backgroundColor = '#00008B';
        }else{
            square.textContent = "❌";
            square.style.backgroundColor = 'oklch(0.879 0.169 91.605)';
        }
        checkGameOver();
        setTimeout(switchPlayer, 500);
    });
});

