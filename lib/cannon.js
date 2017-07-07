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

export default Cannon;
