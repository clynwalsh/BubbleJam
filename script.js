document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById("canvas");
  canvas.addEventListener('mousemove', (e) => {
    const angle = Math.atan2(
      (e.clientY - canvas.offsetTop) - 300,
      (e.clientX - canvas.offsetLeft) - 450
    );

    rotateCannon(angle + Math.PI / 2);
  });

  canvas.addEventListener('click', (e) => {
    const angle = Math.atan2(
      (e.clientY - canvas.offsetTop) - 300,
      (e.clientX - canvas.offsetLeft) - 450
    );

    const flyingBall = onDeckBall;
    console.log(flyingBall);
    launchBall(angle, flyingBall);

    onDeckBall = new Ball();
    onDeckBall.coords = {x: 450, y: 300};
  });

  const ctx = canvas.getContext("2d");

  const drawSpiralPath = () => {
    ctx.beginPath();
    ctx.moveTo(-20, 200);
    ctx.bezierCurveTo(200, -20, 775, -30, 840, 200);
    ctx.bezierCurveTo(960, 700, 100, 625, 80, 400);
    ctx.bezierCurveTo(40, 190, 300, 100, 550, 150);
    ctx.bezierCurveTo(900, 200, 700, 650, 250, 375);
    ctx.lineWidth = 40;
    ctx.strokeStyle = '#e3ecef';
    ctx.stroke();
  };

  const drawBall = (coords, color) => {
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 18, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };


  const launchBall = (angle, ball) => {

    const id = setInterval(() => {
      let coords = ball.coords;
      drawBall(coords, "white");
      const offsetX = Math.cos(angle) * 10;
      const offsetY = Math.sin(angle) * 10;

      coords = {
        x: ball.coords.x + offsetX,
        y: ball.coords.y + offsetY
      };
      ball.coords = coords;
      drawBall(coords, ball.color);
      console.log({x: coords.x, y: coords.y});

      if (coords.x > 900 || coords.x < 0 || coords.y > 600 || coords.y < 0) {
        clearInterval(id);
      }
    }, 30);
  };

  const drawCannon = (x, y, color) => {
    // draw circle
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = onDeckBall.color;
    ctx.fill();

    // draw pointer
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 50);
    ctx.lineTo(x - 10, y - 30);
    ctx.lineTo(x + 10, y - 30);
    ctx.lineTo(x, y - 50);
    ctx.closePath();
    ctx.fill();
  };

  const rotateCannon = angle => {
    ctx.save();
    ctx.clearRect(400, 240, 110, 110);
    ctx.translate(450, 300);
    ctx.rotate(angle);

    drawCannon(0, 0, '#E64F62');

    ctx.translate(0, 0);
    ctx.restore();
  };

  // cubic bezier percent is 0-1
  // cred to this guy:
  // https://stackoverflow.com/questions/17083580/i-want-to-do-animation-of-an-object-along-a-particular-path
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

  let onDeckBall = new Ball();
  onDeckBall.coords = {x: 450, y: 300};

  // const curves = [firstCurve, secondCurve, thirdCurve, fourthCurve];
  let i = 0;
  const chain = new Chain();
  chain.append();

  drawCannon(450, 300, '#E64F62');

  const id = setInterval(() => {
    drawSpiralPath();
    chain.eachForward( ball => {

      curve = curves[ball.curve];
      ball.coords = getCoordsAtPct(ball.percent, ...curve);
      drawBall(ball.coords, ball.color);

      if (ball.percent >= 1 && ball.curve < 3) {
        ball.curve += 1;
        ball.percent = 0;
      } else if (ball.percent >=1 && ball.curve == 3) {
        // clearInterval(id);
        // leads to infinitely appending/removing chain, just keeps going
        ball.remove();
      } else ball.percent += 0.005;
    });

    if (chain.last().percent > 0.034) chain.append();

  }, 30);

  // balls crowd around the transitions between curves... some kind of mathy
  // thinking should be able to solve this--something about moving a different
  // percentage on each curve, based on its relative length?
});
