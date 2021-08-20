'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');//another way of selecting id
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; //defining variable

//  conditions for new game and reload
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); //for execution of above code

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //creating id name
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;//if active player is 0 then new acitve plyer is 1 else 0
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;//selecting no. between 1-5 and adding 1 to elevate 1-6
                                                   //math.random gives no. b/w 0-1
                                                   //so multiply 6 to fid no. b/w1-6
                                                   //adng 1 to include 6 also 
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      //adding to current score
     currentScore=currentScore+dice;
      document.getElementById(`current--${activePlayer}` ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});
//for hold
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish  game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);// for new game
