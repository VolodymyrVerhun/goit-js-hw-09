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

function startTimer (selectedDates) {
    btnEl.disabled = false;
    btnEl.addEventListener('click', () => {
         updateTimer(selectedDates);
          
    })
};

function showAlert ( ) {
    btnEl.disabled = true;
    return Notiflix.Notify.failure('Please choose a date in the future');
};

// функція з бібліотеки
flatpickr(calendarEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let currentTime = Date.now();
    // перевірка на час
    if(selectedDates[0].getTime() > currentTime) {
                startTimer (selectedDates);
    } else {
        showAlert (); 
    }
    },
  });

  let timerId = null;
  function updateTimer (selectedDates) {
    
    const deltadate = getDeltaDate (selectedDates);
        
    const datesObj = convertMs(deltadate);

    showTimer(datesObj);
       
   
    clearInterval(timerId);
    if(deltadate <= 0) {
        showTimer( { days: 0, hours: 0, minutes: 0, seconds: 0 } );
        return;
    };

    timerId = setTimeout( () => { 
    updateTimer(selectedDates)}, 1000)
  };

  function showTimer ({ days, hours, minutes, seconds }) {
    dayEl.textContent = addLeadingZero(days);
    hourEl.textContent = addLeadingZero(hours);
    minuteEl.textContent = addLeadingZero(minutes);
    secondEl.textContent = addLeadingZero(seconds);
  };

function getDeltaDate (selectedDates) {
    const nowDate = Date.now();
    const targetDate = selectedDates[0].getTime();
    const deltadate = targetDate - nowDate;
    return deltadate;
};

  