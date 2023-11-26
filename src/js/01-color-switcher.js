const bodyEl = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const PROMPT_DELAY = 1000;
let timerId = null;

startButton.addEventListener('click', onStartBtnClick);
stopButton.addEventListener('click', onStopBtnClick);
stopButton.disabled = true;

function onStartBtnClick() {
  timerId = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, PROMPT_DELAY);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function onStopBtnClick() {
  clearInterval(timerId);
  startButton.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
