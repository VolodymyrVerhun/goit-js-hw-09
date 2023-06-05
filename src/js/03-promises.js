import Notiflix from 'notiflix';


const formEl = document.querySelector('.form');
formEl.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  const object = { position, delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       
  if (shouldResolve) {
    resolve(object)
  } else {
    reject(object)
  }
    }, delay);
  })
 
};


function submitForm (event) {
  event.preventDefault();
  let delay = Number(formEl.delay.value);

  for (let i = 0; i < formEl.amount.value; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(formEl.step.value)
}
};

console.log('hello');

