//draw canvas
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");


//units
let box = 20,
    score = 0;
    

let eat = new Audio();
eat.src= "audio/oje.3gpp";
//food position
let food = {
    x : Math.floor(Math.random()*25 + 2)* box,
    y : Math.floor(Math.random()*25 + 2) * box
}

//snake position
let snake = [];
snake[0] =
    {
        x : 20 * box,
        y : 20 * box 
    };


//get directions 
let d;
document.addEventListener("keydown", function(event) {
    let key = event.keyCode;
    if (key == "37" && d !== "RIGHT") {
        d = "LEFT";
    }
    else if (key == "38" && d !== "DOWN") {
        d = "UP";
    }
    else if (key == "39" && d !== "LEFT") {
        d = "RIGHT";
    }
    else if (key == "40" && d !== "UP") {
        d = "DOWN";
    }
})

function collision(Head, array){
    for(let i = 0; i < array.length; i++) {
        if (Head.x ==array[i].x && Head.y == array[i].y) {
            return true;
        }
    } return false;
}


//draw the elements of the game
let draw = () => {
    //draw ground
    ctx.fillStyle = "black";
    ctx.fillRect(20,20,560,560);
    ctx.strokeStyle = "red";
    ctx.strokeRect(20,20,560,560);

    //draw food
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.x,food.y,box,box);
    ctx.strokeStyle = "white";
    ctx.strokeRect(food.x,food.y,box,box);


    //draw snake
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0)? "blue": "blue"; 
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "lightblue";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //draw the score
    ctx.fillStyle = "lightgreen";
    ctx.font = "20px arial";
    ctx.fillText(score, 40,50);


   
    //control snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= 20;
    if(d == "RIGHT") snakeX += 20;
    if(d == "UP") snakeY -= 20;
    if(d == "DOWN") snakeY += 20;
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }

   
   
    //if snake eats food
    if (snake[0].x == food.x && snake[0].y == food.y) {
        score++;
        
        food = {
            x : Math.floor(Math.random()*24 + 2)* box,
            y : Math.floor(Math.random()*24 + 2) * box
        }
    } else {
        snake.pop();
    } //if sanke hits wall
     if (snakeX == 0 || snakeX == 580 || snakeY == 0 || snakeY == 580 || collision(newHead, snake)) {
        
      
       let scoreBoard = document.createElement("div");
        let button = document.createElement("button");
        let span = document.createElement("span");
        let p = document.createElement("p");

        scoreBoard.setAttribute("style","width:300px; height:200px; background:white; display:flex; position:absolute; left:160px; top:10%; flex-direction:column; justify-content:center; align-items: center");
        button.setAttribute("style", "width:100px; height:50px; background:lightblue;");
        p.setAttribute("style", "font:20px tahoma;");
        span.textContent = "Play Again";
        if(window.localStorage.getItem("high") < score) {
        let highScore = score;
             window.localStorage.setItem("high", JSON.stringify(highScore));
        }

        button.appendChild(span);
        scoreBoard.appendChild(p);
        scoreBoard.appendChild(button);
        

        p.innerHTML = "<b>Game over</b> </br>"; 
        p.innerHTML += "Score = " + score + "</br>";    
        p.innerHTML += "highscore = " + window.localStorage.getItem("high");
        document.body.appendChild(scoreBoard); 

        button.onclick = function() {
            location.reload(true);
        }

        clearInterval(game);
    }
    snake.unshift(newHead);
}




let game = setInterval(draw, 100);