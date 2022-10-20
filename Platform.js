class Platform {
   constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      const img = new Image();
      img.src = "./images/wood.png";

      this.image = img;
   }

   draw() {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
   }
}