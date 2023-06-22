import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
    position: 'center-center',
});
 
const refs = {
    inputDatePicker: document.querySelector('#datetime-picker'),
    startButton: document.querySelector('button[data-start]'),
    daysValueSpan: document.querySelector('span[data-days]'),
    hoursValueSpan: document.querySelector('span[data-hours'),
    minsValueSpan: document.querySelector('span[data-minutes]'),
    secsValuespan: document.querySelector('span[data-seconds]'),
}
let selectedTime = null;
let intervalId = null;

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= Date.now()) {
            Notiflix.Notify.failure('Wrong date');
   
            return;
        }
        else {
            refs.daysValueSpan.textContent = '00';
            refs.hoursValueSpan.textContent = '00';
            refs.minsValueSpan.textContent = '00';
            refs.secsValuespan.textContent = '00';
            clearInterval(intervalId);
            refs.startButton.disabled = false;
            selectedTime = selectedDates[0].getTime();
           
            console.log(selectedTime)
            
    }
    }
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
   const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

const countdown = {
    isActive: false,

    start() {
            if(this.isActive) {
        return;
        };
        this.isActive = true;
        
        intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            console.log(deltaTime)
            refs.daysValueSpan.textContent = days;
            refs.hoursValueSpan.textContent = hours;
            refs.minsValueSpan.textContent = minutes;
            refs.secsValuespan.textContent = seconds;
        }, 1000);
    }
};

flatpickr(refs.inputDatePicker, options);



function onStartCountdown(e) {
    console.log(e);
    countdown.start();
}

refs.startButton.addEventListener('click', countdown.start);
 
