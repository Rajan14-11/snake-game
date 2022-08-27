let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('../music/food.mp3');
const gameoversound = new Audio('../music/gameover.mp3');
const movesound = new Audio('../music/move.mp3');
const musicsound = new Audio('../music/music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }
//Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}

function gameEngine() {
    // part 1 : updating the snake array
    if (isCollide(snakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press Any Key To Start Again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
        // localStorage.setItem('highscore' , JSON.stringify(score))

    }
    // if you have eaten the food , increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play()
        score += 10
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(highscoreval));
            hiscoreBox.innerHTML = "HiScore: " + highscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 1;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // part 2 : render/display the snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}
let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    highscoreval = 0;


    localStorage.setItem("hiscore", JSON.stringify(highscoreval))
}
else {

    highscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore : " + hiscore;


}
// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval = JSON.parse(hiscore);
//     hiscoreBox.innerHTML = "HiScore: " + hiscore;
// }




window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 } // start the game
    musicsound.play()
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":

            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":

            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":

            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})


