class GameModel {
    constructor() {
        this.size = 4;
        this.score = 0;
        this.board = [];
        this.initBoard();
    }

    initBoard() {
        this.board = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.addNewTile();
        this.addNewTile();
    }

    addNewTile() {
        const emptyTiles = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) {
                    emptyTiles.push({ x: i, y: j });
                }
            }
        }
        if (emptyTiles.length > 0) {
            const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            this.board[x][y] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    moveUp() {
        return this.move((col) => this.getColumn(col), this.setColumn.bind(this));
    }

    moveDown() {
        return this.move((col) => this.getColumn(col).reverse(), (col, newCol) => this.setColumn(col, newCol.reverse()));
    }

    moveLeft() {
        return this.move((row) => this.board[row], this.setRow.bind(this));
    }

    moveRight() {
        return this.move((row) => this.board[row].slice().reverse(), (row, newRow) => this.setRow(row, newRow.reverse()));
    }

    move(getLine, setLine) {
        let moved = false;
        for (let i = 0; i < this.size; i++) {
            let line = getLine(i);
            let newLine = this.mergeLine(this.filterZeros(line));
            if (newLine.length < this.size) {
                newLine = newLine.concat(Array(this.size - newLine.length).fill(0));
            }
            if (setLine(i, newLine)) {
                moved = true;
            }
        }
        return moved;
    }

    filterZeros(line) {
        return line.filter(tile => tile !== 0);
    }

    mergeLine(line) {
        for (let i = 0; i < line.length - 1; i++) {
            if (line[i] === line[i + 1]) {
                line[i] *= 2;
                this.score += line[i];
                line.splice(i + 1, 1);
            }
        }
        return line;
    }

    getColumn(col) {
        return this.board.map(row => row[col]);
    }

    setColumn(col, newCol) {
        let changed = false;
        for (let i = 0; i < this.size; i++) {
            if (this.board[i][col] !== newCol[i]) {
                this.board[i][col] = newCol[i];
                changed = true;
            }
        }
        return changed;
    }

    setRow(row, newRow) {
        let changed = false;
        for (let i = 0; i < this.size; i++) {
            if (this.board[row][i] !== newRow[i]) {
                this.board[row][i] = newRow[i];
                changed = true;
            }
        }
        return changed;
    }

    isGameOver() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) {
                    return false;
                }
                if (j < this.size - 1 && this.board[i][j] === this.board[i][j + 1]) {
                    return false;
                }
                if (i < this.size - 1 && this.board[i][j] === this.board[i + 1][j]) {
                    return false;
                }
            }
        }
        return true;
    }
}