const msgEl = document.getElementById("msg");

const randNum = getRandomNum();
console.log(randNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();

//Start recognition and game
recognition.start();

//Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkMessage(msg);
}

//Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
<div>You Said:</div>
<span class="box">${msg}</span>
`;
}

//Check what user speaks
function checkMessage(msg) {
  const num = +msg;

  //Check if a vaild number

  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  //Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }

  //Check number
  if (num === randNum) {
    document.body.innerHTML = `
    <h2><span class='number'>Congrats!</span> You guessed the number !<br><br>
    It was <span class='number'> ${num}</span></h2>
    <button class='play-again' id='play-again'>Play Again</button>
    `;
  } else if (num < randNum) {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  } else {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  }
}

//Generate random number
function getRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

//Speak result
recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => {
  recognition.start();
});

document.body.addEventListener("click", (e) => {
  if ((e.target.id = "play-again")) {
    window.location.reload();
  }
});
