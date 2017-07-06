document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const spiralPath = () => {
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

  const ball = (coords) => {
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#4bc1d2';
    ctx.fill();
  };

  // cubic bezier percent is 0-1
  // cred to this guy:
  // https://stackoverflow.com/questions/17083580/i-want-to-do-animation-of-an-object-along-a-particular-path
  function getCoordsAtPct(percent, start, ctrl1, ctrl2, end) {
    const x = CubicN(percent, start.x, ctrl1.x, ctrl2.x, end.x);
    const y = CubicN(percent, start.y, ctrl1.y, ctrl2.y, end.y);
    return {x, y};
  }

  // cubic helper formula at percent distance
  function CubicN(percent, a, b, c, d) {
    const t2 = percent * percent;
    const t3 = t2 * percent;
    return a + (-a * 3 + percent * (3 * a - a * percent)) * percent +
    (3 * b + percent * (-6 * b + b * 3 * percent)) * percent +
    (c * 3 - c * 3 * percent) * t2 + d * t3;
  }

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

  let percent = 0;
  let i = 0;
  const id = setInterval( () => {
    if (percent >= 1 && i < 3) {
      i += 1;
      percent = 0;
    } else if (percent >= 1 && i == 3) clearInterval(id);

    curve = curves[i];

    coords = getCoordsAtPct(percent, ...curve);

    spiralPath();
    ball(coords);
    // .0005 is a good starting speed, should increase over time
    percent += 0.005;
  }, 30);

});
