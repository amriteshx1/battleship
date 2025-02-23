export function showShip(shipAvailable1, shipAvailable2, square1List, square2List){
    const arr1 = shipAvailable1;
    const arr2 = shipAvailable2;

    for(let i = 0; i < shipAvailable1.length; i++){
        for (let j = 0; j < shipAvailable1.length; j++){
            if(arr1[i][j] != null){
                square1List[i * 10 + j].textContent = '🛳️';
            }
        }
    }

    for(let i = 0; i < shipAvailable2.length; i++){
        for (let j = 0; j < shipAvailable2.length; j++){
            if(arr2[i][j] != null){
                square2List[i * 10 + j].textContent = '🛳️';
            }
        }
    }
 
}