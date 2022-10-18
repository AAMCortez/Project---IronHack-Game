const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const img2 = new Image();

let ball = {
   x: 480,
   y: 680,
   vx: 0,
   vy: 2,
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
let points = 0;

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

document.addEventListener("keydown", (event) => {
   switch (event.key) {
      case "ArrowUp":
         let jump = new Audio("./sounds/mario-jump.mp3");
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
   // let background = new Audio("./sounds/Stairway to Heaven intro.mp3")
   // background.play();
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
   drawPlatforms();
   ball.draw();
   updateCanvas();
}

function drawPlatforms() {
   platforms.forEach((platform) => {
      platform.draw();
   });
}
let win = new Audio("./sounds/FrenchAnthem.wav");
let winning = function () {
   win.play();
   win.stop();
};
function score() {
   if (ball.y === 680.3) {
      points = 0;
   } else if (ball.y == 80.3) {
      points = `It's over 9000 ${winning()}`;
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
   }

   context.font = "40px Arial";
   context.fillStyle = "black";
   context.fillText(`Score: ${points}`, 0, 50);
}

function updateCanvas() {
   context.clearRect(0, 0, canvas.width, canvas.height);

   drawPlatforms();

   hitBottom();
   detectOnTop();
   detectOnBottom();

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
   requestAnimationFrame(updateCanvas);
}

startGame();
