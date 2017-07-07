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
    this.angle = - Math.PI / 2;

    this.render = this.render.bind(this);
  }

  launchMissile(e) {
    const angle = Math.atan2(
      (e.clientY - canvas.offsetTop) - 300,
      (e.clientX - canvas.offsetLeft) - 450
    );

    this.missile = new Missile(
      {x: 450, y: 300},
      this.onDeckBall.color,
      angle
    );
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

  render() {
    this.ctx.clearRect(0, 0, 900, 600);
    this.path.render(this.ctx);
    this.onDeckBall.render(this.ctx);
    this.cannon.render(this.ctx, this.onDeckBall.color, this.angle);

    if (this.missile) {
      this.missile.move();
      this.missile.render(this.ctx);
    }

    requestAnimationFrame(this.render);
  }
}

export default Game;
