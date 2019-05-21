var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function stringToAlphabetPos(text) { 
    return text.toUpperCase().split("").map(a => { 
        if (!isNaN(parseInt(a))) { 
            if (a == "0") {
                return "";
            }
            return parseInt(a); 
        }
        return alphabet.indexOf(a) + 1; 
    }); 
}
function alphabetPosToString(posArray, followMin, followMax) {
    var result = "";
    for (var i = 0; i < posArray.length; i++) {
        var number = posArray[i];
        if (isNaN(parseInt(number))) {
            result += number;
            continue;
        }
        var nextNumber = posArray[i + 1];
        var both = parseInt("" + number + nextNumber);

        if (both >= followMin && both <= followMax) {
            result += alphabet[both - 1];
            i++; // skip next number
        } else {
            if (number == 0) {
                result += "";
            } else {
                if (number % 27 == 0) {
                    result += "BG"; // some weird behaviour I encounted
                } else {
                    number = (number - 1) % 27 + 1
                    result += alphabet[number - 1];
                }
            }
        }
    }
    return result;
}
function isPrime(number) {
    for (var i = 2; i < number; i++)
        if (number % i === 0) return false;
    return number > 1;
}
//ktaneSpeak(playfair.decrypt("JUSTTEST", "BCDLMRRY").split("").map(a=>ktaneLetterToNato(a)).join(" "));;

//console.log(alphabetPosToString([1, 5, 2, 7, 2, 5], 10, 26));

if (args.length === 1 && args[0] == "") {
    args.shift();
}

if (args.length < 1) {
    ktaneSpeak("At least one argument is required.");
    return;
}

var previousSolution = globalStorage.get("solution");
var solutionStep = globalStorage.get("solutionStep");

var cmd = args[0].toLowerCase();

if (previousSolution && (cmd == "next" || cmd == "repeat")) {
    if (previousSolution.length > 0) {
        if (cmd == "next") {
            solutionStep++;
            globalStorage.set("solutionStep", solutionStep);
            ktaneSpeak(previousSolution[solutionStep]);
            return;
        } else {
            if (args.length > 1) {
                var step = parseInt(args[1]);
                if (!isNaN(step)) {
                    if (step > previousSolution.length || step < 1) {
                        ktaneSpeak("Invalid step.");
                        return;
                    }
                    ktaneSpeak(previousSolution[step - 1]);
                    return;
                } else {
                    ktaneSpeak(previousSolution[solutionStep]);
                    return;
                }
            } else {
                ktaneSpeak(previousSolution[solutionStep]);
                return;
            }
        }
    } else {
        ktaneSpeak("No solution is currently saved.");
        return;
    }

    return;
}

if (cmd == "next" || cmd == "repeat") {
    ktaneSpeak("No solution is currently saved.");
    return;
}

if (args.length < 3)  {
    ktaneSpeak("At least three arguments required to solve.");
    return;
}

var moduleId = parseInt(args[0]);
var strikes = parseInt(args[1]);
var data = args[2].replace(/[^a-z]/gi, "").replace(/[i]/gi, "I").toUpperCase();

if (isNaN(moduleId)) {
    ktaneSpeak("Invalid module id.");
    return;
}

if (isNaN(strikes)) {
    ktaneSpeak("Invalid strike count.");
    return;
}

if (args.length > 3) {
    var args2 = args;
    args2.splice(0, 2);

    data = "";

    args2.forEach((val) => {
        var ltr = ktaneNatoToLetter(val.toLowerCase());
        if (ltr) {
            data += ltr.toUpperCase();
        }
    });
}

var serialToNum = stringToAlphabetPos(bombinfo.serialnumber.whole);
if (serialToNum[0] >= 20) serialToNum.shift();

var vowels = "AEIOU".split("");
var serial = bombinfo.serialnumber.whole;
if(vowels.includes(serial[3]) || vowels.includes(serial[4])) {
    serialToNum.pop();
}

var serialHex = parseInt(serialToNum.join("")).toString(16).toUpperCase().split("");

var keyA = alphabetPosToString(serialHex, 10, 26);

keyA += alphabetPosToString([moduleId, bombinfo.portplates.length, bombinfo.batteries.holders], 99, 99);
console.log("UNFAIR CIPHER | Key A: " + keyA);

// note, starts on Sunday due to 0 being sunday on js datesss
var keyBData = [["ABDG","FEBH","DBHI","BLA","DBIB","AFEC","AFCD","CQE","DEAF","FET","EFBA","DEDB"],["ABDA","FEV","DBHC","BLD","DBIE","AFEF","AFCG","CQH","DEAI","FEAA","EFAB","DECC"],["ABDB","FEW","DBHD","BLE","DBIF","AFEG","AFCH","CQI","DEAA","FEAB","EFAC","DECD"],["ABDC","FEX","DBHE","BLF","DBIG","AFEH","AFCI","CQA","DEAB","FEAC","EFAD","DECE"],["ABDD","FEY","DBHF","BLG","DBIH","AFEI","AFCA","CQB","DEAC","FEAD","EFAE","DECF"],["ABDE","FEZ","DBHG","BLH","DBII","AFEA","AFCB","CQC","DEAD","FEAE","EFAF","DED"],["ABDF","FEBG","DBHH","BLI","DBIA","AFEB","AFCC","CQD","DEAE","FEAF","EFB","DEDA"]];

