const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function updateCanvas() {
    drawPlatforms();
 }

class Ball {}

class Platforms {
   constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
   }

   draw() {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
   }
}
const platforms = [];
const platform1 = new Platforms(100, 10, "red", 250, 600);
const platform2 = new Platforms(25, 10, "red", 350, 350);
const platform3 = new Platforms(50, 10, "red", 150, 500);
platforms.push(platform1, platform2, platform3);

function drawPlatforms() {
   platforms.forEach((platform) => {
      platform.draw();
   });
}

const gameArea = {};


canvas.removeAttribute("hidden")
 updateCanvas()