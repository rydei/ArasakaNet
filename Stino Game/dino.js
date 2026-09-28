let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

let laserArray =[];
let laser1width = 34;
let laser2width = 69;
let laser3width = 102;

let laserHeight = 70;
let laserX = 700;
let laserY = boardHeight- laserHeight;

let laser1Img;
let laser2Img;
let laser3Img;

let velocityX = -8;
let velocityY = 0;
let gravity = .4;
let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("dinoboard");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //context.fillStyle = "green";
    //context.fillRect(dino.x,dino.y,dino.width,dino.height);

    dinoImg = new Image();
    dinoImg.src = "player.png"
    dinoImg.onload = function() {
    context.drawImage(dinoImg, dino.x , dino.y ,dino.width, dino.height)
}

laser1Img = new Image()
laser1Img.src = "cac1.png"

laser2Img = new Image()
laser2Img.src = "cac2.png"

laser3Img = new Image()
laser3Img.src = "cac3.png"

requestAnimationFrame(update);
setInterval(placeLaser,1000);
document.addEventListener("keydown", moveDino)

function update(){
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0,0, board.width, board.height)

    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY,dinoY)

    context.drawImage(dinoImg, dino.x , dino.y ,dino.width, dino.height)

    for(let i = 0; i < laserArray.length; i++ ){
        let laser = laserArray[i];
        laser.x += velocityX;
        context.drawImage(laser.img, laser.x , laser.y , laser.width, laser.height);
    
        if(checkCollision(dino, laser)) {
            gameOver = true;
        }
    }
    context.fillStyle="white";
    context.font="20px courier";
    score++;
    context.fillText(score,5,20);   
}

}


function moveDino(e){
    if((e.code == "Space" || e.code =="ArrowUp")) {
        if (gameOver) {
        reset();
        return;
        } 

        if (dino.y === dinoY) {velocityY =-10;}

    }
}

function placeLaser(){
    if (gameOver) {
        return;
    }
    let laser = {
        img:null,
        x:laserX,
        y:laserY,
        width:null,
        height: laserHeight
    }

    let placeLaserChance = Math.random();

    if (placeLaserChance > .90){
        laser.img = laser3Img;
        laser.width = laser3width;
        laserArray.push(laser)
    } else if (placeLaserChance > .70){
        laser.img = laser2Img;
        laser.width = laser2width;
        laserArray.push(laser)
    } else if (placeLaserChance > .50){
        laser.img = laser1Img;
        laser.width = laser1width;
        laserArray.push(laser)
    }

    if (laserArray.length > 5){
        laserArray.shift();
    }
}

function checkCollision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function reset() {
    dino.y = dinoY,
    laserArray = [];
    velocityY = 0;
    score = 0;
    gameOver = false;

    requestAnimationFrame(update);
}