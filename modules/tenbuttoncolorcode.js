if (args.length !== 11) {
    ktaneSpeak("You need to give me the current stage and the colors");
    return;
}

args = replaceWords(args.join("|"), [ "to" ], [ "2" ]).split("|");

if (args[0].length > 1) args[0] = ktaneWordToNumber(args[0]);

if (![ "1", "2" ].includes(args[0])) {
    ktaneSpeak("Not a valid stage");
    return;
}

var stage = args[0];
args = args.slice(1, 11).map(x => x[0]);
var colorInitials = [ "r", "g", "b" ];

if (args.some(x => !colorInitials.includes(x))) {
    ktaneSpeak("Colors are not valid");
    return;
}

var colors = args.map(x => colorInitials.indexOf(x));
var colorNames = [ "red", "green", "blue" ];
var lastDigit = bombinfo.serialnumber.numbers[bombinfo.serialnumber.numbers.length - 1];
var initRules = (stage == "1") ? lastDigit : bombinfo.serialnumber.numbers.reduce((a, b) => a + b, 0) % 10;

for (var i = 0; i < 11; i++) {
    if (stage == "1") {
        getRules((initRules + i) % 10);
    } else {
        getRules((initRules + ((10 - i) % 10)) % 10);
    }
}

ktaneSpeak(`The answer is ${colors.map(x => colorNames[x]).join(". ")}`);

function ruleList(index, color) {
    switch (index) {
        case 0: return colors[color] == colors[color + 1];
        case 1: return colors[color] == colors[color + 5];
        case 2: return (colors[color] == colors[color + 1] && colors[color + 1] == colors[color + 2]);
        case 3: return (colors[color] == colors[color + 1] && colors[color + 1] == colors[color + 5] && colors[color + 5] == colors[color + 6]);
    }
}

function getRules(rule) {
    var topRow = colors.slice(0, 5);
    var bottomRow = colors.slice(5, 10);

    switch (rule) {
        case 0:
            var getInit = initRules;
            getInit = (getInit == 0) ? 9 : getInit - 1;

            for (var i = 0; i < 10; i++) {
                if (i != getInit) {
                    setColor(i, 1);
                }
            }
            break;

        case 1:
            for (var i = 0; i < 8; i++) {
                var nowCheck = i + ((i > 3) ? 1 : 0);

                if (ruleList(0, nowCheck)) {
                    colors[nowCheck + 1] = (colors[nowCheck + 1] == 0) ? 1 : 0;
                    i = (i <= 3) ? 3 : 7;
                }
            }
            break;

        case 2:
            var pressed = 1;

            for (var i = 0; i < 3; i++) {
                if (topRow.filter(x => x == i).length >= 3) {
                    for (var j = 0; j < 5; j++) {
                        if (colors[j] == i)
                            setColor(j, pressed++);

                        if (pressed > 2) break;
                    }

                    break;
                }
            }
            break;

        case 3:
            var tempCols = [ colors[3], colors[8], colors[4], colors[9], colors[6] ];
            var switchCols = [
                [ 3, 8, 0, 5, 4, 9, 2, 7, 6, 1 ],
                [ 0, 5, -1, -1, 2, 7, -1, -1, 1, -1 ]
            ];

            var tempCount = 0;

            for (var i = 0; i < 10; i++)
                colors[switchCols[0][i]] = (switchCols[1][i] == -1) ? tempCols[tempCount++] : colors[switchCols[1][i]];
            break;

        case 4:
            for (var i = 0; i < 3; i++) {
                if (topRow.every(x => x == i)) {
                    for (var j = 0; j < 3; j++) {
                        setColor(j + j, 1);
                    }
                }

                if (bottomRow.every(x => x == i)) {
                    for (var j = 0; j < 3; j++) {
                        setColor(5 + (j + j), 1);
                    }
                }
            }
            break;

        case 5:
            for (var i = 0; i < 5; i++) {
                if (ruleList(1, i)) {
                    colors[i] = 2;
                    colors[i + 5] = 1 - (lastDigit % 2);
                }
            }
            break;

        case 6:
            if (!colors.includes(0)) {
                var setColors = [ 1, 5, 8 ];

                for (var i = 0; i < 3; i++)
                    colors[setColors[i]] = 0;
            }
            break;

        case 7:
            var greenCount = 0;

            if (colors.filter(x => x == 1).length > 5) {
                for (var i = 0; i < 10; i++) {
                    if (colors[i] == 1) {
                        greenCount++;

                        if (greenCount == 8) {
                            colors[i] = 2;
                        } else if (greenCount == 1 || greenCount == 3 || greenCount == 4) {
                            setColor(i, [ 2, 0, 1, 2 ][greenCount - 1]);
                        }
                    }
                }
            }
            break;

        case 8:
            for (var i = 0; i < 6; i++) {
                var nowCheck = i + ((i > 2) ? 2 : 0);

                if (ruleList(2, nowCheck)) {
                    setColor(nowCheck + 1, 1);
                    i = (i <= 2) ? 2 : 5;
                }
            }
            break;

        case 9:
            for (var i = 0; i < 4; i++) {
                if (ruleList(3, i)) {
                    setColor(i, 2);
                    setColor(i + 6, 2);

                    break;
                }
            }
            break;
    }
}

function setColor(nowSol, quanSol) {
    colors[nowSol] += quanSol;
    colors[nowSol] %= 3;
}
