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

class Chain {
  constructor() {
    this.head = new Ball('HEAD');
    this.tail = new Ball('TAIL');
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.length = 0;
  }

  append() {
    const currentBall = new Ball();
    this.tail.prev.next = currentBall;
    currentBall.prev = this.tail.prev;
    this.tail.prev = currentBall;
    currentBall.next = this.tail;

    this.length += 1;
  }

  eachForward(callback) {
    let currentBall = this.head.next;

    while (currentBall !== this.tail) {
      callback(currentBall);
      currentBall = currentBall.next;
    }
  }

  eachBackward(callback) {
    let currentBall = this.tail.prev;

    while (currentBall !== this.head) {
      callback(currentBall);
      currentBall = currentBall.prev;
    }
  }

  first() {
    return this.head.next;
  }

  last() {
    return this.tail.prev;
  }
}