var date = new Date();
var keyB = keyBData[date.getDay()][date.getMonth()];
console.log("UNFAIR CIPHER | Key B: " + keyB);

var keyC = playfair.encrypt(keyB, keyA);
console.log("UNFAIR CIPHER | Key C: " + keyC);

var caesarOffset = 0;
var typesAdded = [];


bombinfo.portplates.forEach((plate) => {
    plate.getNames().split(", ").forEach((port) => {
        if (!typesAdded.includes(port) && port != "Empty") {
            caesarOffset -= 2;
            typesAdded.push(port);
        }
    });
});

caesarOffset += bombinfo.portplates.length;

bombinfo.serialnumber.letters.forEach((letter) => {
    if (vowels.includes(letter.toUpperCase())) {
        caesarOffset -= 2;
    } else {
        caesarOffset += 1;
    }
});

bombinfo.indicators.getLit().forEach((isLit) => {
    if (isLit) {
        caesarOffset += 2;
    }
})

bombinfo.indicators.getUnlit().forEach((isUnlit) => {
    if (isUnlit) {
        caesarOffset -= 2;
    }
});

caesarOffset -= bombinfo.batteries.all;

if (bombinfo.batteries.all == 0) {
    caesarOffset += 10;
}
if (bombinfo.getPortsCount() == 0) {
    caesarOffset *= 2;
}
if (bombinfo.moduleCount.total >= 31) {
    caesarOffset = Math.floor(caesarOffset/2);
}

caesarOffset = -caesarOffset;

var shiftedData = caesar.cipher(caesarOffset, data).toUpperCase();
console.log("UNFAIR CIPHER | Caesar Result: " + shiftedData + " from " + data + " with offset " + caesarOffset);

var playfair1 = playfair.decrypt(keyC, shiftedData);
console.log("UNFAIR CIPHER | First Playfair Result: " + playfair1 + " from " + shiftedData + " with key " + keyC);
var finalData = playfair.decrypt(keyA, playfair1);

console.log("UNFAIR CIPHER | Final Data: " + finalData + " from " + playfair1 + " with key " + keyA);

unfairCipherSolution = [];
unfairCipherSolutionStep = 0;

var finalSplit = finalData.match(/.{1,3}/g);
var colorPressCount = 0;
var lastInput = "Press Inner Center."; //slight bodge
var inputFinished = false;

function addToSol(txt) {
    unfairCipherSolution.push(txt);
    lastInput = txt;
}

console.log(finalSplit);
finalSplit.forEach((command, index, array) => {
    if (inputFinished) return;

    switch (command) {
        case "PCR":
            colorPressCount++;
            addToSol("Press the Red button.");
            break;

        case "PCG":
            colorPressCount++;
            addToSol("Press the Green button.");
            break;

        case "PCB":
            colorPressCount++;
            addToSol("Press the Blue button");
            break;

        case "SUB":
            addToSol("Press Outer Center when the seconds digits match.");
            break;

        case "MIT":
            var digit = (moduleId + colorPressCount + (index + 1)) % 10;
            addToSol("Press Inner Center when the last digit on the timer is a " + digit);
            break;

        case "PRN":
            if (isPrime((moduleId % 20))) {
                addToSol("Press Inner Center.");
            } else {
                addToSol("Press Outer Center.");
            }
            break;

        case "CHK":
            if (isPrime((moduleId % 20))) {
                addToSol("Press Outer Center.");
            } else {
                addToSol("Press Inner Center.");
            }
            break;

        case "BOB":
            if (bombinfo.indicators.exists("bob") && bombinfo.indicators.getLit().length === 1 && bombinfo.indicators.isLit("bob") && bombinfo.batteries.all === 2) {
                addToSol("Press Inner Center. This will instantly solve the module.");
                inputFinished = true;
            } else {
                addToSol("Press Inner Center.");
            }
            break;

        case "REP":
        case "EAT":
            addToSol(lastInput);
            break;

        case "STR":
        case "IKE":
            var btnIndex = strikes % 3;
            colorPressCount++;
            if (btnIndex === 0) {
                addToSol("Press the Red button.");
            } else if (btnIndex === 1) {
                addToSol("Press the Green button.");
            } else {
                addToSol("Press the Blue button.");
            }
            break;

        default:
            unfairCipherSolution = [];
            unfairCipherSolutionStep = 0;
            ktaneSpeak("I couldn't process the command '" + command + "'. Double check your arguments.");
            inputFinished = true;
            return;
            
    }
    
});

if (unfairCipherSolution.length > 0) {
    ktaneSpeak(unfairCipherSolution[0]);
}

globalStorage.set("solution", unfairCipherSolution);
globalStorage.set("solutionStep", 0);