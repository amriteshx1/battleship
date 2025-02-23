import {Ship, Gameboard, Player} from "./structure.js";

const newGame = document.getElementById('newGame');


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
    

});





