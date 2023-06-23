const promiseGenerator = document.querySelector('.form')

promiseGenerator.addEventListener('input', onFormSubmit)

function onFormSubmit(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget;
  let firstDelay = delay.value;
  let delayStep = step.value;
  let Amount = amount.value;

  function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
     resolve({ position, delay })
  } else {
    reject({ position, delay })}}, delay)
     
  })
  };
  
createPromise(firstDelay, delayStep)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
};



