export const distance = (center1, center2) => {
  return Math.sqrt(
    Math.pow(center1.x - center2.x, 2) +
    Math.pow(center1.y - center2.y, 2)
  );
};

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
export const getCoordsAtPct = (percent, curve) => {
  const start = curves[curve][0];
  const ctrl1 = curves[curve][1];
  const ctrl2 = curves[curve][2];
  const end = curves[curve][3];

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
