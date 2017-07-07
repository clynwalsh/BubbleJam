import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
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
