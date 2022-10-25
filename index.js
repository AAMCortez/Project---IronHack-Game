const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const body = document.querySelector("body");
const start = document.querySelector("canvasDiv");
const img2 = new Image();

let ball = {
   x: 480,
   y: 680,
   vx: 0,
   vy: 1,
   userPull: 0,
   radius: 20,
   color: "red",
   draw: function () {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      context.fillStyle = this.color;
      context.fill();
   },
};

const platforms = [];
const platforms2 = [];
let points = 0;
let level = 1;
const gameArea = {};

// Canvas boundaries and platform contact with the ball
let gravity = 0.3;
function hitBottom() {
   let rockbottom = canvas.clientHeight - ball.radius;
   if (ball.y > rockbottom) {
      ball.y = rockbottom;
      ball.vy = 0;
   }
}
function detectOnTop() {
   platforms.forEach((item) => {
      let obstacleTop = item.y - ball.radius;
      if (
         ball.y > obstacleTop &&
         ball.x > item.x &&
         ball.x < item.x + item.width &&
         ball.y < item.y
      ) {
         ball.y = obstacleTop;
         ball.vy = 0;
         ball.x += item.vx;
      }
   });
}

function detectOnBottom() {
   platforms.forEach((item) => {
      let obstacleBottom = item.y + item.height + ball.radius;
      if (
         ball.y < obstacleBottom &&
         ball.x > item.x &&
         ball.x < item.x + item.width &&
         ball.y > item.y
      ) {
         ball.y = obstacleBottom + item.height;
         ball.vy = 0;
         let bump = new Audio("./sounds/Derp_0.wav");
         bump.play();
      }
   });
}
function detectOnTop2() {
   platforms2.forEach((item) => {
      let obstacleTop = item.y - ball.radius;
      if (
         ball.y > obstacleTop &&
         ball.x > item.x &&
         ball.x < item.x + item.width &&
         ball.y < item.y
      ) {
         ball.y = obstacleTop;
         ball.vy = 0;
         ball.x += item.vx;
      }
   });
}

function detectOnBottom2() {
   platforms2.forEach((item) => {
      let obstacleBottom = item.y + item.height + ball.radius;
      if (
         ball.y < obstacleBottom &&
         ball.x > item.x &&
         ball.x < item.x + item.width &&
         ball.y > item.y
      ) {
         ball.y = obstacleBottom + item.height;
         ball.vy = 0;
         let bump = new Audio("./sounds/Derp_0.wav");
         bump.play();
      }
   });
}
document.addEventListener("keydown", (event) => {
   switch (event.key) {
      case "ArrowUp":
         let jump = new Audio("./sounds/WORMSPRING.WAV");
         jump.play();
         for (let i = 0; i < 0.5; i += 0.2) {
            setTimeout(() => {
               ball.userPull = i;
               ball.x += ball.vx;
            }, 100);
         }
         setTimeout(() => {
            ball.userPull = 0;
         }, 500);
         break;
      case "ArrowRight":
         ball.vx += 3;
         break;
      case "ArrowLeft":
         ball.vx -= 3;
         break;
      case "ArrowDown":
         ball.y += 20;
         break;
   }
});

document.addEventListener("keyup", (event) => {
   switch (event.key) {
      case "ArrowLeft":
         ball.vx = 0;
         break;
      case "ArrowRight":
         ball.vx = 0;
         break;
   }
});

function startGame() {
   canvas.removeAttribute("hidden");
   scoreDiv.removeAttribute("hidden");
   document.querySelector(".canvasDiv").classList.add("change-canvas");
   document.querySelector("button").style.visibility = "hidden";
   const platform1 = new Platform(200, 10, 50, 600);
   const platform2 = new Platform(150, 10, 250, 500);
   const platform3 = new Platform(100, 10, 400, 400);
   const platform4 = new Platform(75, 10, 250, 300);
   const platform5 = new Platform(50, 10, 50, 200);
   const platform6 = new Platform(25, 10, 300, 100);
   platforms.push(
      platform1,
      platform2,
      platform3,
      platform4,
      platform5,
      platform6
   );
   const platform7 = new Platform2(40, 15, 220, 600);
   const platform8 = new Platform2(150, 15, 250, 500);
   const platform9 = new Platform2(100, 15, 0, 400);
   const platform10 = new Platform2(200, 15, 250, 300);
   const platform11 = new Platform2(50, 15, 40, 200);
   const platform12 = new Platform2(25, 15, 300, 50);
   platforms2.push(
      platform7,
      platform8,
      platform9,
      platform10,
      platform11,
      platform12
   );
   drawPlatforms();
   ball.draw();
   updateCanvas();
   backMusic.play();
}

function drawPlatforms() {
   platforms.forEach((platform) => {
      platform.draw();
      platform.move();
   });
}
function drawPlatforms2() {
   platforms2.forEach((platform) => {
      platform.draw();
      platform.move();
   });
}

let win = new Audio("./sounds/FrenchAnthem.wav");
let winning = function () {
   win.play();
};
let win2 = new Audio("./sounds/HOLYGRENADE.WAV")
let backMusic = new Audio("./sounds/Stairway To Heaven.mp3");

function score() {
   if (ball.y === 680.3) {
      points = 0;
   } else if (ball.y == 80.3) {
      points = `Congratulations, you advance to the next level!`;
      winning();
      backMusic.pause();
   } else if (ball.y == 180.3) {
      points = 1000;
   } else if (ball.y == 280.3) {
      points = 300;
   } else if (ball.y == 380.3) {
      points = 200;
   } else if (ball.y == 480.3) {
      points = 100;
   } else if (ball.y == 580.3) {
      points = 10;
   } else if (ball.y == 30.3) {
      points = `Good job, you win this game!`;
      win2.play()
   }
   document.getElementById("score").innerHTML = points;
}


function updateCanvas() {
   context.clearRect(0, 0, canvas.width, canvas.height);
   if (level === 1) {
      drawPlatforms();
      hitBottom();
      detectOnTop();
      detectOnBottom();
   } else if (level === 2) {
      drawPlatforms2();
      ball.draw();
      canvas.style.backgroundImage = "url('./images/jungle.png')";
      body.style.backgroundColor = "rgb(185, 235, 185)";
      hitBottom();
      detectOnTop2();
      detectOnBottom2();
   }

   ball.vy = ball.vy + (gravity - ball.userPull);
   ball.y += ball.vy;
   ball.x += ball.vx;
   if (ball.x > canvas.clientWidth - 20) {
      ball.vx = 0;
      ball.x = canvas.clientWidth - 20;
   } else if (ball.x < 20) {
      ball.vx = 0;
      ball.x = 20;
   }
   score();
   ball.draw();
   if (ball.y === 80.3) {
      setTimeout(() => {
         ball.y += 600;
      }, 5000);
      setTimeout(() => {
         level = 2;
      }, 5000);
   }

   requestAnimationFrame(updateCanvas);
}

document.getElementById("start-button").onclick = () => {
   document.getElementById("game-board");
   startGame();
};
