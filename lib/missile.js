import Ball from './ball';

class Missile extends Ball {
  constructor(coords, color, angle) {
    super(coords, color);
    this.angle = angle;
  }

  move() {
    const offsetX = Math.cos(this.angle) * 10;
    const offsetY = Math.sin(this.angle) * 10;

    this.coords = {
      x: this.coords.x + offsetX,
      y: this.coords.y + offsetY
    };
  }

  outOfBounds() {
    if (
      this.coords.x > 900
      || this.coords.x < 0
      || this.coords.y > 600
      || this.coords.y < 0
    ) return true;
  }
}

export default Missile;
