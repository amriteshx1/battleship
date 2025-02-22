const Ship = require('./structure');


describe('test the ship object', () => {
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
    })
})