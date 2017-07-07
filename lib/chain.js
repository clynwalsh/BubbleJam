import Ball from './ball';

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

export default Chain;
