
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let randomColor = 0;

btnStart.addEventListener('click', () => {
   btnStart.disabled = true;
   btnStop.disabled = false;
    randomColor = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000)
});

btnStop.addEventListener('click', () => {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(randomColor);
 });

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  

