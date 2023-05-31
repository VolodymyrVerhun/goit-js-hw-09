import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


// отримаю посилання
const calendarEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minuteEl = document.querySelector('[data-minutes]');
const secondEl = document.querySelector('[data-seconds]');

let currentTime = new Date();
// функція з бібліотеки
flatpickr(calendarEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    
    // перевірка на час
    if(selectedDates[0].getTime() > currentTime.getTime()) {
        btnEl.disabled = false;
        btnEl.addEventListener('click', () => {
            
            setInterval(() => {

                let nowDate = Date.now();
                let targetDate = selectedDates[0].getTime();
                let deltadate = Math.round((targetDate - nowDate) / 1000);

                let seconds = deltadate % 60;
                let minutesTotal = Math.floor((deltadate / 60));
                let minutes = minutesTotal % 60;
                let hoursTotal = Math.floor((minutesTotal / 60));
                let hours = hoursTotal % 24;
                let days = Math.floor(hoursTotal / 24);
                
                // // записую числове значення дати у кожен елемент
                dayEl.textContent = days.toString().padStart(2, '0');
                hourEl.textContent = hours.toString().padStart(2, '0');
                minuteEl.textContent = minutes.toString().padStart(2, '0');
                secondEl.textContent = seconds.toString().padStart(2, '0');

            }, 1000);
        })
    } else {
        btnEl.disabled = true;
        return window.alert("Please choose a date in the future");
        
    }
    },
  });




