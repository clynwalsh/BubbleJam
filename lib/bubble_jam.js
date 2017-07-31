/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);


class Bubble {
  constructor(coords, color) {
    this.color = color || this.randomColor();

    this.coords = coords || {x: -20, y: 200};
    this.percent = 0;
    this.curve = 0;

    this.next = null;
    this.prev = null;
  }

  checkForward() {
    if (this.prev.color !== this.color) return [];
    return [this.prev].concat(this.prev.checkForward());
  }

  checkBack() {
    if (this.next.color !== this.color) return [];
    return [this.next].concat(this.next.checkBack());
  }

  collidedWith(otherBubble) {
    if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* distance */](this.coords, otherBubble.coords) < 38) return true;
  }

  insert(prevLink) {
    this.prev = prevLink;
    this.next = prevLink.next;
    prevLink.next.prev = this;
    prevLink.next = this;

    this.percent = prevLink.percent;
    this.curve = prevLink.curve;
  }

  move() {
    this.coords = __WEBPACK_IMPORTED_MODULE_0__util__["b" /* getCoordsAtPct */](this.percent, this.curve);

    if (this.percent >= 0.9995 && this.curve < 3) {
      this.curve += 1;
      this.percent = 0;
    } else if (this.percent >= 1 && this.curve == 3) {
      this.remove();
    } else this.percent += 0.001;
  }

  randomColor() {
    const colors = ['#E64F62', '#FDCC73', '#728EBD', '#79C199', '#A3557D'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  remove() {
    this.prev.next = this.next;
    this.next.prev = this.prev;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.coords.x, this.coords.y, 18, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bubble);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bubble__ = __webpack_require__(0);


class Chain {
  constructor() {
    this.head = new __WEBPACK_IMPORTED_MODULE_0__bubble__["a" /* default */]({x: -500, y: -500}, 'HEAD');
    this.tail = new __WEBPACK_IMPORTED_MODULE_0__bubble__["a" /* default */]({x: -500, y: -500}, 'TAIL');
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.length = 0;
  }

  append() {
    const newBubble = new __WEBPACK_IMPORTED_MODULE_0__bubble__["a" /* default */]();
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

/* harmony default export */ __webpack_exports__["a"] = (Chain);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const distance = (center1, center2) => {
  return Math.sqrt(
    Math.pow(center1.x - center2.x, 2) +
    Math.pow(center1.y - center2.y, 2)
  );
};
/* harmony export (immutable) */ __webpack_exports__["a"] = distance;


const firstCurve = [
  {x: -20, y: 200},
  {x: 200, y: -20},
  {x: 775, y: -30},
  {x: 840, y: 200},
];

const secondCurve = [
  {x: 840, y: 200},
  {x: 960, y: 700},
  {x: 100, y: 625},
  {x: 80, y: 400}
];

const thirdCurve = [
  {x: 80, y: 400},
  {x: 40, y: 190},
  {x: 300, y: 100},
  {x: 550, y: 150}
];

const fourthCurve = [
  {x: 550, y: 150},
  {x: 900, y: 200},
  {x: 700, y: 650},
  {x: 250, y: 375}
];

const curves = [firstCurve, secondCurve, thirdCurve, fourthCurve];

// cubic bezier percent is 0-1
// cred to this guy:
// https://stackoverflow.com/questions/17083580/i-want-to-do-animation-of-an-object-along-a-particular-path
const getCoordsAtPct = (percent, curve) => {
  const start = curves[curve][0];
  const ctrl1 = curves[curve][1];
  const ctrl2 = curves[curve][2];
  const end = curves[curve][3];

  const x = CubicN(percent, start.x, ctrl1.x, ctrl2.x, end.x);
  const y = CubicN(percent, start.y, ctrl1.y, ctrl2.y, end.y);
  return {x, y};
}
/* harmony export (immutable) */ __webpack_exports__["b"] = getCoordsAtPct;


// cubic helper formula at percent distance
function CubicN(percent, a, b, c, d) {
  const t2 = percent * percent;
  const t3 = t2 * percent;
  return a + (-a * 3 + percent * (3 * a - a * percent)) * percent +
  (3 * b + percent * (-6 * b + b * 3 * percent)) * percent +
  (c * 3 - c * 3 * percent) * t2 + d * t3;
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__path__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cannon__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bubble__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__missile__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chain__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__blackhole__ = __webpack_require__(4);







class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.paused = false;

    this.path = new __WEBPACK_IMPORTED_MODULE_0__path__["a" /* default */]();
    this.blackHole = new __WEBPACK_IMPORTED_MODULE_5__blackhole__["a" /* default */]();
    this.onDeckBubble = new __WEBPACK_IMPORTED_MODULE_2__bubble__["a" /* default */]({x: 450, y: 300}, null);

    this.cannon = new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */]();
    this.angle = - Math.PI / 2;

    this.chain = new __WEBPACK_IMPORTED_MODULE_4__chain__["a" /* default */]();
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
    if (this.missile && !this.missile.outOfBounds()) return;

    const angle = Math.atan2(
      (e.clientY - canvas.offsetTop) - 300,
      (e.clientX - canvas.offsetLeft) - 450
    );

    this.missile = new __WEBPACK_IMPORTED_MODULE_3__missile__["a" /* default */](this.onDeckBubble, angle);
    this.onDeckBubble = new __WEBPACK_IMPORTED_MODULE_2__bubble__["a" /* default */]( {x: 450, y: 300} );
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
    this.scorectx.clearRect(0, 0, 200, 130);
    this.scorectx.font = '25px Annie Use Your Telescope';
    this.scorectx.fillText(`Popped: ${this.popped}`, 20, 35);
    this.scorectx.fillText(`Escaped: ${this.escaped}`, 20, 75);
    this.scorectx.fillText(`Score: ${this.calculateScore()}`, 20, 115);
  }

  start() {
    this.canvas.addEventListener('mousemove', e => this.getCannonAngle(e));
    this.canvas.addEventListener('click', e => this.launchMissile(e));

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', e => this.togglePause(e));

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', e => window.location.reload());

    requestAnimationFrame(this.render);
  }

  togglePause(e) {
    // if (e.key === 'Enter') {
      this.paused = !this.paused;
      requestAnimationFrame(this.render);

      const modals = document.getElementsByClassName('pause');
      Array.prototype.forEach.call(modals, modal => modal.classList.toggle('hidden'));
    // }
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chain__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(2);



class BlackHole {
  fallenInto(chain) {
    const bubble = chain.first();
    if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* distance */](bubble.coords, {x: 250, y: 375}) < 3) return true;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(230, 360, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#6b6b6b';
    ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BlackHole);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cannon {
  render(ctx, color, angle) {
    // rotate canvas to reflect mousemove
    ctx.save();
    ctx.translate(450, 300);
    ctx.rotate(angle);

    // draw pointer
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 0 - 50);
    ctx.lineTo(0 - 10, 0 - 30);
    ctx.lineTo(0 + 10, 0 - 30);
    ctx.lineTo(0, 0 - 50);
    ctx.closePath();
    ctx.fill();

    // restore canvas to original orientation
    ctx.translate(0, 0);
    ctx.restore();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Cannon);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);


document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', startGame);

  function startGame() {
    const modalEls = document.getElementsByClassName('modal');
    Array.prototype.forEach.call(modalEls, modalEl => modalEl.classList.add('hidden'));

    document.removeEventListener('click', startGame);

    const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
    game.start();
  }
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bubble__ = __webpack_require__(0);


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

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Path {
  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(-20, 200);
    ctx.bezierCurveTo(200, -20, 775, -30, 840, 200);
    ctx.bezierCurveTo(960, 700, 100, 625, 80, 400);
    ctx.bezierCurveTo(40, 190, 300, 100, 550, 150);
    ctx.bezierCurveTo(900, 200, 700, 650, 250, 375);
    ctx.lineWidth = 40;
    ctx.strokeStyle = '#e3ecef';
    ctx.stroke();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Path);


/***/ })
/******/ ]);