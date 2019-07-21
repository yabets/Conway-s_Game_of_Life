(function(){
    'use strict'

    const container = document.querySelector('[data-container]');
    container.classList.add('red');

    let board = [];

    // generate checkbox grid
    for(let i = 0; i < 10; i++) {
        // row
        const row = document.createElement('div');
        row.classList.add('row');
        row.classList.add(`row-${i}`);
        const rowArray = [];
        for(let j = 0; j < 10; j++) {
            const cell = document.createElement('input');
            cell.classList.add('cell');
            cell.classList.add(`cell-${i}-${j}`);
            cell.type = 'checkbox';
            row.appendChild(cell);
            const check = Math.round(Math.random());
            rowArray.push(check);
        }
        container.appendChild(row);
        board.push(rowArray);
    }


    const paintBoard = () => {
        console.log(board);
        board.forEach((row, rIndex) => {
            row.forEach((cellArray, cIndex) => {
                const cell = document.querySelector(`.cell-${rIndex}-${cIndex}`);
                if(cellArray === 1) {
                    cell.checked = true;
                } else {
                    cell.checked = false;
                }
            })
        })
    }

    const btn = document.querySelector('[data-btn]');
    btn.addEventListener('click', paintBoard);

    const getAliveNeighbors = (row, col) => {
        let result = 0;

        /**  access the eight neighbors
         * 
         *   ______________
         *  | 0 | 1 | 2 |
         *  +-----------+
         *  | 3 | x | 4 |
         *  +-----------+
         *  | 5 | 6 | 7 |
         *  +-----------+
         *  
         */ 
        
         const node = []
         // get the values if the neighbour doesn't exist the node will be null
            node.push(document.querySelector(`.cell-${row - 1}-${col - 1}`));
            node.push(document.querySelector(`.cell-${row - 1}-${col}`));
            node.push(document.querySelector(`.cell-${row - 1}-${col + 1}`));
            node.push(document.querySelector(`.cell-${row}-${col - 1}`));
            node.push(document.querySelector(`.cell-${row}-${col + 1}`));
            node.push(document.querySelector(`.cell-${row + 1}-${col - 1}`));
            node.push(document.querySelector(`.cell-${row + 1}-${col}`));
            node.push(document.querySelector(`.cell-${row + 1}-${col + 1}`));
         
            node.forEach(cell=> {
                if(cell !== null && cell !== undefined){
                    if(cell.checked) {
                        result++;
                    }
                }
            })

        return result;

    }
    const nextStep = () => {
        let next = [];
        board.forEach((row, rIndex) => {
            const currentRow = []
            row.forEach((_, cIndex) => {
                // calculate neighbours value
                const aliveNeighbors = getAliveNeighbors(rIndex, cIndex);
                const cell = document.querySelector(`.cell-${rIndex}-${cIndex}`);
                // decide fate and update board
                if(aliveNeighbors < 2 &&  cell.checked) {
                    // underpopulated so die
                    currentRow.push(0); 
                } else if(aliveNeighbors === 2 && cell.checked) {
                    currentRow.push(1); 
                } else if(aliveNeighbors === 3){
                    // stay alive or alive by reproduction
                    currentRow.push(1); 
                } else {
                    // overpopulated so dies
                    currentRow.push(0); 
                }
                
            });
            next.push(currentRow);
        });
        console.log(next);
        console.log('done')
        // update board
        board = [...next];
        paintBoard();
    }

    const nextBtn = document.querySelector('[data-next]');
    nextBtn.addEventListener('click', nextStep);
    
})();