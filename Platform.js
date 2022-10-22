class Platform {
   constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.vx = 1;
      const img = new Image();
      img.src = "./images/wood.png";
      this.image = img;
   }

   draw() {
      context.beginPath();
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.closePath();
      context.fill();
   }
   move() {
      this.draw;
      this.x += this.vx;
      if (this.x + this.width > canvas.width || this.x + this.vx < 0) {
         this.vx *= -1;
      }
   }
}

class Platform2 {
   constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      const img = new Image();
      img.src = "./images/stone.png";

      this.image = img;
   }

   draw() {
      context.beginPath();
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.closePath();
      context.fill();
   }
   move() {
      this.draw;
      this.x += this.vx;
      if (this.x + this.width > canvas.width || this.x + this.vx < 0) {
         this.vx *= -1;
      }
   }
}
