let gameArray = [];
gameArray.length = 9;
// gameArray[4] = 'x';
// gameArray[6] = 'o';

const gameBoard = (() => {
    let counter = 1;
    const changeTile = () => {
        for (let i = 0; i < 9; i++) {
            const tile = document.getElementById(`tile-${i+1}`)
            if (event.target === tile) {
                if (counter%2 === 0 && gameArray[i] === undefined) {
                    gameArray[i] = 'x';
                    counter++;     
                };
                if (counter%2 === 1 && gameArray[i] === undefined) {
                    gameArray[i] = 'o';
                    counter++;
                };
            };
        };
        displayController.display();
        checkResult();
    };
    const checkResult = () => {
        if ((gameArray[0] === gameArray[1]) && // checks row 1
            (gameArray[1] === gameArray[2]) &&
            (gameArray[0] !== undefined) ||  
            (gameArray[3] === gameArray[4]) && // checks row 2
            (gameArray[4] === gameArray[5]) &&
            (gameArray[3] !== undefined) ||
            (gameArray[6] === gameArray[7]) && // checks row 3
            (gameArray[7] === gameArray[8]) &&
            (gameArray[6] !== undefined) ||
            (gameArray[0] === gameArray[3]) && // checks column 1
            (gameArray[3] === gameArray[6]) &&
            (gameArray[0] !== undefined) ||
            (gameArray[1] === gameArray[4]) && // checks column 2
            (gameArray[4] === gameArray[7]) &&
            (gameArray[1] !== undefined) ||
            (gameArray[2] === gameArray[5]) && // checks column 3
            (gameArray[5] === gameArray[8]) &&
            (gameArray[2] !== undefined) ||
            (gameArray[0] === gameArray[4]) && // diagonal top-L to btm-R
            (gameArray[4] === gameArray[8]) &&
            (gameArray[0] !== undefined) ||
            (gameArray[2] === gameArray[4]) && // diagonal top-R to btm-L
            (gameArray[4] === gameArray[6]) &&
            (gameArray[2] !== undefined)
            ) {
                alert('winner, game over')
            } else if (!isFull) { // THIS AIN'T WORKING
                alert('nobody wins')
            };
        };
    const isFull = () => {  // THIS AIN'T WORKING
        for (let i = 0; i < 9; i++) {
            if (gameArray[i] === undefined) {
                continue;
            };
        }
    }
    const reset = () => {
        for (let i = 0; i < 9; i++) {
            gameArray[i] = undefined;
            const tile = document.getElementById(`tile-${i+1}`);
            tile.classList.remove('tile-cross');
            tile.classList.remove('tile-naught');
        };
    };
    return {
        changeTile,
        reset,
    };
})();

const Player = (name) => {
    const choose = () => { 
        gameBoard.changeTile();
    };
    const getInfo = () => {
        console.log(name + "'s turn");
    };
    for (let i = 0; i < 9; i++) {
        const tile = document.getElementById(`tile-${i+1}`);
        tile.addEventListener('click', choose);
    };
    return {
      choose,
      getInfo,
    };
  };


// add buttons to identify player 1 and player 2, otherwise automatically assign?
const player1 = Player('trevor')



const displayController = (() => {
    const display = () => {
        for (let i = 0; i < 9; i++) {
            const tile = document.getElementById(`tile-${i+1}`);
            if (gameArray[i] === 'x') {
                tile.classList.add('tile-cross');
            };
            if (gameArray[i] === 'o') {
                tile.classList.add('tile-naught');
            };
        };
    };
    return {
        display,
    }
})();


// for (let i = 0; i < 9; i++) {
//     gameArray[i] = document.getElementById(`tile-${i+1}`);
// };

// associate gameArray with DOM

