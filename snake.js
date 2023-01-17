// le canvas
var blockSize = 20; // taille d'un carré 20px 
var rows = 25; // 25 lignes
var cols = 25; // 25 colonnes
var board = document.getElementById("board"); 
board.height = rows * blockSize; // hauteur du canvas
board.width = cols * blockSize; // largeur du canvas
var context = board.getContext("2d");
document.addEventListener("keyup", changeDirection); // action quand touche clavier
const endGameStatus = document.getElementById('endGameStatus');
const score = document.getElementById("score");
points = 1;
score.innerHTML = "Score: " + points;

//place initial food et snake
var placeSnakeX = entierAleatoire(1, cols-5, 0); 
var placeSnakeY = entierAleatoire(1, rows-5, 0);
var placeFoodX = entierAleatoire(1, cols-5, placeSnakeX);
var placeFoodY = entierAleatoire(1, rows-5, placeSnakeY);

// tete du snake
var snakeX = blockSize * placeSnakeX;
var snakeY = blockSize * placeSnakeY;

// food
var foodX = blockSize * placeFoodX;
var foodY = blockSize * placeFoodY;

// vitesse
var velocityX = 0;
var velocityY = 0;

// corps snake
var snakeBody = [];

setInterval(update, 1000/10);
// update();

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFoodX = entierAleatoire(5, cols-5, snakeX);
        placeFoodY = entierAleatoire(5, rows-5, snakeY);
        foodX = blockSize * placeFoodX;
        foodY = blockSize * placeFoodY;
        points++;
        score.innerHTML = "Score: " + points;
    }

    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        endGameStatus.innerHTML = "Vous avez perdu !!! <br> Votre score est de " + points;
        document.getElementById('gameEnd').style.display = 'block';
    } else if (snakeBody.length + 1 == cols* rows ){
        endGameStatus.innerHTML = "Vous avez gagné !!!";
        document.getElementById('gameEnd').style.display = 'block';
    }

    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            endGameStatus.innerHTML = "Vous avez perdu !!! <br> Votre score est de " + points;
        document.getElementById('gameEnd').style.display = 'block';
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;  
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;  
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;  
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;  
    }
}

// relance la page qaund clique sur recommencer
function reloadGame() {
    window.location.reload();
}

function entierAleatoire(min, max, inconnu)
{
    var alea = Math.floor(Math.random() * (max - min)) + min;
    if (alea == inconnu){
        alea = alea + 1;
    }
    return alea;
}