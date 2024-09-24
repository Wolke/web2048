class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.view.updateBoard(this.model.board);
        this.view.updateScore(this.model.score);
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.getElementById('newGameButton').addEventListener('click', this.newGame.bind(this));

        // 添加方向按鈕的事件監聽器
        document.getElementById('upButton').addEventListener('click', () => this.handleKeyPress({ key: 'ArrowUp' }));
        document.getElementById('downButton').addEventListener('click', () => this.handleKeyPress({ key: 'ArrowDown' }));
        document.getElementById('leftButton').addEventListener('click', () => this.handleKeyPress({ key: 'ArrowLeft' }));
        document.getElementById('rightButton').addEventListener('click', () => this.handleKeyPress({ key: 'ArrowRight' }));
    }

    handleKeyPress(event) {
        let moved = false;
        switch (event.key) {
            case 'ArrowUp':
                moved = this.model.moveUp();
                break;
            case 'ArrowDown':
                moved = this.model.moveDown();
                break;
            case 'ArrowLeft':
                moved = this.model.moveLeft();
                break;
            case 'ArrowRight':
                moved = this.model.moveRight();
                break;
        }
        if (moved) {
            this.model.addNewTile();
            this.view.updateBoard(this.model.board);
            this.view.updateScore(this.model.score);
            if (this.model.isGameOver()) {
                alert('遊戲結束！');
            }
        }
    }

    newGame() {
        this.model.initBoard();
        this.model.score = 0;
        this.view.updateBoard(this.model.board);
        this.view.updateScore(this.model.score);
    }
}

// 初始化遊戲
document.addEventListener('DOMContentLoaded', () => {
    const game = new GameController(new GameModel(), new GameView());
});