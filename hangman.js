/// James' comments in triple-slashes

/// Your code is very well-organized into functions that not only have well-defined purposes, but
/// also breaks down the program's operation into logical, modular chunks. It is also well-formatted.
/// While this made reading your code fairly easy, it's still very important to add in comments to
/// explain your program and its variables.

/// One minor formatting opinion: spaces in between operators/delimiters are great.
///  for (let i = 0; i < array.length; i++){
/// is better than
///  for (i=0;i<array.length;i++){



var wordArray = [];
var alreadyGuessed = [];
var numWrongGuesses = 0;
var guess = '';
wordToArray();

/// Nice! also way to cite your sources
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
  ///use let with for-loop
  for (let i = 0; i < array.length; i++){
    /// add quotes
    $('.guess-word').append('<p class="letter-box">'+array[i]+'</p>');

    ///I would put all the css in the object-literal into a css class on the stylesheet, THEN add that class with addClass("class-name").

    ///this would be better formatted this way:
    $('.guess-word').find($('.letter-box')).css(
    {
      'height': '30px',
      'width': '30px',
      'background-color': 'white',
      'color': 'white',
      'margin-right': '5px',
      'text-align': 'center',
      'position': 'relative',
      'margin-top': '35%',
      'border': '0px',
      'font-size': '20px'
    });
    }
  }

  // Determine if user guessed letter or word
  /// the function below shouldn't be named if it isn't referenced anywhere else.
  /// named functions should be defined outside of callbacks also
  $('button').on('click',function guessLetterOrWord(){
    var guess = $('input').val();

    ///this line isn't doing anything
    $('input').val('');

    /// you can also use the core js method .includes() rather than jQuery's inArray
    if($.inArray(guess, alreadyGuessed) !== -1){
      alert('You have already guessed that.  Please try again.');
    } else {
      if ( guess.length > 1 ){
        guessWord(guess);
      } else {
        guessLetter(guess);
      }
    }

    // wanted to note you could also write it this way, but stylistically i think i might like your way more
    // if($.inArray(guess, alreadyGuessed) !== -1){
    //   alert('You have already guessed that.  Please try again.');
    // } else if ( guess.length > 1 ){
    //   guessWord(guess);
    // } else {
    //   guessLetter(guess);
    // }
  })
  // });

  // Guess is a word
  function guessWord(guess){
    var word = wordArray.join('');
    if ( word == guess ) {
      $('.guess-word').find($('.letter-box')).css('background-color','rgb(0,91,19)');
      alert('Congratulations, you win!');
      askPlayAgain();
    } else {
      wrongGuess(guess);
    }
  }

  // Guess is a letter
  function guessLetter(guess){
    if ( $.inArray(guess, wordArray) !== -1){
      revealLetters(guess);
    } else {
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
    for (i=0;i<alreadyGuessed.length;i++) {
      if ($.inArray(alreadyGuessed[i], uniqueLetters) !== -1){
        inWord++;
      }
    }
    if (inWord == uniqueLetters.length) {
      alert('Congratulations, you win!');
      askPlayAgain();
    } else {
      setTimeout(function(){ alert('Please enter your next guess.');}, 500);
    }
  }

  // Wrong guess
  function wrongGuess(guess){
    /// Very clever solution
    var imageArray = ['img/noose.jpg', 'img/noose_head.jpg', 'img/noose_neck.jpg', 'img/noose_arms.jpg', 'img/noose_torso.jpg', 'img/noose_legs.jpg'];
    numWrongGuesses++;
    guessesLeft = 5 - numWrongGuesses;
    $('main').css('background-image','url(' + imageArray[numWrongGuesses] + ')');
    if (numWrongGuesses>=5){
      var word = wordArray.join('');
      alert('Sorry, you lose.  Your word was: ' + word);
      askPlayAgain();
    } else {
      alreadyGuessed.push(guess);
      $('.guesses').html("Guessed: " + alreadyGuessed);
      alert('Sorry, that is incorrect.  You have ' + guessesLeft + ' guess(es) left.  Please enter your next guess.');
    }
  }

  // Ask if user wants to play again
  function askPlayAgain(){
    /// add let, avoid globals
    playAgain = prompt('Would you like to play again? (y/n)');
    if (playAgain == 'y' || playAgain == 'Y') {
      numWrongGuesses = 0;
      alreadyGuessed = [];
      $('.letter-box').remove();
      $('main').css('background-image','url(img/noose.jpg)');
      alert('Great!  A new word has been generated for you.  Good luck!');
      wordToArray();
    } else {
      setTimeout(function(){ alert('Thanks for playing!');}, 700);
    }
  }
