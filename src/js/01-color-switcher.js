const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
}
let intervalId = null;
let counter = 0;
refs.startButton.addEventListener('click', onStartButton);
refs.stopButton.addEventListener('click', onStopButton);
refs.stopButton.disabled = true;

function onStartButton() {
    intervalId = setInterval(() => {
        console.log(counter += 1)
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    refs.startButton.disabled = true;
    refs.stopButton.disabled = false;

};

function onStopButton(e) {
    clearInterval(intervalId);
    refs.startButton.disabled = false;
    refs.stopButton.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
