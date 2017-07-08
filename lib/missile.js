import Ball from './ball';

// class Missile extends Ball {
//   constructor(coords, color, angle) {
//     super(coords, color);
//     this.angle = angle;
//   }
//
//   joinChain(prevLink) {
//     this.prev = prevLink
//     this.next = prevLink.next;
//     prevLink.next.prev = this;
//     prevLink.next = this;
//   }
//
//   move() {
//     const offsetX = Math.cos(this.angle) * 10;
//     const offsetY = Math.sin(this.angle) * 10;
//
//     this.coords = {
//       x: this.coords.x + offsetX,
//       y: this.coords.y + offsetY
//     };
//   }
//
//   outOfBounds() {
//     if (
//       this.coords.x > 900
//       || this.coords.x < 0
//       || this.coords.y > 600
//       || this.coords.y < 0
//     ) return true;
//   }
// }

class Missile {
  constructor(ball, angle) {
    this.ball = ball;
    this.angle = angle;
  }

  collidedWith(otherBall) {
    return this.ball.collidedWith(otherBall);
  }

  joinChain(prevLink) {
    this.ball.prev = prevLink
    this.ball.next = prevLink.next;
    prevLink.next.prev = this.ball;
    prevLink.next = this.ball;

    this.ball.percent = prevLink.percent;
    this.ball.curve = prevLink.curve;
  }

  move() {
    const offsetX = Math.cos(this.angle) * 10;
    const offsetY = Math.sin(this.angle) * 10;

    this.ball.coords = {
      x: this.ball.coords.x + offsetX,
      y: this.ball.coords.y + offsetY
    };
  }

  outOfBounds() {
    if (
      this.ball.coords.x > 900
      || this.ball.coords.x < 0
      || this.ball.coords.y > 600
      || this.ball.coords.y < 0
    ) return true;
  }

  render(ctx) {
    this.ball.render(ctx);
  }
}

export default Missile;
