import Bubble from './bubble';

class Missile {
  constructor(bubble, angle) {
    this.bubble = bubble;
    this.angle = angle;
  }

  checkForMatches() {
    return [this.bubble].concat(
      this.bubble.checkForward(),
      this.bubble.checkBack()
    );
  }

  collidedWith(otherBubble) {
    return this.bubble.collidedWith(otherBubble);
  }

  joinChain(prevLink) {
    this.bubble.insert(prevLink);
  }

  move() {
    const offsetX = Math.cos(this.angle) * 10;
    const offsetY = Math.sin(this.angle) * 10;

    this.bubble.coords = {
      x: this.bubble.coords.x + offsetX,
      y: this.bubble.coords.y + offsetY
    };
  }

  outOfBounds() {
    if (
      this.bubble.coords.x > 900 ||
      this.bubble.coords.x < 0 ||
      this.bubble.coords.y > 600 ||
      this.bubble.coords.y < 0
    ) return true;
  }

  render(ctx) {
    this.bubble.render(ctx);
  }
}

export default Missile;
