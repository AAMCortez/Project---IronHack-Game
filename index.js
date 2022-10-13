const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let ball = {
   x: 475,
   y: 675,
   vx: 1,
   vy: 2,
   userPull: 0,
   radius: 25,
   color: "green",
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
   let rockbottom = canvas.height - ball.radius;
   if (ball.y > rockbottom) {
      ball.y = rockbottom;
   }
}
function update() {
   context.clearRect(0, 0, canvas.width, canvas.height);
   hitBottom();
   ball.vy = ball.vy + (gravity - ball.userPull);
   ball.y += ball.vy;
   console.log(ball.y);

   ball.draw();
   requestAnimationFrame(update);
}
document.onkeydown = function (e) {
   if (e.keyCode == 32) {
      ball.userPull = 0.3;
   }
};

document.onkeyup = function (e) {
   if (e.keyCode == 32) {
      ball.userPull = 0;
   }
};

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
   drawPlatforms();
   requestAnimationFrame(updateCanvas);
}

startGame();
