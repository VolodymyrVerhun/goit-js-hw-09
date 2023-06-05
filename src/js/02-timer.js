import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


// отримаю посилання
const calendarEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minuteEl = document.querySelector('[data-minutes]');
const secondEl = document.querySelector('[data-seconds]');

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
        return { days, hours, minutes, seconds };
      }



// функція з бібліотеки
flatpickr(calendarEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let currentTime = new Date();
    // перевірка на час
    if(selectedDates[0].getTime() > currentTime.getTime()) {
        btnEl.disabled = false;
        btnEl.addEventListener('click', () => {
            
            setInterval(() => {

                let nowDate = Date.now();
                let targetDate = selectedDates[0].getTime();
                let deltadate = targetDate - nowDate;

                
                const { days, hours, minutes, seconds } = convertMs(deltadate);
              
                dayEl.textContent = addLeadingZero(days);
                hourEl.textContent = addLeadingZero(hours);
                minuteEl.textContent = addLeadingZero(minutes);
                secondEl.textContent = addLeadingZero(seconds);

                if(deltadate <= 0) {
                    clearInterval();
                    dayEl.textContent = '00';
                    hourEl.textContent = '00';
                    minuteEl.textContent = '00';
                    secondEl.textContent = '00';
                    return;
                }

            }, 1000);
        })
    } else {
        btnEl.disabled = true;
        return Notiflix.Notify.failure('Please choose a date in the future');
        
    }
    },
  });
