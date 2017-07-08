class BlackHole {
  render(ctx) {
    ctx.beginPath();
    ctx.arc(230, 360, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#6b6b6b';
    ctx.fill();
  }
}

export default BlackHole;
