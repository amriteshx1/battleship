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
                    squareList[r * 10 + c].style.backgroundColor = "gray";
                    // if (squareList === square1List) {
                    //     squareList[r * 10 + c].style.backgroundColor = "gray";
                    // }
                });

                placed = true;
            }
        }
    });
}

placeShipsRandomly(player1.board, playerShips, square1List);
placeShipsRandomly(player2.board, computerShips, square2List);


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
            square.style.backgroundColor = 'red';
        }else{
            square.textContent = "❌";
            square.style.backgroundColor = 'oklch(0.879 0.169 91.605)';
        }
        checkGameOver();
        setTimeout(switchPlayer, 500);
    });
});

