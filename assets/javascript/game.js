
var userName = prompt("NEW GAME \n Input your name");
var girlName = prompt("Please name a special women in your life");
alert("Hi " + userName + " Lets play a game. The Rules are quite simple, Guess the letters of a random word, If you get it right " + girlName + " will live, If you get it wrong She will die. Good Luck.");
var main = {
	wordList: ["bookworm", "jawbreaker", "kilobyte", "schizophrenia", "razzmatazz", "xylophone", "zodiac", "youthful", "pneumonia", "marquis", "jigsaw"],
	life: 8,
	wordBlankSpace: [],
	lettersInSelectedWord: [],
	selectedWord: "",
	numbWord: 0,
	rightGuess: [],
	wrongGuess: [],
	winCounter: 0,
	lostCounter: 0,
	chances: 3,
	level: 1,
}


// Functions Starts here
function gameStart () {
	/* this function will selet a random word from wordList and place to into selectedWord.
	will break the selectedWord from wordList and separate them into single characters and
	replace them with underscores and place them into wordBlankSpace.
	will set the life to 8. 
	and empty the arrays for wrongGuess and rightGuess. */
	var letterList = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
	for (var i = 0; i < 26; i++) {
		document.getElementById(letterList[i]).style.color = "red";
	}
	main.life = 8;
	main.wrongGuess = [];
	main.wordBlankSpace = [];
	main.selectedWord = main.wordList[Math.floor(Math.random() * main.wordList.length)];
	main.lettersInSelectedWord = main.selectedWord.split("");
	main.numbWord = main.lettersInSelectedWord.length;
	console.log(main.lettersInSelectedWord)
	console.log(main.numbWord)
	for (var i = 0; i < main.numbWord; i++) {
		main.wordBlankSpace.push("_")
	}
	console.log(main.wordBlankSpace)
	document.getElementById("try").innerHTML = main.life;
	document.getElementById("blankWord").innerHTML = main.wordBlankSpace.join(" ");
}

function compare(letter) {
	/* should check if the letter guessed matches any of the element in LettersInSelectedWord, if it matched, replace an underscore with
	the appropiate letter. If it did not match, decrease life by 1*/
	var letterInWord = false;
	for (var i = 0; i < main.numbWord; i++) {
		if (main.selectedWord[i] === letter) {
			letterInWord = true;
		}

	}
	if(letterInWord) {
		for (var i = 0; i < main.numbWord; i++) {
			if(main.selectedWord[i] === letter) {
				main.wordBlankSpace[i] = letter;
			}
		}
	}
	else {
		main.life --;
		main.wrongGuess.push(letter);
			document.getElementById(letter).style.color = "grey";
	}
		console.log(main.wrongGuess);
		console.log(main.lettersInSeslectedWord);
}

function gameCondition() {
	document.getElementById("blankWord").innerHTML = main.wordBlankSpace.join(" ");
    document.getElementById("try").innerHTML = main.life;
    if (main.life == 0) {
    	alert("You Failed")
    	var again = confirm(userName + " I will give you " + (main.chances - 1) + " more chances to save " + girlName + ". Accept and the game continues. If you decline she dies.");
    	if (again) {
    		main.chances --;
    		alert("You have " + main.chances + " chances left");
    		gameStart();
    	}
    	else {
    		document.getElementById("girl").style.background = "url('assets/images/explotion.png')";
    	}
    }
    if (main.chances < 1) {
    	alert("Bye Bye " + girlName + "!! \r b Please reload the Page to play again")
    	document.getElementById("girl").style.background = "url('assets/images/explotion.png')";
   
    }
    if (main.wordBlankSpace.join(" ") == main.lettersInSelectedWord.join(" ")) {
    	main.level ++;
    	alert("Next level " + main.level)
    	gameStart();
    }
    if (main.life < 0) {
    	location.reload();
    }
    if (main.level == 4) {
    	alert("You saved " + girlName + " Good Job!")
    	location.reload();
    }
    document.getElementById("levels").innerHTML = main.level;
}

gameStart();
document.onkeyup = function(event) {

	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); // find out WHAT THIS IS!!!!!!
	document.getElementById(letterGuessed).style.color = "green";
	compare(letterGuessed);
	gameCondition();
	console.log(letterGuessed)
}
