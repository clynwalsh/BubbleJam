import Path from './path';
import Cannon from './cannon';
import Ball from './ball';
import Missile from './missile';
import Chain from './chain';

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");

    this.path = new Path();
    this.onDeckBall = new Ball({x: 450, y: 300}, null);
    this.cannon = new Cannon();
    this.chain = new Chain();
    this.chain.append();
    this.chain.append();

    this.angle = - Math.PI / 2;

    this.render = this.render.bind(this);
  }

  launchMissile(e) {
    const angle = Math.atan2(
      (e.clientY - canvas.offsetTop) - 300,
      (e.clientX - canvas.offsetLeft) - 450
    );

    this.missile = new Missile(this.onDeckBall, angle)
    this.onDeckBall = new Ball( {x: 450, y: 300} );
  }

  getCannonAngle(e) {
    this.angle = Math.atan2(
      (e.clientY - canvas.offsetTop) - 300,
      (e.clientX - canvas.offsetLeft) - 450
    ) + Math.PI / 2;
  }

  start() {
    this.canvas.addEventListener('mousemove', e => this.getCannonAngle(e));
    this.canvas.addEventListener('click', e => this.launchMissile(e));
    requestAnimationFrame(this.render);
  }

  handleCollision(otherBall) {
    this.missile.joinChain(otherBall);
    const matches = this.missile.checkForMatches();
    if (matches.length > 2) matches.forEach( ball => ball.remove() );
    this.missile = null;
  }

  moveMissile() {
    // had a problem returning out of the callback when i tried to use
    // missile.prototype.each(), so just copied the logic over here.
    // don't love that.
    let currentBall = this.chain.head.next;

    while (currentBall !== this.chain.tail) {
      if (this.missile.collidedWith(currentBall)) {
        this.handleCollision(currentBall);
        return;
      } else currentBall = currentBall.next;
    }

    this.missile.move();
    this.missile.render(this.ctx);
  }

  render() {
    this.ctx.clearRect(0, 0, 900, 600);
    this.path.render(this.ctx);
    this.onDeckBall.render(this.ctx);
    this.cannon.render(this.ctx, this.onDeckBall.color, this.angle);
    this.chain.render(this.ctx);

    if (this.missile && !this.missile.outOfBounds()) this.moveMissile();

    requestAnimationFrame(this.render);
  }
}

export default Game;
