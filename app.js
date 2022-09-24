const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.fillStyle = '#000';

const snakeElement = new Image();
const apple = new Image();
snakeElement.src = 'pictures/snake-element.png';
apple.src = 'pictures/apple.png';
//snake
const snake = [];

snake.push({
  x: 204,
  y: 240
});

snake.push({
  x: 216,
  y: 240
});

snake.push({
  x: 228,
  y: 240
});

snake.push({
  x: 240,
  y: 240
});
//direction
let direction = 'r';

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37) {
    direction = 'l'; // left
  } else if (event.keyCode == 38) {
    direction = 'u'; // up
  } else if (event.keyCode == 39) {
    direction = 'r'; // right
  } else if (event.keyCode == 40) {
    direction = 'd'; // down
  }
});
//apple
function generateFood() {
    let food = {
      x: Math.trunc(Math.random() / 2 * 1000),
      y: Math.trunc(Math.random() / 2 * 1000)
    };
  
    food.x -= food.x % 12;
    food.y -= food.y % 12;
  
    return food;
  }
  
  let food = generateFood();
//slow down
function sleep(seconds) {
    let e = new Date().getTime() + (seconds * 150);
    while (new Date().getTime() <= e) { }
  }
  
//draw
function draw() {
    context.fillRect(0, 0, canvas.clientWidth,
      canvas.clientHeight);
    
    
    snake.forEach( e => {
      if(e.x <= 510 && e.x >= -30 && e.y <=510 && e.y >= -30){
        context.drawImage(apple, food.x, food.y);
        context.drawImage(snakeElement, e.x, e.y);
      }
      
      else{
        alert('Do NOT leave the SQUARE! The game will now restart.');
        setInterval(location.reload(),1000);
        
      }
    });

    if (direction === 'r') {
      snake.unshift({ x: snake[0].x + 12, y: snake[0].y });
    } else if (direction === 'l') {
      snake.unshift({ x: snake[0].x - 12, y: snake[0].y });
    } else if (direction === 'u') {
      snake.unshift({ x: snake[0].x, y: snake[0].y - 12 });
    } else if (direction === 'd') {
      snake.unshift({ x: snake[0].x, y: snake[0].y + 12 });
    }
  
    sleep(1);
  
    if (snake[0].x !== food.x || snake[0].y !== food.y) {
      snake.pop();
    } else {
      food = generateFood();
    }
  
    requestAnimationFrame(draw);
  }
  
  draw();
  