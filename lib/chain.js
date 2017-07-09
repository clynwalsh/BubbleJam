import Bubble from './bubble';

class Chain {
  constructor() {
    this.head = new Bubble({x: -500, y: -500}, 'HEAD');
    this.tail = new Bubble({x: -500, y: -500}, 'TAIL');
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.length = 0;
  }

  append() {
    const newBubble = new Bubble();
    this.tail.prev.next = newBubble;
    newBubble.prev = this.tail.prev;
    this.tail.prev = newBubble;
    newBubble.next = this.tail;

    this.length += 1;
  }

  each(callback) {
    let currentBubble = this.head.next;

    while (currentBubble !== this.tail) {
      callback(currentBubble);
      currentBubble = currentBubble.next;
    }
  }

  first() {
    return this.head.next;
  }

  last() {
    return this.tail.prev;
  }

  render(ctx) {
    this.each( bubble => {
      if (!bubble.collidedWith(bubble.prev)) bubble.move();
      bubble.render(ctx);
    });

    if (this.last().percent > 0.034) this.append();
  }
}

export default Chain;
