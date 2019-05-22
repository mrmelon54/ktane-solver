if (args.length < 1) {
    ktaneSpeak("Not enough arguments.")
    return;
}

var display = args[0];
var offset = 0;
var offsetLock = false;

if (bombinfo.getPortsCount("parallel") > 0 && bombinfo.indicators.exists("nsa") && bombinfo.indicators.isLit("nsa")) {
    offsetLock = true;
    offset = 0;
}

if (!offsetLock) {
    var serialLetters = bombinfo.serialnumber.letters;
    for (var i = 0; i < serialLetters.length; i++) {
        var letter = serialLetters[i];
        if ("AEIOU".includes(letter.toUpperCase())) {
            offset -= 1;
            break;
        }
    }

    offset += bombinfo.batteries.all;
    
    var lastNumber = bombinfo.serialnumber.numbers[bombinfo.serialnumber.numbers.length - 1];
    if (lastNumber % 2 === 0) {
        offset += 1;
    }

    if (bombinfo.indicators.exists("car")) {
        offset += 1;
    }
}

var result = display.toLowerCase();

if (offset > 0) {
    result = caesar.cipher(offset, display);
}

ktaneSpeak("Press: " + result.split("").map(a => ktaneLetterToNato(a)).join(", "));