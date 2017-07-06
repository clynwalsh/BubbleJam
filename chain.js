class Ball {
  constructor(color) {
    this.color = color || this.randomColor();
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

  each(callback) {
    let currentBall = this.head.next;

    while (currentBall !== this.tail) {
      callback(currentBall);
      currentBall = currentBall.next;
    }
  }
}
