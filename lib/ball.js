import * as Util from './util';

class Ball {
  constructor(coords, color) {
    this.color = color || this.randomColor();

    this.coords = coords || {x: -20, y: 200};
    this.percent = 0;
    this.curve = 0;

    this.next = null;
    this.prev = null;
  }

  checkForward() {
    if (this.prev.color !== this.color) return [];
    return [this.prev].concat(this.prev.checkForward());
  }

  checkBack() {
    if (this.next.color !== this.color) return [];
    return [this.next].concat(this.next.checkBack());
  }

  collidedWith(otherBall) {
    if (Util.distance(this.coords, otherBall.coords) < 38) return true;
  }

  move() {
    this.coords = Util.getCoordsAtPct(this.percent, this.curve);

    if (this.percent >= 0.9995 && this.curve < 3) {
      this.curve += 1;
      this.percent = 0;
    } else if (this.percent >= 1 && this.curve == 3) {
      this.remove();
    } else this.percent += 0.001;
  }

  randomColor() {
    const colors = ['#E64F62', '#FDCC73', '#728EBD', '#79C199', '#A3557D'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  remove() {
    this.prev.next = this.next;
    this.next.prev = this.prev;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.coords.x, this.coords.y, 18, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default Ball;
