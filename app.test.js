const {Ship, Gameboard} = require('./structure');


describe('test the Ship class', () => {
    test('ship', () => {
        const s = new Ship(3);
        expect(s.length).toBe(3);

        s.hit();
        expect(s.hits).toBe(1);

        s.hit();
        expect(s.hits).toBe(2);
        expect(s.isSunk()).toBe(false);

        s.hit();
        expect(s.hits).toBe(3);
        expect(s.isSunk()).toBe(true);
    });
});

describe('test the Gameboard class', () => {
    test('gameboard', () => {
        const board = new Gameboard();
        const ship = new Ship(3);
        board.placeShip(ship, [[2,1], [2,2], [2,3]]);
        expect(board.grid[2][2]).toBe(ship);

        board.receiveAttack(2,1);
        expect(ship.hits).toBe(1);

        board.receiveAttack(2,4);
        expect(board.misAttack).toContainEqual([2, 4]);

        board.receiveAttack(2,2);
        expect(board.allSunk()).toBe(false);

        board.receiveAttack(2,3);
        expect(board.allSunk()).toBe(true);
    });
});



