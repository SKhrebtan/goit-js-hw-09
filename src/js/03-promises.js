import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'top-right',
  cssAnimationStyle: 'from-left',
  cssAnimationDuration: 700,
  timeout: 3000,
}
);

const promiseGenerator = document.querySelector('.form')

promiseGenerator.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
  };

function onFormSubmit(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget;
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  let formAmount = Number(amount.value);
  console.log(firstDelay)
 

  for (let i = 1; i <= formAmount; i += 1){
    
    createPromi,se(i, firstDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    
    firstDelay += delayStep;
  };
  promiseGenerator.reset();
}

 



