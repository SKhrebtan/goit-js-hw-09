import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
    position: 'left-top',
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

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= Date.now()) {
            Notiflix.Notify.failure('Wrong date');
            refs.startButton.disabled = true;
            countdown.stop();
            return;
        }
        else {
            countdown.stop();
            refs.startButton.disabled = false;
            selectedTime = selectedDates[0].getTime();
           }
    }
};


class Countdown {
    constructor({ onTick }) {
        this.onTick = onTick;
        this.isActive = false;
        this.intervalId = null;
    }
    
    start() {
        if (this.isActive) {
            return;
        };
        this.isActive = true;
        
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const time = this.convertMs(deltaTime);
            console.log(time)
            this.onTick(time);
            if (deltaTime <= 10000) {
                document.body.style.backgroundColor = 'red';
            }
           if (deltaTime <= 0) {
               this.stop();
               document.body.style.backgroundColor = 'black';
            }
        }, 1000);
    }
     stop() {
         clearInterval(this.intervalId);
         this.isActive = false;
         const time = this.convertMs(0);
         this.onTick(time);
    }
    addLeadingZero(value) {
    return String(value).padStart(2, '0');
    };
    convertMs(ms) {
   const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = this.addLeadingZero(Math.floor(ms / day));
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};
};

const countdown = new Countdown({
        onTick: updateClockValues,
    });


function updateClockValues({ days, hours, minutes, seconds }) {
    refs.daysValueSpan.textContent = days;
    refs.hoursValueSpan.textContent = hours;
    refs.minsValueSpan.textContent = minutes;
    refs.secsValuespan.textContent = seconds;
}

flatpickr(refs.inputDatePicker, options);

refs.startButton.addEventListener('click', countdown.start.bind(countdown));
 
