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
        document.getElementById('new-game').addEventListener('click', this.newGame.bind(this));
    }

    handleKeyPress(event) {
        let moved = false;
        switch (event.key) {
            case 'ArrowUp':
                moved = this.model.move('up');
                break;
            case 'ArrowDown':
                moved = this.model.move('down');
                break;
            case 'ArrowLeft':
                moved = this.model.move('left');
                break;
            case 'ArrowRight':
                moved = this.model.move('right');
                break;
        }
        if (moved) {
            this.view.updateBoard(this.model.board);
            this.view.updateScore(this.model.score);
            if (this.model.isGameOver()) {
                alert('遊戲結束！你的分數是：' + this.model.score);
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
const game = new GameController(new GameModel(), new GameView());