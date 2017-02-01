var wordArray = [];
var alreadyGuessed = [];
var numWrongGuesses = 0;
var guess = '';
wordToArray();
// Pull word array from text file
// Found code to load and grab random line from text file on Stack Overflow: http://stackoverflow.com/questions/21558336/fetching-random-line-from-flat-text-file-database
// Original Word List: https://github.com/first20hours/google-10000-english/blob/master/google-10000-english-usa-no-swears-medium.txt
function wordToArray(){
  var pullWord = new XMLHttpRequest();
  pullWord.onload = function(){
    var wordList = this.responseText;
    var wordListLines = wordList.split( '\n' );
    var getLine = Math.floor( Math.random() * wordListLines.length);
    wordArray = wordListLines[getLine].split('');
    createBoxes(wordArray);
    console.log(wordArray);
  };
  pullWord.open('GET', 'https://raw.githubusercontent.com/pretorben/project1_hangman/gh-pages/word-list.txt', true);
  pullWord.send();
}

// Create boxes
function createBoxes(array){
  for(i=0;i<array.length;i++){
    $('.guess-word').append('<p class=letter-box>'+array[i]+'</p>');
    $('.guess-word').find($('.letter-box')).css({'height': '30px', 'width': '30px', 'background-color': 'white', 'color': 'white', 'margin-right': '5px', 'text-align': 'center', 'position': 'relative', 'margin-top': '35%', 'border': '0px', 'font-size': '20px'});
  }
}

// Determine if user guessed letter or word
$('button').on('click',function guessLetterOrWord(){
  var guess = $('input').val();
  $('input').val('');
  if($.inArray(guess, alreadyGuessed) !== -1){
    alert('You have already guessed that.  Please try again.');
  }
  else{
    if(guess.length>1){
      guessWord(guess);
    }
    else{
      guessLetter(guess);
    }
  }
});

// Guess is a word
function guessWord(guess){
  var word = wordArray.join('');
  if(word==guess){
    $('.guess-word').find($('.letter-box')).css('background-color','rgb(0,91,19)');
    alert('Congratulations, you win!');
    askPlayAgain();
  }
  else{
    wrongGuess(guess);
  }
}

// Guess is a letter
function guessLetter(guess){
  if($.inArray(guess, wordArray) !== -1){
    revealLetters(guess);
  }
  else{
    wrongGuess(guess);
  }
}

// Reveal correct letter(s)
function revealLetters(guess){
  for(i=0;i<wordArray.length;i++){
    if(guess==wordArray[i]){
      $('.guess-word').find($('.letter-box').eq(i)).css('background-color','rgb(0,91,19)');
    }
  }
  didUserWin(guess);
}

// Checking to see if user has guessed all the letters
function didUserWin(guess){
  var compareArray = wordArray;
  alreadyGuessed.push(guess);
  $('.guesses').html("Guessed: " + alreadyGuessed);
  var inWord = 0;
  var uniqueLetters = $.uniqueSort(compareArray);
  for(i=0;i<alreadyGuessed.length;i++){
    if($.inArray(alreadyGuessed[i], uniqueLetters) !== -1){
      inWord++;
    }
  }
  if(inWord == uniqueLetters.length){
    alert('Congratulations, you win!');
    askPlayAgain();
  }
  else{
    setTimeout(function(){ alert('Please enter your next guess.');}, 500);
  }
}

// Wrong guess
function wrongGuess(guess){
  var imageArray = ['img/noose.jpg', 'img/noose_head.jpg', 'img/noose_neck.jpg', 'img/noose_arms.jpg', 'img/noose_torso.jpg', 'img/noose_legs.jpg'];
  numWrongGuesses++;
  guessesLeft = 5 - numWrongGuesses;
  $('main').css('background-image','url(' + imageArray[numWrongGuesses] + ')');
  if (numWrongGuesses>=5){
    var word = wordArray.join('');
    alert('Sorry, you lose.  Your word was: ' + word);
    askPlayAgain();
  }
  else{
    alreadyGuessed.push(guess);
    $('.guesses').html("Guessed: " + alreadyGuessed);
    alert('Sorry, that is incorrect.  You have ' + guessesLeft + ' guess(es) left.  Please enter your next guess.');
  }
}

// Ask if user wants to play again
function askPlayAgain(){
  playAgain = prompt('Would you like to play again? (y/n)');
  if (playAgain == 'y' || playAgain == 'Y'){
    numWrongGuesses = 0;
    alreadyGuessed = [];
    $('.letter-box').remove();
    $('main').css('background-image','url(img/noose.jpg)');
    alert('Great!  A new word has been generated for you.  Good luck!');
    wordToArray();
  }
  else{
    setTimeout(function(){ alert('Thanks for playing!');}, 700);
  }
}
