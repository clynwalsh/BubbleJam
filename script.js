document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(-20, 200);
  ctx.bezierCurveTo(200, -20, 775, -30, 840, 200);
  ctx.bezierCurveTo(960, 700, 100, 625, 80, 400);
  ctx.bezierCurveTo(40, 190, 300, 100, 550, 150);
  ctx.bezierCurveTo(900, 200, 700, 650, 250, 375);
  ctx.lineWidth = 40;
  ctx.strokeStyle = '#e3ecef';
  ctx.stroke();

});
