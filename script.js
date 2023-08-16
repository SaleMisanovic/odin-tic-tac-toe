//factory
const players = (name,marker) => {
    return {name,marker}
};

//module
const gameBoard = (()=>{
    //const board = ["x","o","x","o","x","o","x","o","x"];
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
            /////missing
            ///temp 
            game.nextPlayer();
            ///end temp

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
    //missing

    function nextPlayer() {
        this.activePlayer === player1 ? this.activePlayer = player2 : this.activePlayer = player1
    }


    return{
        activePlayer,
        nextPlayer
    }
    
})();

