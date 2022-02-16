let gameArray = [];
gameArray.length = 9;
// gameArray[4] = 'x';
// gameArray[6] = 'o';

const gameBoard = (() => {
    let counter = 1;
    const changeTile = () => {
        counter++;
        for (let i = 0; i < 9; i++) {
            const tile = document.getElementById(`tile-${i+1}`)
            if (event.target === tile) {
                if (counter%2 === 0) {
                    gameArray[i] = 'x';     
                };
                if (counter%2 === 1) {
                    gameArray[i] = 'o';
                }
            };
        };
        displayController.display();
    };
    return {
        changeTile,
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
    const reset = () => {
        for (let i = 0; i < 9; i++) {
            const tile = document.getElementById(`tile-${i+1}`);
            tile.classList.remove('tile-cross');
            tile.classList.remove('tile-naught');
        };
    };
    return {
        display,
        reset,
    }
})();


// for (let i = 0; i < 9; i++) {
//     gameArray[i] = document.getElementById(`tile-${i+1}`);
// };

// associate gameArray with DOM

