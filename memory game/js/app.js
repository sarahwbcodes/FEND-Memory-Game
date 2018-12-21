//card arrays
var icons = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'
];
const revealedCards=[];
const matchedCards = [];
const starsArray=[$('.star1') , $('.star2'), $('.star3')];
//global variables
let moves = 0;
//const stars = $('.stars');
let seconds = 0;
let rating = 3;
let interval;
let card;
const movesDiv =$('.moves');
const timer = $('.timer');
const resetIcon = $('.restart');
const popupReset= $('.btn-primary');
const modal =$('#endModal');
//main function
$(document).ready(function(){
  // Start shuffling the array
  var shuffledIcons = shuffle(icons)
  // Generate HTML from the shuffled Array
  shuffleCards(shuffledIcons);
  // Assign listener for the divs
  card = $('.card');
showCard();
gameTimer();
});

//show card
function showCard (){
  $(card).click(function(){
    if (revealedCards.length<2 && !$(this).hasClass('open show')){
    $(this).toggleClass('open');
    $(this).toggleClass('show');
    revealedCards.push($(this));
    incMoves();
    if (revealedCards.length==2){
      setTimeout(function(){
        checkMatch();
      },800);
    }
}
starScore();

});

} //end showCard


//if cards are open => check match
function checkMatch(){
  if ($(revealedCards[0]).children(0).attr('class') == $(revealedCards[1]).children(0).attr('class')){
    $(revealedCards[0]).toggleClass('match');
    $(revealedCards[1]).toggleClass('match');
    matchedCards.push($(revealedCards[0]));
    matchedCards.push($(revealedCards[1]));
    revealedCards.pop($(revealedCards[0]));
    revealedCards.pop($(revealedCards[1]));
    incMoves();
  }
  else {
    $(revealedCards[0]).removeClass('show open');
    $(revealedCards[1]).removeClass('show open');
    revealedCards.pop($(revealedCards[0]));
    revealedCards.pop($(revealedCards[1]));
    incMoves();
  }
  //game end
  if (matchedCards.length==16){
    gameModal();
    clearInterval(interval);
    let finalTime = timer.text();
    let finalRating = rating;
    let finalMoves = movesDiv.text();
  }
};

//moves and scoring conditional
function starScore() {
  //console.log("scoring -- ");
    rating--;
     if (moves > 21 && moves < 30) {
      starsArray[0].hide();
      rating = 2;
      //console.log("stars 21")
    } else if (moves > 31) {
      starsArray[1].hide();
      rating = 1;
      //console.log("stars 31")
    }
    return {score: starScore};
}
//shuffle cards
function shuffleCards(array){
// To save space of code I used this function , by taking array as parameter and generate html from it
array.forEach(function(item){
    $('.deck').append('<li class="card"><i class="fa '+item+'"></i></li>');
});
}

//game reset
function gameReset() {
  movesDiv.text(0);
  moves=0;
  rating=3;
  timer.text(0);
  seconds=0;
  gameTimer();
  clearInterval(interval);
  starsArray[0].show();
  starsArray[1].show();
  starsArray[2].show();
  $('.match').removeClass('match');
  $('.show').removeClass('show');
  $('.open').removeClass('open');
  shuffleCards(shuffledIcons);
};
//add reset functionality to button and icon
resetIcon.click(function(){
  gameReset();
});
popupReset.click(function(){
  gameReset();
});
//shuffle function, provided by Udacity through StackOverflow
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
  }
//shuffle
  /*array.forEach(function(item){
    $('.deck').append('<li class="card"><i class="fa '+item+'"></i></li>');
  })*/

//update Moves
function incMoves(){
  moves++;
  movesDiv.text(moves);
}
//timer
function gameTimer(){
 interval = setInterval(function(){
    seconds++;
    timer.text(seconds);
  },1000);
}

//modal
function gameModal(){
  scoreScreen();
$(modal).modal();
};

function scoreScreen(){
  let finalTime = timer.text();
  let finalRating = rating;
  let finalMoves = movesDiv.text();
  $('#endScore').html(finalRating);
  $('#endTime').html(finalTime);
  $('#endMoves').html(finalMoves);
}
