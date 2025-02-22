class Ship{
    constructor(length){
        this.length = length;
        this.hits = 0;
    }

    hit(){
        this.hits ++;
    }

    isSunk(){
        return this.hits >= this.length;
    }
}

class Gameboard{
    constructor (){
        this.grid = Array(10).fill(null).map(() => Array(10).fill(null));
        this.ships = [];
        this.misAttack = [];
    }

    placeShip(ship, coordinates){
        coordinates.forEach(([x, y]) => this.grid[x][y] = ship);
        this.ships.push(ship);
    }

    receiveAttack(x, y){
        if(this.grid[x][y]){
            this.grid[x][y].hit();
        }else{
            this.misAttack.push([x, y]);
        }
    }

    allSunk(){
        return this.ships.every(ship => ship.isSunk());
    }
}

module.exports = {Ship, Gameboard};