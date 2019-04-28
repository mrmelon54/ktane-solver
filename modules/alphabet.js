//$$ {"name":"Alphabet","alias":["alphabet"],"help":"alphabet <letters>"} $$

function except(arr1, arr2) {
	return arr1.filter(x => arr2.indexOf(x) == -1);
}

function uniqueString(nowStr) {
	return [ ...new Set(nowStr.split("")) ].join("");
}

for (var i = 0; i < args.length; i++)
	args[i] = ktaneNatoToLetter(args[i]);


if (args.length !== 4) {
	ktaneSpeak("I need four letters.");
	
	return;
}

if (uniqueString(args.join("")).length !== 4) {
	ktaneSpeak("I need four distinct letters.");
	
	return;
}

var wordsList = "JQXZ|QEW|AC|ZNY|TJL|OKBV|DFW|YKQ|LXE|GS|VSI|PQJS|VCN|JR|IRNM|OP|QYDX|HDU|PKD|ARGF".toLowerCase().split("|");
var letterCount = [];

for (var i = 0; i < wordsList.length; i++) {
	var countWord = "";
	
	for (var j = 0; j < wordsList[i].length; j++) {
		if (!except(args, countWord.split("")).includes(wordsList[i][j])) break;

		countWord += wordsList[i][j];
	}
	
	letterCount.push(countWord.length);
}

var mostMatches = [];

for (var i = 0; i < wordsList.length; i++) {
	if (letterCount[i] == Math.max( ...letterCount )) {
		mostMatches.push(wordsList[i]);
	}
}

mostMatches = mostMatches.sort();
var shownLetters = mostMatches[0].split("");
var restLetters = except(args, shownLetters).sort();

for (var i = 0; i < restLetters.length; i++)
	shownLetters.push(restLetters[i]);

ktaneSpeak(`Press letters ${shownLetters.map(x => ktaneLetterToNato(x)).join(" ")}.`);