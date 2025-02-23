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
let currentPlayer;

newGame.addEventListener('click', (event) => {
    event.preventDefault();

    player1 = new Player();
    player2 = new Player(true);

    const ship1 = new Ship(4);
    const ship2 = new Ship(3);
    const ship3 = new Ship(2);
    const ship4 = new Ship(3);
    const ship5 = new Ship(1);
    const ship6 = new Ship(2);

    player1.board.placeShip(ship1, [[2,3], [2,4], [2,5], [2,6]]);
    player1.board.placeShip(ship3, [[7,7], [7,8]]);
    player1.board.placeShip(ship2, [[4,3],[5,3],[6,3]]);
    player1.board.placeShip(ship4, [[9,3], [9,4], [9,5]]);
    player1.board.placeShip(ship5, [[0,7]]);
    player1.board.placeShip(ship6, [[5,8], [5,9]]);

    player2.board.placeShip(ship2, [[8,3], [8,4], [8,5]]);
    player2.board.placeShip(ship1, [[2,7], [3,7], [4,7], [5,7]]);
    player2.board.placeShip(ship3, [[5,2], [5,3]]);
    player2.board.placeShip(ship4, [[0,4], [1,4], [2,4]]);
    player2.board.placeShip(ship5, [[9,8]]);
    player2.board.placeShip(ship6, [[7,7], [7,8]]);
    
    showShip(player1.board.grid, player2.board.grid, square1List, square2List);
    currentPlayer = player1;
});

function switchPlayer(){
    currentPlayer = (currentPlayer === player1) ? player2 : player1;

    if(currentPlayer === player2){
        setTimeout(computerMove, 500);
    }
};

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
                square.textContent = "💥";
            }else{
                square.textContent = "❌";
            }
            visited = true;
            switchPlayer();
        }
    }
}


square2List.forEach((square, index) => {
    square.addEventListener('click', function handleAttack() {
        const row = Math.floor(index / 10);
        const col = index % 10;
        
        player2.board.receiveAttack(row, col);

        if(square.dataset.visited)return;
        square.dataset.visited = 'true';

        if(square.dataset.ship){
            square.textContent = "💥";
        }else{
            square.textContent = "❌";
        }
        
        switchPlayer();
    });
});


