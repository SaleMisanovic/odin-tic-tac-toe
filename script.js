//factory
const players = (name,marker) => {
    return {name,marker}
};

//module
const gameBoard = (()=>{
    const board = [];

     for (let i = 0; i < 9; i++) {
       board.push('');
    }

    const squares = document.querySelector('.squares');

    board.forEach((item,index)=>{
        const square = document.createElement('div');
        square.className = 'square';
        squares.appendChild(square);
    })

    Array.from(squares.children).forEach((square,index)=>{
        square.addEventListener('click',()=>{
            square.classList.add(game.activePlayer.marker);
            square.setAttribute('data',game.activePlayer.marker)

            board[index]= game.activePlayer.marker;

            square.style.pointerEvents='none'

            game.remainingSpots -=1;

            game.checkWinner();

            if (game.winnerDeclared==false) {
                if (game.remainingSpots >0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                }else if(game.remainingSpots ==0){
                    game.declareTie();
                }
            }
        })
    });

    return {
        board
    };
})();

const game = (()=>{

    //players
    const player1 = players('Player 1','X');
    const player2 = players('Player 2','O');

    //start
    let activePlayer = player1;
    let winnerDeclared = false;
    let remainingSpots = 9;

    let alert = document.querySelector('.alert');
    let playerName = document.querySelector('.player-name');

    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]

    function nextPlayer() {
        this.activePlayer === player1 ? this.activePlayer = player2 : this.activePlayer = player1;
    }

    function checkWinner() {
        winningAxes.forEach((item,index) => {
            if (gameBoard.board[item[0]]=== this.activePlayer.marker && gameBoard.board[item[1]]===this.activePlayer.marker && gameBoard.board[item[2]]===this.activePlayer.marker) {
                alert.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
                this.winnerDeclared = true;
            }
        });
    }

    function declareTie() {
        alert.innerHTML = "<b>Tie game!</b>";
    }

    function alertNextPlayer() {
        this.activePlayer === player1 ? playerName.textContent = "Player 2" : playerName.textContent = "Player 1";
    }


    return{
        activePlayer,
        remainingSpots,
        winnerDeclared,
        nextPlayer,
        checkWinner,
        declareTie,
        alertNextPlayer
    }
    
})();

