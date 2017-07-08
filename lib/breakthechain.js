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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(7);


class Ball {
  constructor(coords, color) {
    this.color = color || this.randomColor();
    this.coords = coords || {x: -20, y: 200};
    this.percent = 0;
    this.curve = 0;

    this.next = null;
    this.prev = null;
  }

  collidedWith(otherBall) {
    if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* distance */](this.coords, otherBall.coords) < 38) return true;
  }

  move() {
    this.coords = __WEBPACK_IMPORTED_MODULE_0__util__["b" /* getCoordsAtPct */](this.percent, this.curve);

    if (this.percent >= 1 && this.curve < 3) {
      this.curve += 1;
      this.percent = 0;
    } else if (this.percent >=1 && this.curve == 3) {
      this.remove();
    } else this.percent += 0.0001;


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

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__path__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cannon__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ball__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__missile__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chain__ = __webpack_require__(3);






class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");

    this.path = new __WEBPACK_IMPORTED_MODULE_0__path__["a" /* default */]();
    this.onDeckBall = new __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */]({x: 450, y: 300}, null);
    this.cannon = new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */]();
    this.chain = new __WEBPACK_IMPORTED_MODULE_4__chain__["a" /* default */]();
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

    this.missile = new __WEBPACK_IMPORTED_MODULE_3__missile__["a" /* default */](
      {x: 450, y: 300},
      this.onDeckBall.color,
      angle
    );
    this.onDeckBall = new __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */]( {x: 450, y: 300} );
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
    this.chain.render(this.ctx);

    if (this.missile && !this.missile.outOfBounds()) {
      this.missile.move();
      this.missile.render(this.ctx);
    }

    requestAnimationFrame(this.render);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cannon {
  render(ctx, color, angle) {
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

    ctx.translate(0, 0);
    ctx.restore();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Cannon);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(0);


class Chain {
  constructor() {
    this.head = new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]({x: -500, y: -500}, 'HEAD');
    this.tail = new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]({x: -500, y: -500}, 'TAIL');
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.length = 0;
  }

  append() {
    const currentBall = new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]();
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

  render(ctx) {
    this.eachForward( ball => {
      if (!ball.collidedWith(ball.prev)) ball.move();
      ball.render(ctx);
    });

    if (this.last().percent > 0.034) this.append();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Chain);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


document.addEventListener('DOMContentLoaded', () => {
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  game.start();
});



  // // cubic bezier percent is 0-1
  // // cred to this guy:
  // // https://stackoverflow.com/questions/17083580/i-want-to-do-animation-of-an-object-along-a-particular-path
  // function getCoordsAtPct(percent, start, ctrl1, ctrl2, end) {
  //   const x = CubicN(percent, start.x, ctrl1.x, ctrl2.x, end.x);
  //   const y = CubicN(percent, start.y, ctrl1.y, ctrl2.y, end.y);
  //   return {x, y};
  // }
  //
  // // cubic helper formula at percent distance
  // function CubicN(percent, a, b, c, d) {
  //   const t2 = percent * percent;
  //   const t3 = t2 * percent;
  //   return a + (-a * 3 + percent * (3 * a - a * percent)) * percent +
  //   (3 * b + percent * (-6 * b + b * 3 * percent)) * percent +
  //   (c * 3 - c * 3 * percent) * t2 + d * t3;
  // }
  //
  //
  // const firstCurve = [
  //   {x: -20, y: 200},
  //   {x: 200, y: -20},
  //   {x: 775, y: -30},
  //   {x: 840, y: 200},
  // ];
  //
  // const secondCurve = [
  //   {x: 840, y: 200},
  //   {x: 960, y: 700},
  //   {x: 100, y: 625},
  //   {x: 80, y: 400}
  // ];
  //
  // const thirdCurve = [
  //   {x: 80, y: 400},
  //   {x: 40, y: 190},
  //   {x: 300, y: 100},
  //   {x: 550, y: 150}
  // ];
  //
  // const fourthCurve = [
  //   {x: 550, y: 150},
  //   {x: 900, y: 200},
  //   {x: 700, y: 650},
  //   {x: 250, y: 375}
  // ];
  //
  // let onDeckBall = new Ball();
  // onDeckBall.coords = {x: 450, y: 300};
  //
  // const curves = [firstCurve, secondCurve, thirdCurve, fourthCurve];
  // let i = 0;
  // const chain = new Chain();
  // chain.append();
  //
  // drawCannon(450, 300, '#E64F62');
  //
  // const id = setInterval(() => {
  //   drawSpiralPath();
  //   chain.eachForward( ball => {
  //
  //     curve = curves[ball.curve];
  //     ball.coords = getCoordsAtPct(ball.percent, ...curve);
  //     drawBall(ball.coords, ball.color);
  //
  //     if (ball.percent >= 1 && ball.curve < 3) {
  //       ball.curve += 1;
  //       ball.percent = 0;
  //     } else if (ball.percent >=1 && ball.curve == 3) {
  //       // clearInterval(id);
  //       // leads to infinitely appending/removing chain, just keeps going
  //       ball.remove();
  //     } else ball.percent += 0.005;
  //   });
  //
  //   if (chain.last().percent > 0.034) chain.append();
  //
  // }, 30);
  //
  // // balls crowd around the transitions between curves... some kind of mathy
  // // thinking should be able to solve this--something about moving a different
  // // percentage on each curve, based on its relative length?


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(0);


class Missile extends __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */] {
  constructor(coords, color, angle) {
    super(coords, color);
    this.angle = angle;
  }

  move() {
    const offsetX = Math.cos(this.angle) * 10;
    const offsetY = Math.sin(this.angle) * 10;

    this.coords = {
      x: this.coords.x + offsetX,
      y: this.coords.y + offsetY
    };
  }

  outOfBounds() {
    if (
      this.coords.x > 900
      || this.coords.x < 0
      || this.coords.y > 600
      || this.coords.y < 0
    ) return true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ }),
/* 6 */
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


/***/ }),
/* 7 */
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


/***/ })
/******/ ]);