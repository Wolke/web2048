class GameView {
    constructor() {
        this.boardElement = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score-value');
    }

    updateBoard(board) {
        this.boardElement.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const tile = document.createElement('div');
                tile.className = `tile ${board[i][j] !== 0 ? 'tile-' + board[i][j] : ''}`;
                tile.textContent = board[i][j] !== 0 ? board[i][j] : '';
                this.boardElement.appendChild(tile);
            }
        }
    }

    updateScore(score) {
        this.scoreElement.textContent = score;
    }
}