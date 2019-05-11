args = replaceWords(args.join(", "), [ ":", "/", "for", "08", "150, 7-", "0, to," ], [ ", ", ", ", "4", ", 8", "157, ", "2, " ]).split(", ");

if (args.length !== 2 || args.some(x => ktaneWordToNumber(x) === null)) {
    ktaneSpeak("Two numbers are required");

    return;
}

args = args.map(x => ktaneWordToNumber(x));
ktaneSpeak(`Answer is ${args[0] % args[1]}`);