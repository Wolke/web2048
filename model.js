class GameModel {
    constructor() {
        this.size = 4;
        this.score = 0;
        this.board = [];
        this.initBoard();
    }

    initBoard() {
        this.board = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.addRandomTile();
        this.addRandomTile();
    }

    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) {
                    emptyCells.push({ i, j });
                }
            }
        }
        if (emptyCells.length > 0) {
            const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.board[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    move(direction) {
        const originalBoard = JSON.parse(JSON.stringify(this.board));
        let moved = false;

        switch (direction) {
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
        }

        if (moved) {
            this.addRandomTile();
        } else {
            this.board = originalBoard;
        }

        return moved;
    }

    moveLeft() {
        return this.processBoardMove(this.board);
    }

    moveRight() {
        const flipped = this.flipHorizontally(this.board);
        const moved = this.processBoardMove(flipped);
        this.board = this.flipHorizontally(flipped);
        return moved;
    }

    moveUp() {
        const rotated = this.rotateLeft(this.board);
        const moved = this.processBoardMove(rotated);
        this.board = this.rotateRight(rotated);
        return moved;
    }

    moveDown() {
        const rotated = this.rotateRight(this.board);
        const moved = this.processBoardMove(rotated);
        this.board = this.rotateLeft(rotated);
        return moved;
    }

    processBoardMove(board) {
        let moved = false;
        for (let i = 0; i < this.size; i++) {
            const result = this.processRowMove(board[i]);
            board[i] = result.row;
            this.score += result.score;
            if (result.moved) moved = true;
        }
        return moved;
    }

    processRowMove(row) {
        let newRow = row.filter(tile => tile !== 0);
        let score = 0;
        let moved = false;

        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                score += newRow[i];
                newRow.splice(i + 1, 1);
                moved = true;
            }
        }

        while (newRow.length < this.size) {
            newRow.push(0);
        }

        if (newRow.join(',') !== row.join(',')) {
            moved = true;
        }

        return { row: newRow, score, moved };
    }

    flipHorizontally(board) {
        return board.map(row => row.slice().reverse());
    }

    rotateLeft(board) {
        return board[0].map((_, index) => board.map(row => row[row.length - 1 - index]));
    }

    rotateRight(board) {
        return board[0].map((_, index) => board.map(row => row[index]).reverse());
    }

    isGameOver() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) {
                    return false;
                }
                if (
                    (i < this.size - 1 && this.board[i][j] === this.board[i + 1][j]) ||
                    (j < this.size - 1 && this.board[i][j] === this.board[i][j + 1])
                ) {
                    return false;
                }
            }
        }
        return true;
    }
}