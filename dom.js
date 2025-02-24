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

let player1, player2;
player1 = new Player();
player2 = new Player(true);
let currentPlayer;
let playerShips = [];
let shipSizes = [4, 3, 3, 2, 2, 1]; 

board2.classList.add("disabled-board"); // 🔴 Disable Board 2 at Start

alert(
    "Welcome to Battleship! 🎯\n\n" +
    "Place your ships by clicking on the squares."
);

alert(
    "Ship sizes (horizontal continuous placement):\n" +
    "[4, 3, 3, 2, 2, 1] \n\n" +

    "1st click: 4-block\n" +
    "2nd & 3rd click: 3-blocks\n" +
    "4th & 5th click: 2-blocks\n" +
    "Last click: 1-block\n\n" +
    "Let the battle begin! 🚢"
);

square1List.forEach((square, index) => {
    square.addEventListener("click", function () {
        if (playerShips.length >= shipSizes.length) return;

        let row = Math.floor(index / 10);
        let col = index % 10;

        if (!square.dataset.ship) {
            let shipSize = shipSizes[playerShips.length];
            let shipCoords = [];

            for (let i = 0; i < shipSize; i++) {
                if (col + i >= 10 || square1List[row * 10 + col + i].dataset.ship) return;
                shipCoords.push([row, col + i]);
            }

            let newShip = new Ship(shipSize);
            playerShips.push(newShip);
            player1.board.placeShip(newShip, shipCoords);

            shipCoords.forEach(([r, c]) => {
                square1List[r * 10 + c].dataset.ship = "true";
                square1List[r * 10 + c].style.backgroundColor = "gray";
            });

            if (playerShips.length === shipSizes.length) {
                alert("All ships placed. Click Start game below!");
            }
        }
    });
});

function placeComputerShips() {
    let shipSizes = [4, 3, 3, 2, 2, 1];

    shipSizes.forEach((size) => {
        let placed = false;

        while (!placed) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * (10 - size));
            let shipCoords = [];
            let canPlace = true;

            for (let i = 0; i < size; i++) {
                if (player2.board.grid[row][col + i] !== null) {
                    canPlace = false;
                    break;
                }
                shipCoords.push([row, col + i]);
            }

            if (canPlace) {
                let newShip = new Ship(size);
                player2.board.placeShip(newShip, shipCoords);
                placed = true;

                shipCoords.forEach(([r, c]) => {
                    square2List[r * 10 + c].style.backgroundColor = "gray"; 
                });
            }
        }
    });
}


newGame.addEventListener('click', (event) => {
    event.preventDefault();

    if (playerShips.length < shipSizes.length) {
        alert("Place all your ships first!");
        return;
    }

    board1.classList.add("disabled-board");
    board2.classList.remove("disabled-board");

    placeComputerShips(); 
    showShip(player1.board.grid, player2.board.grid, square1List, square2List);

    currentPlayer = player1;
    board1.classList.add("disabled-board");
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

function computerMove(){
    let visited = false;

    while(!visited){
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const square = square1List[row * 10 + col];

        if(!square.dataset.visited){
            player1.board.receiveAttack(row, col);
            square.dataset.visited = 'true';

            if(square.dataset.ship){
                square.textContent = "🔥";
                square.style.backgroundColor = 'red';
            }else{
                square.textContent = "❌";
                square.style.backgroundColor = 'oklch(0.879 0.169 91.605)';
            }
            visited = true;
            setTimeout(switchPlayer, 500);
        }
    }
}


function checkGameOver() {
    if (player1.board.allSunk()) {
        alert('Computer wins! \n' +
            '(Click ok for another game)'
        );
        resetGame();
    } else if (player2.board.allSunk()) {
        alert('Player wins! \n' +
            '(Click ok for another game)'
        );
        resetGame();
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
            square.style.backgroundColor = 'red';
        }else{
            square.textContent = "❌";
            square.style.backgroundColor = 'oklch(0.879 0.169 91.605)';
        }
        checkGameOver();
        setTimeout(switchPlayer, 500);
    });
});

