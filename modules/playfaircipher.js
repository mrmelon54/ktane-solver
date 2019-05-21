function isPrime(number) {
    for (var i = 2; i < number; i++)
        if (number % i === 0) return false;
    return number > 1;
}

if (args.length < 2) {
    ktaneSpeak("At least two arguments are required.");
    return;
}

if (args[0].toLowerCase() === "cipher") {
    args.shift();
}

var colours = {
    magenta: "magenta",
    blue: "blue",
    orange: "orange",
    yellow: "yellow"
}

console.log(args);

var colour = colours.magenta;
var display = args[1];

switch (args[0]) {
    case "magenta":
        colour = colours.magenta;
        break;
    case "blue":
        colour = colours.blue;
        break;
    case "orange":
        colour = colours.orange;
        break;
    case "yellow":
        colour = colours.yellow;
        break;
    default:
        ktaneSpeak("Invalid display colour.")
        return;
}

if (args.length > 2) {
    display = "";
    args.forEach((value, index, arr) => {
        if (index > 0) {
            let nato = ktaneNatoToLetter(value);
            display += (nato ? nato : value);
        }
    });
}

var date = new Date();
var keyA = "";
var keyB = "";
var keyC = "";

// bombinfo.indicators.exists( <name> ); // returns boolean equivalent to is lit or unlit
// bombinfo.indicators.isLit( <name> ); // returns boolean
if (bombinfo.indicators.exists("bob") && bombinfo.indicators.isLit("bob")) {
    switch(date.getDay()) {
        case 0:
            keyA = "BECOZY";
            break;
        case 1:
        case 2:
            keyA = "HIDDEN";
            break;
        case 3:
        case 4:
            keyA = "CIPHER";
            break;
        case 5:
        case 6:
            keyA = "PARTYHARD";
            break;
    }
} else {
    switch(date.getDay()) {
        case 0:
            keyA = "BECOZY";
            break;
        case 1:
            keyA = "PLAY";
            break;
        case 2:
            keyA = "HIDDEN";
            break;
        case 3:
            keyA = "SECRET";
            break;
        case 4:
            keyA = "CIPHER";
            break;
        case 5:
            keyA = "FAIL";
            break;
        case 6:
            keyA = "PARTYHARD";
            break;
    }
}

// part 2
if (bombinfo.getPortsCount("serial") > 0 && bombinfo.getPortsCount("parallel") > 0) {
    switch(colour) {
        case colours.magenta:
            keyB = "SAFE";
            break;
        case colours.blue:
            keyB = "EFAS";
            break;
        case colours.orange:
            keyB = "MESSAGE";
            break;
        case colours.yellow:
            keyB = "GROOVE";
            break;
    }
} else if (bombinfo.serialnumber.numbers.reduce((a, b) => a + b, 0) > 10) {
    switch(colour) {
        case colours.magenta:
            keyB = "CODE";
            break;
        case colours.blue:
            keyB = "EDOC";
            break;
        case colours.orange:
            keyB = "QUIET";
            break;
        case colours.yellow:
            keyB = "ETIUQ";
            break;
    }
} else if (bombinfo.batteries.d > bombinfo.batteries.aa) {
    switch(colour) {
        case colours.magenta:
            keyB = "GROOVE";
            break;
        case colours.blue:
            keyB = "EVOORG";
            break;
        case colours.orange:
            keyB = "TEIUQ";
            break;
        case colours.yellow:
            keyB = "QUITE";
            break;
    }
} else {
    switch(colour) {
        case colours.magenta:
            keyB = "MESSAGE";
            break;
        case colours.blue:
            keyB = "EGASSEM";
            break;
        case colours.orange:
            keyB = "SAFE";
            break;
        case colours.yellow:
            keyB = "EDOC";
            break;
    }
}

var serialLetters = bombinfo.serialnumber.letters;
var hasVowel = false;
console.log(serialLetters);
console.log(serialLetters.length);
for (var i = 0; i < serialLetters.length; i++) {
    console.log(i);
    var letter = serialLetters[i];
    console.log(letter);
    if ("AEIOU".includes(letter.toUpperCase())) {
        console.log("has vowel");
        hasVowel = true;
        break;
    }
}

if (!hasVowel) {
    console.log("Swapping " + keyA + " and " + keyB);
    var keyTemp = keyA;
    keyA = keyB;
    keyB = keyTemp;
    console.log("New Key: " + keyA + keyB);
}

if (bombinfo.strikes === 1) {
    keyC = "ONE";
} else if (bombinfo.strikes === 2) {
    keyC = "TWO";
} else if (bombinfo.strikes > 2) {
    keyC = "MANY";
}

var playfairKey = keyA + keyB + keyC;

if (isPrime(bombinfo.serialnumber.numbers.reduce((a, b) => a + b, 0))) {
    playfairKey = playfairKey.split("").reverse().join("");
}

console.log(playfairKey, display);
var result = playfair.decrypt(playfairKey, display.toUpperCase());
var order = "";

switch (result.toUpperCase()) {
    case "STRIKE":
        if (colour === colours.magenta) order = "ABCD";
        else if (colour === colours.blue) order = "CDAB";
        else if (colour === colours.orange) order = "BADC";
        else order = "DABC";
        break;
    case "STRIK":
        if (colour === colours.magenta) order = "BCDA";
        else if (colour === colours.blue) order = "DACB";
        else if (colour === colours.orange) order = "ADCB";
        else order = "ABCD";
        break;
    case "STRYKE":
        if (colour === colours.magenta) order = "CDAB";
        else if (colour === colours.blue) order = "ACBD";
        else if (colour === colours.orange) order = "DCBA";
        else order = "BCDA";
        break;
    case "STRYK":
        if (colour === colours.magenta) order = "DABC";
        else if (colour === colours.blue) order = "CBDA";
        else if (colour === colours.orange) order = "CBAD";
        else order = "CDAB";
        break;
    case "ZTRIKE":
        if (colour === colours.magenta) order = "ABDC";
        else if (colour === colours.blue) order = "BDAC";
        else if (colour === colours.orange) order = "BACD";
        else order = "DACB";
        break;
    case "ZTRIK":
        if (colour === colours.magenta) order = "BDCA";
        else if (colour === colours.blue) order = "DBCA";
        else if (colour === colours.orange) order = "ACDB";
        else order = "ACBD";
        break;
    case "ZTRYKE":
        if (colour === colours.magenta) order = "CABD";
        else if (colour === colours.blue) order = "BCAD";
        else if (colour === colours.orange) order = "CDBA";
        else order = "CBDA";
        break;
    case "ZTRYK":
        if (colour === colours.magenta) order = "DCAB";
        else if (colour === colours.blue) order = "CADB";
        else if (colour === colours.orange) order = "DBAC";
        else order = "BDAC";
        break;
    default:
        ktaneSpeak("I couldn't process the result '" + result + "', double check your arguments.");
        return;
}

if (order.length > 0) {
    ktaneSpeak("Press: " + order);
}