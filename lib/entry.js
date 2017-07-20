import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', startGame);

  function startGame() {
    const modalEls = document.getElementsByClassName('modal');
    Array.prototype.forEach.call(modalEls, modalEl => modalEl.classList.add('hidden'));

    document.removeEventListener('click', startGame);

    const game = new Game();
    game.start();
  }
});
