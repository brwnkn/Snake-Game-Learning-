const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const retryButton = document.querySelector(".retry");
    // canvas dimensions
    canvas.width = 800;
    canvas.height = 600;

    //game variables
    let boxSize = 20;
    let score = 0;
    let snake;
    let food;
    let direction;
    let game;
    
    //initialize game state
    function initializeGame(){
        score = 0;
        snake =[{x:boxSize *5, y:boxSize *5}];
        direction = "RIGHT";
        document.getElementById("score").innerText = score;
        food = generateFood();
    }

    //generate random food position
    function generateFood(){
        return{
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
        };
    }
// Control the snake direction with arrow keys
document.addEventListener("keydown", changeDirection);

function changeDirection(event){
    if (event.key ==="ArrowUp" && direction !=="DOWN"){
        direction = "UP";
    }
    else if (event.key ==="ArrowDown" && direction !== "UP"){
        direction = "DOWN";
    }
    else if (event.key ==="ArrowLeft" && direction !== "RIGHT"){
        direction = "LEFT";}
    else if (event.key ==="ArrowRight" && direction !== "LEFT"){
        direction = "RIGHT";
    }
}


// Draw the game

function draw(){
    // Clears the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food as a circle
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + boxSize / 2, food.y + boxSize / 2, boxSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw the snake as circles
    ctx.fillStyle = "lime";
    ctx.beginPath();
    for(let segment of snake){
        ctx.arc(segment.x + boxSize / 2, segment.y + boxSize / 2, boxSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    //Move the Snake
    let head = {...snake[0]};
    if(direction ==="UP") head.y -= boxSize;
    if(direction ==="DOWN") head.y += boxSize;
    if(direction ==="LEFT") head.x -= boxSize;
    if(direction ==="RIGHT") head.x += boxSize;

    //Add new head to the snake
    snake.unshift(head);

    //Check if snake has eaten the food
    if(head.x === food.x && head.y === food.y){
        score ++;
        document.getElementById("score").innerText = score;
        food = generateFood();
    }
    else{
        //remove the last part of the snake if no food is eaten
        snake.pop();
    }

    //Check for collisions with walls or self
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || isCollision(head)){
        endGame();
    }
}
 // Check if the snake collides with itself
function isCollision(head){
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === head.x && snake[i].y === head.y){
            return true;
        }
    }
    return false;
}


// End the game
function endGame(){
    clearInterval(game);
    retryButton.style.display = "block"; //show the "Try Again" button
}

// Restart the game
function restartGame(){
    retryButton.style.display = "none"; //hide the "Try Again" button
    initializeGame();
    game = setInterval(draw, 250); //Restart the game loop
}

// Start the game for the first time
initializeGame();
game = setInterval(draw, 250); //game loop every 100ms
