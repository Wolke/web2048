class GameView {
    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.scoreValue = document.getElementById('score-value');
    }

    updateBoard(board) {
        this.gameBoard.innerHTML = '';
        board.forEach(row => {
            row.forEach(value => {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.textContent = value || '';
                if (value) {
                    tile.style.backgroundColor = this.getTileColor(value);
                }
                this.gameBoard.appendChild(tile);
            });
        });
    }

    updateScore(score) {
        this.scoreValue.textContent = score;
    }

    getTileColor(value) {
        const colors = {
            2: '#eee4da',
            4: '#ede0c8',
            8: '#f2b179',
            16: '#f59563',
            32: '#f67c5f',
            64: '#f65e3b',
            128: '#edcf72',
            256: '#edcc61',
            512: '#edc850',
            1024: '#edc53f',
            2048: '#edc22e'
        };
        return colors[value] || '#3c3a32';
    }
}