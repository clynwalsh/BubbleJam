import Chain from './chain';
import * as Util from './util';

class BlackHole {
  render(ctx) {
    ctx.beginPath();
    ctx.arc(230, 360, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#6b6b6b';
    ctx.fill();
  }

  fallenInto(chain) {
    const ball = chain.first();
    if (Util.distance(ball.coords, {x: 250, y: 375}) < 3) return true;
  }
}

export default BlackHole;
