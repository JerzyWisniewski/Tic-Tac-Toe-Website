const PLAYER1 = 'fa-circle-o';
const PLAYER2 = 'fa-times';
let round = 1;
let player1scorevalue = 0;
let player2scorevalue = 0;
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
const combinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));

function pick(event) {
    const { row, column } = event.target.dataset;
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;
    if (board[row][column] !== '') return;
    event.target.classList.add(turn);
    board[row][column] = turn;
    round++;
    let k = 0;
    for(let i=0; i<3; i++)
    {
        for(let j=0; j<3; j++)
        {
           if( board[i][j] != '') {k++;}
        }
    }        
       if(k>=9){
        for(let i=0; i<3; i++)
            {
                for(let j=0; j<3; j++)
                {
                    board[i][j] = '';
                }
            }           
        clear(), k=0;}

    console.log(check());
}

function check() {
    const result = board.reduce((total, row) => total.concat(row));
    let winner = null;
    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combination => {
        if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
            winner = 'Winner: Player 1';
            player1scorevalue++;
            document.getElementById("player1score").innerHTML = player1scorevalue;  
            clear();        
        }
        if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
            winner = 'Winner: Player 2';
            player2scorevalue++;
            document.getElementById("player2score").innerHTML = player2scorevalue;
            clear();      
        }

    });

    return winner;
}

function clear() {
    const cells = document.querySelectorAll(".box");
    for (var i = 0; i < cells.length; i++) {
      console.log(cells[i].classList);
      cells[i].classList.remove(PLAYER1);
      cells[i].classList.remove(PLAYER2);
    }
    for(let i=0; i<3; i++)
            {
                for(let j=0; j<3; j++)
                {
                    board[i][j] = '';
                }
            }        
  }