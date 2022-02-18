"use strict";
// SELECTING ELEMENTS
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// STARTING CONDITION

let scores, currentScore, activePlayer, playing;

const initialize = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add(`hidden`);

  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

initialize();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// ROLLING DICE FUNCTION
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `imgs/dice-${dice}.png`;
    console.log(dice);

    // 3. Check for roll 1: if true,
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore; //CHANGE LATTER
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    console.log(`Hold Button `);
    //1. ADD CURRENT SCORE TO ACTIVE PLAYER"S SCORE
    scores[activePlayer] += currentScore;
    // scores[1]=scores[1]+currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. CHECK SCORE IS >= 100
    if (scores[activePlayer] >= 100) {
      // FINISH GAME
      playing = false;
      diceEl.classList.add(`hidden`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

// btnNew.addEventListener(`click`, function () {
//   diceEl.classList.add(`hidden`);
//   // activePlayer = 0;
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.add(`player--active`);

//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove(`player--winner`);
//   playing = true;
//   switchPlayer();
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   // rollDice();
//   console.log(current0El);
// });

btnNew.addEventListener(`click`, initialize);
