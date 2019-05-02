if (args.length != 3) {
	ktaneSpeak("Not enough information");

	return;
}

args[1] = replaceWords(args[1], [ "cierra", "sierra", "syrup", "serie", "to", "for" ], [ "0", "0", "0", "0", "2", "4" ]);
args[2] = replaceWords(args[2], [ "know" ], [ "no" ]);

if (args[1].length > 1) {
	args[1] = ktaneWordToNumber(args[1]);

	if (args[1] === null || isNaN(args[1])) {
		ktaneSpeak("Invalid amount");

		return;
	}
}

var hasRY = (args[0] == "yes");
var fxfAmount = parseInt(args[1]);
var hasSquare = (args[2] == "yes");
var serialChars = bombinfo.serialnumber.whole.split("").filter((x, y) => y % 2 == 0);

for (var i = 0; i < serialChars.length; i++) {
	if (!isNaN(serialChars[i])) {
		serialChars[i] = parseInt(serialChars[i]);
	} else {
		serialChars[i] = serialChars[i].charCodeAt(0) - 65;
	}
}

if (hasRY) serialChars = serialChars.map(x => x + bombinfo.batteries.all);
if (fxfAmount > 0) serialChars = serialChars.map(x => Math.abs(x - Math.abs(fxfAmount - bombinfo.ports.all)));
if (hasSquare) serialChars = serialChars.map(x => x * (bombinfo.batteries.holders + bombinfo.portplates.length));

serialChars = serialChars.map(x => x % 10);

while (serialChars[0] == serialChars[1] || serialChars[0] == serialChars[2])
	serialChars[0] = (serialChars[0] + 1) % 10;

while (serialChars[1] == serialChars[0] || serialChars[1] == serialChars[2])
	serialChars[1] = (serialChars[1] + 9) % 10;

ktaneSpeak(`Press buttons ${serialChars.map(x => x + 1).join(", ")}`);
