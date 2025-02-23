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


newGame.addEventListener('click', (event) => {
    event.preventDefault();

    const player1 = new Player();
    const player2 = new Player(true);

    const ship1 = new Ship(4);
    const ship2 = new Ship(3);
    const ship3 = new Ship(2);

    player1.board.placeShip(ship1, [[2,3], [2,4], [2,5], [2,6]]);
    player1.board.placeShip(ship3, [[7,7], [7,8]]);
    player1.board.placeShip(ship2, [[4,3],[5,3],[6,3]]);

    player2.board.placeShip(ship2, [[8,6], [8,7], [8,8]]);
    player2.board.placeShip(ship1, [[3,5], [4,5], [5,5], [6,5]]);
    player2.board.placeShip(ship3, [[5,2], [5,3]]);
    
    showShip(player1.board.grid, player2.board.grid, square1List, square2List);

});





