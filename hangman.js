var pullWord = new XMLHttpRequest();
pullWord.onload = function(){
  var wordList = this.responseText;
  var wordListLines = wordList.split( '\n' );
  var getLine = Math.floor( Math.random() * wordListLines.length);
  var randomLine = wordListLines[getLine];
  console.log(randomLine);
};
pullWord.open('GET', 'https://github.com/first20hours/google-10000-english/blob/master/google-10000-english-usa-no-swears-medium.txt', true);
pullWord.send();
