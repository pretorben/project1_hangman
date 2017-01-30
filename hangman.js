var pullWord = new XMLHttpRequest();
pullWord.onload = function(){
  var wordList = this.responseText;
  var wordListLines = wordList.split( '\n' );
  var getLine = Math.floor( Math.random() * wordListLines.length);
  var randomLine = wordListLines[getLine];
  console.log(randomLine);
};
pullWord.open('GET', 'https://github.com/pretorben/project1_hangman/blob/gh-pages/word-list.txt', true);
pullWord.send();
