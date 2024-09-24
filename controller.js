class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        try {
            this.view.updateBoard(this.model.board);
            this.view.updateScore(this.model.score);
            document.addEventListener('keydown', this.handleKeyPress.bind(this));

            const newGameButton = document.getElementById('newGameButton');
            if (!newGameButton) throw new Error('無法找到 newGameButton');
            newGameButton.addEventListener('click', this.newGame.bind(this));

            const buttons = ['upButton', 'downButton', 'leftButton', 'rightButton'];
            const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

            buttons.forEach((buttonId, index) => {
                const button = document.getElementById(buttonId);
                if (!button) throw new Error(`無法找到 ${buttonId}`);
                button.addEventListener('click', () => this.handleKeyPress({ key: directions[index] }));
            });
        } catch (error) {
            console.error('初始化過程中發生錯誤:', error);
        }
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
    try {
        const game = new GameController(new GameModel(), new GameView());
    } catch (error) {
        console.error('遊戲初始化失敗:', error);
    }
});