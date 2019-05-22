args.map(d => {
    if (!["first", "second", "third", "fourth", "fifth", "sixth"].includes(d)) e = true;
    return d;
})
var f = (a, n) => a.filter(b => b == n).length == 1;
if (e) {
    ktaneSpeak("an invalidnword was said");
    return;
}
if (args.length == 2 && f(args, "third") && (f(args, "fifth") || f(args, "sixth"))) {
    ktaneSpeak("Turn to the up position");
} else if (args.length == 1 && f(args, "fifth")) {
    ktaneSpeak("Turn to the left position");
} else if (args.length == 3 && f(args, "first") && f(args, "third") && f(args, "fifth")) {
    ktaneSpeak("Turn to the right position");
} else if (args.length == 2 && f(args, "first") && f(args, "third")) {
    ktaneSpeak("Turn to the right position");
} else if (args.length == 3 && f(args, "second") && f(args, "third") && f(args, "sixth")) {
    ktaneSpeak("Turn to the down position");
} else if (args.length == 0) {
    ktaneSpeak("Turn to the down position");
} else {
    ktaneSpeak("Invalid combination");
}
