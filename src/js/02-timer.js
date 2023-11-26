import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const TIMER_DELAY = 1000;
let selectedDate = null;
let currentDate = null;
let intervalId = null;

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;
startBtn.addEventListener('click', onStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Report.warning(`Please choose a date in the future!`);
    } else {
      selectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
    }
  },
};
flatpickr(input, options);

function onStartTimer() {
  timer.start();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const timer = {
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;
      timerComponents(convertMs(deltaTime));
      startBtn.disabled = true;
      input.disabled = true;

      if (deltaTime <= 1000) {
        timer.stop();
        Notiflix.Notify.success(`Congratulations! The timer has stopped!`);
      }
    }, TIMER_DELAY);
  },

  stop() {
    clearInterval(intervalId);
    startBtn.disabled = false;
    input.disabled = false;
  },
};

function timerComponents({ days, hours, minutes, seconds }) {
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
