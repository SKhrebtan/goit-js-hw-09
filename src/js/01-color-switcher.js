const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
}
let intervalId = null;
let counter = 0;
refs.startButton.addEventListener('click', onStartButton);
refs.stopButton.addEventListener('click', onStopButton);

function onStartButton() {
    intervalId = setInterval(() => {
        console.log(counter += 1)
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    refs.startButton.setAttribute('disabled', '');

};

function onStopButton(e) {
    clearInterval(intervalId);
    refs.startButton.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
