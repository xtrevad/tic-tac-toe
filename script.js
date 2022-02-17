let gameArray = [];
gameArray.length = 9;

const gameBoard = (() => {
    let counter = 1;
    const changeTile = () => {
        for (let i = 0; i < 9; i++) {
            const tile = document.getElementById(`tile-${i+1}`)
            if (event.target === tile) {
                if (counter%2 === 0 && gameArray[i] === undefined) {
                    gameArray[i] = 'o';
                    counter++;
                    document.getElementById('turn-counter').textContent = (player1.name + '\'s turn')     
                };
                if (counter%2 === 1 && gameArray[i] === undefined) {
                    gameArray[i] = 'x';
                    counter++;
                    document.getElementById('turn-counter').textContent = (player2.name + '\'s turn')
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
                const gamestate = 'won'; 
                if ((gamestate === 'won') && (counter%2 === 0)) {
                    // alert("Player 1 wins!")
                    displayController.endGameOverlay(`${player1.name} wins!`);
                } else if ((gamestate === 'won') && (counter%2 === 1)) {
                    // alert("Player 2 wins!");
                    displayController.endGameOverlay(`${player2.name} wins!`);
                };
            } else if (checkIsFull()) {
                displayController.endGameOverlay('Tie game');
            }; 
        };
    const checkIsFull = () => { // if gameArray has no empty spaces, it is full
        for (let i = 0; i < 9; i++) {
            if (gameArray[i] === undefined) {
                return false;
            };
        };
        return true;
    };
    const reset = () => { // empties gameArray and removes all added tile classes
        for (let i = 0; i < 9; i++) {
            gameArray[i] = undefined;
            const tile = document.getElementById(`tile-${i+1}`);
            tile.removeAttribute('style');
            for (let i = 0; i < 9; i++) {
                const tile = document.getElementById(`tile-${i+1}`);
                tile.classList.remove('tile-hover');
                tile.classList.add('tile-hover');
                };
        };
    };
    return {
        changeTile,
        reset,
    };
})();



const inputController = (() => {
    const p1Input = document.getElementById('p1-input')
    const p2Input = document.getElementById('p2-input')

    function playerNameSubmit() {
        makeP1();
        makeP2();
        displayPlayerNames();
    };
    
    function makeP1() {
        player1 = Player(p1Input.value);
        playerArr[0] = player1;
    };
    
    function makeP2() {
        player2 = Player(p2Input.value);
        playerArr[1] = player2;
    };

    const inputContainer = document.querySelector('.input-container');
    const inputs = document.querySelectorAll('input');
    const btn = document.getElementById('submit');

    function displayPlayerNames() {
        inputContainer.style.opacity = '0'; 
        inputs[0].setAttribute('disabled', '');
        inputs[1].setAttribute('disabled', '')
        btn.setAttribute('disabled', '');
    };
    
    // function resetInputs() {
    //     inputContainer.removeAttribute('style');
    //     inputs[0].removeAttribute('disabled');
    //     inputs[0].value = '';
    //     inputs[1].removeAttribute('disabled');
    //     inputs[1].value = '';
    //     btn.removeAttribute('disabled');
    //     playerArr[0] = undefined;
    //     playerArr[1] = undefined;
    //     player1 = undefined;
    //     player2 = undefined;
    // };

    return {
        playerNameSubmit,
        // resetInputs
    };
})();

const btn = document.getElementById('submit');
btn.addEventListener('click', inputController.playerNameSubmit);

// const resetBtn = document.getElementById('reset');
// reset.addEventListener('click', inputController.resetInputs);

let playerArr = [];
playerArr.length = 2;




const Player = (name) => {
    const choose = () => { 
        gameBoard.changeTile();
    };
    const getInfo = () => {
        console.log(name + "'s turn"); // !! remove after testing !!
    };
    for (let i = 0; i < 9; i++) {
        const tile = document.getElementById(`tile-${i+1}`);
        tile.addEventListener('click', choose);
    };
    console.log(name)
    return {
      name,
      choose,
      getInfo,
    };
  };



const displayController = (() => {
    const display = () => {
        for (let i = 0; i < 9; i++) {
            const tile = document.getElementById(`tile-${i+1}`);
            if (gameArray[i] === 'x') {
                tile.style.backgroundImage = "url(./assets/cross-96.png)";
                tile.style.backgroundSize = "contain";
                tile.classList.remove('tile-hover')
            };
            if (gameArray[i] === 'o') {
                tile.style.backgroundImage = "url(./assets/naught-96.png)";
                tile.style.backgroundSize = "contain";
                tile.classList.remove('tile-hover');
            };
        };
    };
    const overlay = document.getElementById("overlay");
    const overlayText = overlay.querySelector(' :first-child');
    const removeOverlay = () => {
        overlay.style.display = "none";
        gameBoard.reset();
    }
    const endGameOverlay = (text) => {
        overlay.style.display = "flex";
        overlayText.textContent = text;
        overlay.addEventListener('click', removeOverlay);
    };
    return {
        display,
        endGameOverlay,
    };
})();