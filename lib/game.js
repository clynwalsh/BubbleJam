import Path from './path';
import Cannon from './cannon';
import Ball from './ball';
import Missile from './missile';
import Chain from './chain';
import BlackHole from './blackhole';

class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.paused = false;

    this.path = new Path();
    this.onDeckBall = new Ball({x: 450, y: 300}, null);
    this.cannon = new Cannon();
    this.chain = new Chain();
    this.chain.append();
    this.blackHole = new BlackHole();
    this.angle = - Math.PI / 2;

    this.scorebox = document.getElementById('score');
    this.scorectx = this.scorebox.getContext('2d');
    this.popped = 0;
    this.escaped = 0;

    this.render = this.render.bind(this);
  }

  calculateScore() {
    return (this.popped * 100) - (this.escaped * 500) || 0;
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

  togglePause(e) {
    if (e.key === 'Enter') {
      this.paused = !this.paused
      requestAnimationFrame(this.render);
    }
  }

  start() {
    this.canvas.addEventListener('mousemove', e => this.getCannonAngle(e));
    this.canvas.addEventListener('click', e => this.launchMissile(e));
    document.addEventListener('keypress', e => this.togglePause(e));
    requestAnimationFrame(this.render);
  }

  handleCollision(otherBall) {
    this.missile.joinChain(otherBall);
    const matches = this.missile.checkForMatches();
    if (matches.length > 2) {
      matches.forEach( ball => ball.remove() );
      this.popped += matches.length;
    }
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

  renderScore() {
    this.scorectx.clearRect(0, 0, 200, 130)
    this.scorectx.font = '20px Gloria Hallelujah';
    this.scorectx.fillText(`Popped: ${this.popped}`, 20, 35);
    this.scorectx.fillText(`Escaped: ${this.escaped}`, 20, 75);
    this.scorectx.fillText(`Score: ${this.calculateScore()}`, 20, 115);
  }

  detectEscaped() {
    // add escaped if ball fell into hole
    if (this.blackHole.fallenInto(this.chain)) this.escaped += 1;
  }

  render() {
    this.ctx.clearRect(0, 0, 900, 600);
    this.path.render(this.ctx);
    this.onDeckBall.render(this.ctx);
    this.cannon.render(this.ctx, this.onDeckBall.color, this.angle);
    this.chain.render(this.ctx);
    this.blackHole.render(this.ctx);

    if (this.missile && !this.missile.outOfBounds()) this.moveMissile();

    this.detectEscaped();
    this.renderScore();
    if (!this.paused) requestAnimationFrame(this.render);
  }
}

export default Game;
