document.addEventListener('DOMContentLoaded', () => {
    // ... 現有代碼 ...

    // 為方向按鈕添加事件監聽器
    document.getElementById('upButton').addEventListener('click', () => handleKeyPress({ key: 'ArrowUp' }));
    document.getElementById('downButton').addEventListener('click', () => handleKeyPress({ key: 'ArrowDown' }));
    document.getElementById('leftButton').addEventListener('click', () => handleKeyPress({ key: 'ArrowLeft' }));
    document.getElementById('rightButton').addEventListener('click', () => handleKeyPress({ key: 'ArrowRight' }));
});

// ... 現有代碼 ...