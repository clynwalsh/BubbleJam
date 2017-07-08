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

  moveMissile() {
    let currentBall = this.chain.head.next;

    while (currentBall !== this.chain.tail) {
      if (this.missile.ball.collidedWith(currentBall)) {
        this.missile.joinChain(currentBall);
        this.missile = null;
        return;
      } else currentBall = currentBall.next;
    }
    //
    // this.chain.eachForward( ball => {
    //   if (this.missile.ball.collidedWith(ball)) {
    //     // debugger
    //     // lots of issues here--need to detatch the ball from the missile
    //     // (or the missile from the game?) after joining it to the chain.
    //     // that's not currently happening.
    //     this.missile.joinChain(ball);
    //     this.missile = null;
    //     return;
    //   }
    // })

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
