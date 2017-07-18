import Path from './path';
import Cannon from './cannon';
import Bubble from './bubble';
import Missile from './missile';
import Chain from './chain';
import BlackHole from './blackhole';

class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.paused = false;

    this.path = new Path();
    this.blackHole = new BlackHole();
    this.onDeckBubble = new Bubble({x: 450, y: 300}, null);

    this.cannon = new Cannon();
    this.angle = - Math.PI / 2;

    this.chain = new Chain();
    this.chain.append();

    this.scorebox = document.getElementById('score');
    this.scorectx = this.scorebox.getContext('2d');
    this.popped = 0;
    this.escaped = 0;

    this.render = this.render.bind(this);
  }

  calculateScore() {
    return (this.popped * 100) - (this.escaped * 500) || 0;
  }

  detectEscaped() {
    if (this.blackHole.fallenInto(this.chain)) this.escaped += 1;
  }

  getCannonAngle(e) {
    this.angle = Math.atan2(
      (e.clientY - canvas.offsetTop) - 300,
      (e.clientX - canvas.offsetLeft) - 450
    ) + Math.PI / 2;
  }

  handleCollision(otherBubble) {
    this.missile.joinChain(otherBubble);
    const matches = this.missile.checkForMatches();
    if (matches.length > 2) {
      matches.forEach( bubble => bubble.remove() );
      this.popped += matches.length;
    }
    this.missile = null;
  }

  launchMissile(e) {
    const angle = Math.atan2(
      (e.clientY - canvas.offsetTop) - 300,
      (e.clientX - canvas.offsetLeft) - 450
    );

    this.missile = new Missile(this.onDeckBubble, angle)
    this.onDeckBubble = new Bubble( {x: 450, y: 300} );
  }

  moveMissile() {
    // had a problem returning out of the callback when i tried to use
    // missile.prototype.each(), so just copied the logic over here.
    // don't love that.
    let currentBubble = this.chain.head.next;

    while (currentBubble !== this.chain.tail) {
      if (this.missile.collidedWith(currentBubble)) {
        this.handleCollision(currentBubble);
        return;
      } else currentBubble = currentBubble.next;
    }

    this.missile.move();
    this.missile.render(this.ctx);
  }

  renderScore() {
    this.scorectx.clearRect(0, 0, 200, 130)
    this.scorectx.font = '25px Annie Use Your Telescope';
    this.scorectx.fillText(`Popped: ${this.popped}`, 20, 35);
    this.scorectx.fillText(`Escaped: ${this.escaped}`, 20, 75);
    this.scorectx.fillText(`Score: ${this.calculateScore()}`, 20, 115);
  }

  start() {
    this.canvas.addEventListener('mousemove', e => this.getCannonAngle(e));
    this.canvas.addEventListener('click', e => this.launchMissile(e));
    document.addEventListener('keypress', e => this.togglePause(e));
    requestAnimationFrame(this.render);
  }

  togglePause(e) {
    if (e.key === 'Enter') {
      this.paused = !this.paused
      requestAnimationFrame(this.render);

      const modals = document.getElementsByClassName('pause');
      Array.prototype.forEach.call(modals, modal => modal.classList.toggle('hidden'));
    }
  }

  render() {
    this.ctx.clearRect(0, 0, 900, 600);
    this.path.render(this.ctx);
    this.blackHole.render(this.ctx);
    this.onDeckBubble.render(this.ctx);
    this.cannon.render(this.ctx, this.onDeckBubble.color, this.angle);
    this.chain.render(this.ctx);

    if (this.missile && !this.missile.outOfBounds()) this.moveMissile();

    this.detectEscaped();
    this.renderScore();
    if (!this.paused) requestAnimationFrame(this.render);
  }
}

export default Game;
