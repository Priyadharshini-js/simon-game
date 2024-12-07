let gameLevel = 1;
const buttons = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];

document.addEventListener("keydown", gameStart);

//game start function
function gameStart() {
  document.getElementById("title").innerHTML = "Level" + " " + gameLevel;
  gameSequence = [];
  userSequence = [];
  nextSequence();
  document.removeEventListener("keydown", gameStart);
}

//function for next sequence
function nextSequence() {
  const randomIndex = Math.floor(Math.random() * buttons.length);
  const randomButton = buttons[randomIndex];
  gameSequence.push(randomButton);
  buttonStyle(randomButton);
  userSequence = [];
}

//button animation
function buttonStyle(buttonId) {
  const button = document.getElementById(buttonId);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 200);
  playSound(buttonId);
}

//play sound function
function playSound(buttonId) {
  const sound = new Audio(`sounds/sound_${buttonId}.mp3`);
  sound.onerror = function () {
    console.error(`Error loading sound for ${buttonId}`);
  };
  sound.play();
}

//function for user sequence
function userHandleClick(event) {
  const userClickBtn = event.target.id;
  userSequence.push(userClickBtn);
  buttonStyle(userClickBtn);
  playSound(userClickBtn);

  checkSequenceRight(userSequence.length - 1);
}

// checking the sequence
function checkSequenceRight(currentLevel) {
  if (userSequence[currentLevel] === gameSequence[currentLevel]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(() => {
        gameLevel++;
        document.getElementById("title").innerHTML = "Level" + " " + gameLevel;
        nextSequence();
      }, 500);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("button-red");
    setTimeout(() => {
      document.body.classList.remove("button-red");
    }, 200);
    document.getElementById("title").innerHTML =
      "Game Over, Press Any Key To Restart";
    setTimeout(() => {
      document.addEventListener("keydown", gameStart);
    }, 1000);
    gameStartOver();
  }
}

// game start over function
function gameStartOver() {
  userSequence = [];
  gameSequence = [];
  gameLevel = 1;
}

// event listener for all the button
buttons.forEach((buttonId) => {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", userHandleClick);
});
