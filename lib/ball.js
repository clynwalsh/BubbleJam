class Ball {
  constructor(coords, color) {
    this.color = color || this.randomColor();
    this.coords = coords || {};
    this.percent = 0;
    this.curve = 0;

    this.next = null;
    this.prev = null;
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
