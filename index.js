const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
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

const gameArea = {};

// Canvas boundaries and platform contact with the ball
let gravity = 0.5;
function hitBottom() {
   let rockbottom = canvas.clientHeight - ball.radius;
   if (ball.y > rockbottom) {
      ball.y = rockbottom;
      ball.vy = 0;
   }
}
function detectOnTop() {
   platforms.forEach((item) => {
      let obstacleBottom = item.y - ball.radius;
      if (
         ball.y > obstacleBottom &&
         ball.x > item.x &&
         ball.x < item.x + item.width &&
         ball.y < item.y
      ) {
         ball.y = obstacleBottom;
         ball.vy = 0;
      }
   });
}

document.addEventListener("keydown", (event) => {
   switch (event.key) {
      case "ArrowUp":
         ball.userPull = 1;
         ball.y -= 10;
         break;
      case "ArrowRight":
         ball.vx += 1;
         break;
      case "ArrowLeft":
         ball.vx -= 1;
         break;
      case "ArrowDown":
         ball.y += 20;
         break;
   }
   console.log(ball.vx);
});

document.addEventListener("keyup", () => {
   ball.userPull = 0;
});

function startGame() {
   canvas.removeAttribute("hidden");

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

function updateCanvas() {
   context.clearRect(0, 0, canvas.width, canvas.height);
   drawPlatforms();
   hitBottom();
   detectOnTop();
   ball.vy = ball.vy + (gravity - ball.userPull);
   ball.y += ball.vy;
   ball.x += ball.vx;
   console.log(ball.y);

   ball.draw();
   requestAnimationFrame(updateCanvas);
}

startGame();
