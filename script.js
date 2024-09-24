document.addEventListener('DOMContentLoaded', () => {
    const upBtn = document.getElementById('up-btn');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const downBtn = document.getElementById('down-btn');

    upBtn.addEventListener('click', () => handleMove('up'));
    leftBtn.addEventListener('click', () => handleMove('left'));
    rightBtn.addEventListener('click', () => handleMove('right'));
    downBtn.addEventListener('click', () => handleMove('down'));

    function handleMove(direction) {
        // 在這裡實現移動邏輯
        console.log(`移動方向: ${direction}`);
    }
});