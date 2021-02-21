"use strict";

//init variable declarations
let scorePlyr0,
  scorePlyr1,
  currentPlyr0,
  currentPlyr1,
  activePlyr,
  roundScore,
  gamePlaying,
  diceNum;

//this initialises the dice animation part
let diceDOM = document.querySelector(".dice");

const targetScore = 30;

function init() {
  (scorePlyr0 = 0),
    (scorePlyr1 = 0),
    (currentPlyr0 = 0),
    (currentPlyr1 = 0),
    (activePlyr = 0),
    (roundScore = 0),
    (gamePlaying = true);
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.querySelector(".player-0").classList.add("player--active");
  document.querySelector(".player-1").classList.remove("player--active");
  diceDOM.classList.add("hidden");
}

init();

let changeActivePlayer = function () {
  //only change player when game is active
  if (gamePlaying) {
    roundScore = 0;
    //display 0 in current score
    document.querySelector("#current--" + activePlyr).textContent = roundScore;
    //change active player
    activePlyr == 0 ? (activePlyr = 1) : (activePlyr = 0);

    //change player highlighting in the html
    document.querySelector(".player-0").classList.toggle("player--active");
    document.querySelector(".player-1").classList.toggle("player--active");
  }
};

let winner = function () {
  if (scorePlyr0 >= targetScore) {
    document.getElementById("score--0").textContent = "Winner!!";
    gamePlaying = false;
  } else if (scorePlyr1 >= targetScore) {
    document.getElementById("score--1").textContent = "Winner!!";
    gamePlaying = false;
  }
};

//initialises variables on the html
document.getElementById("score--0").textContent = scorePlyr0;
document.getElementById("score--1").textContent = scorePlyr1;
document.getElementById("current--0").textContent = currentPlyr0;
document.getElementById("current--1").textContent = currentPlyr1;

//when roll dice is clicked...
document.querySelector(".btn--roll").addEventListener("click", function () {
  //only roll when game is active
  if (gamePlaying) {
    diceDOM.classList.remove("hidden");
    diceNum = Math.floor(Math.random() * 6 + 1);

    roundScore += diceNum;

    document.querySelector("#current--" + activePlyr).textContent = roundScore;

    //if the active player rolls a 1
    if (diceNum == 1) {
      changeActivePlayer();
    }

    //change frame of dice anim
    diceDOM.src = "dice-" + diceNum + ".png";

    /* console.log(roundScore); */
  }
});

//player clicks Hold button
document.querySelector(".btn--hold").addEventListener("click", function () {
  //only hold when game is active
  if (gamePlaying) {
    //update player score depending on activePlyr
    if (activePlyr == 0) {
      scorePlyr0 += roundScore;
    } else {
      scorePlyr1 += roundScore;
    }

    //display scores
    document.getElementById("score--0").textContent = scorePlyr0;
    document.getElementById("score--1").textContent = scorePlyr1;

    //if any of the scores reaches targetScore then it's a win
    if (scorePlyr0 >= targetScore || scorePlyr1 >= targetScore) {
      winner();
    }

    changeActivePlayer();

    /* activePlyr == 0 ? scorePlyr0 : (scorePlyr1 += roundScore); */
    console.log(`scorePly0 = ${scorePlyr0}`);
    console.log(`scorePly1 = ${scorePlyr1}`);
  }
});

document.querySelector(".btn--new").addEventListener("click", function () {
  init();
});
