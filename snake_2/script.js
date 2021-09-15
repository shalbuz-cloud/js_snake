const cvs = document.getElementById('game');
const ctx = cvs.getContext('2d');

const grid = 16;
const speed = {
    min: 20,
    max: 5
};

let current_speed = speed.min;

let count = 0;
let streak = 0;

let snake = {
    x: 160,
    y: 160,
    dx: grid,  // Initial speed
    dy: 0,
    cells: [],  // Tail
    maxCells: 4  // Initial snake lenth
};

let apple = {
    // Start coords
    x: 320,
    y: 320
};

// Score
let scoreCurrent = 0;
let tag_scoreCurrent = document.querySelector('.score-current');
let scoreBest = 0;
let tag_scoreBest = document.querySelector('.score-best');

// Random spawn
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Control
document.addEventListener('keydown', direction);
function direction (e) {
    
    // Left arrow
    if (e.keyCode === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // Up arrow
    else if (e.keyCode === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // Right arrow
    else if (e.keyCode === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // Down arrow
    else if (e.keyCode === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }

}

function loop() {
    // Slowing down the game speed
    requestAnimationFrame(loop);

    tag_scoreCurrent.innerHTML = `Score: ${scoreCurrent}`;
    tag_scoreBest.innerHTML = `Best: ${scoreBest}`;
    
    if (++count < current_speed) {
        return;
    }

    count = 0;

    if (streak >= 2) streak = 0;

    // Clear the game field
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    // Moving the snake at a certain speed
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Crossing the border
    if (snake.x < 0) {
        snake.x = cvs.width - grid;
    }
    else if (snake.x >= cvs.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = cvs.height - grid;
    }

    // Snake movement
    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Drawing an apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid - 1, grid -1);

    // Drawing a snake
    ctx.fillStyle = 'orange';
    ctx.fillRect(snake.cells[0].x, snake.cells[0].y, grid - 1, grid - 1);
    
    snake.cells.forEach(function (cell, index) {
        if (index !== 0) {
            ctx.fillStyle = 'green'
            ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        }
        
        // if the snake gets to an apple
        if (cell.x === apple.x && cell.y === apple.y) {
            // Increasing the snake length
            snake.maxCells++;
            scoreCurrent++;
            streak++;

            if (current_speed > speed.max && streak >= 2) {
                current_speed--;
            }

            // Drawing a new apple
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        // Crashing into thr tail
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                // Setting default parameters
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                if (scoreCurrent > scoreBest) {
                    scoreBest = scoreCurrent;
                } 
                scoreCurrent = 0;
                current_speed = speed.min;
                // Putting an apple on the random place
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }

    });

}

requestAnimationFrame(loop);