import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const startGame = () => {
    const modalEls = document.getElementsByClassName('start-modal');
    Array.prototype.forEach.call(modalEls, modalEl => modalEl.classList.add('hidden'));

    document.removeEventListener('click', startGame);

    const game = new Game();
    game.start();
  }

  document.addEventListener('click', startGame)
});
