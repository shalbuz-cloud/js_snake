const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png"

let box = 32;
let score = 0;

// Координаты еды
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,  // от 1 до 17
    y: Math.floor(Math.random() * 15 + 3) * box,  // от 3 до 15
};

// Координаты змейки
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// Движение змейки
document.addEventListener('keydown', direction);

let dir;

function direction(event)
{
    if (event.keyCode == 37 && dir != "right")  // стрелка влево
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down"
}

// Поедание хвоста
function eatTail(head, arr)
{
    for (let i = 0; i < arr.length; i++)
    {
        if (head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}

function drawGame()
{
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    // Отрисовка змейки
    for (let i = 0; i < snake.length; i++)
    {
        ctx.fillStyle = i == 0 ? "rgb(72, 171, 10)" : "rgb(104, 194, 48)";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Счет
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // Кушаем еду
    if (snakeX == food.x && snakeY == food.y)
    {
        score++;

        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };

    } else {
        snake.pop();
    }

    // Движение змейки
    if (snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        {
            clearInterval(game);
        }
        

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);  // Помещаем в самое начало

}

let game = setInterval(drawGame, 100);