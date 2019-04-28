//$$ {"name":"Keypad","vanilla":true,"alias":["keypad"],"help":"keypad <position numbers 1=TL 2=TR 3=BL 4=BR>"} $$

function unique(nowArr) {
    return [...new Set(nowArr)].length == nowArr.length;
}

var s = ("alpha tango/lightning/copyright/pumpkin/melting three/forward charlie/alien three/black star/railway tracks/alpha echo/november/omega/" +
    "tennis racket/lambda/kitty/hotel/backward charlie/euro/cursive alpha/empty star/question mark/double kilo/six/paragraph/" +
    "tango bravo/smiley/candle stick").split("/");
var img = ("13-at/12-squigglyn/1-copyright/8-pumpkin/15-meltedthree/22-rightc/19-dragon/2-filledstar/27-tracks/14-ae/18-nwithhat/6-omega/" +
    "28-balloon/30-upsidedowny/7-squidknife/9-hookn/23-leftc/16-euro/26-cursive/3-hollowstar/20-questionmark/5-doublek/11-six/21-paragraph/" +
    "31-bt/4-smileyface/24-pitchfork").split("/");
var cols = [
    [12, 0, 13, 1, 14, 15, 16],
    [17, 12, 16, 18, 19, 15, 20],
    [2, 3, 18, 21, 4, 13, 19],
    [22, 23, 24, 14, 21, 20, 25],
    [26, 25, 24, 5, 23, 6, 7],
    [22, 17, 8, 9, 26, 10, 11]
];

if (args[0] == "list") {
    var output = "";
    for (var i = 0; i < s.length; i++) {
        output += `<div style="height:64px;width:240px;"><img src="${assetsPath}${img[i]}.png" style="vertical-align:middle;"> = ${s[i]}</div>`;
    }
    displayElement.html('<div style="display:flex;flex-wrap:wrap;">' + output + '</div>');
} else {
    var t = args.join(" ");
    var symbolCount = 0;
    var symbolIds = [];
    for (var i = 0; i < s.length; i++) {
        if (t.includes(s[i])) {
            symbolIds.push(i);
            symbolCount++;
        } else {
            if(s[i]=="question mark"){
                if(t.includes("?")){
                    symbolIds.push(i);
                    symbolCount++;
                }
            }
        }
    }
    if (symbolCount == 4) {
        if (!unique(symbolIds)) {
            ktaneSpeak("The symbols must be unique");
            return;
        }
        var colId = -1;
        for (var i = 0; i < cols.length; i++) {
            var sOne = cols[i].includes(symbolIds[0]);
            var sTwo = cols[i].includes(symbolIds[1]);
            var sThree = cols[i].includes(symbolIds[2]);
            var sFour = cols[i].includes(symbolIds[3]);
            if (sOne && sTwo && sThree && sFour) {
                colId = i;
                break;
            }
        }
        if (colId == -1) {
            ktaneSpeak("No column found");
            return;
        }
        var symbolOrder = [];
        for (var i = 0; i < cols[colId].length; i++) {
            if (cols[colId][i] == symbolIds[0]) symbolOrder.push(symbolIds[0]);
            if (cols[colId][i] == symbolIds[1]) symbolOrder.push(symbolIds[1]);
            if (cols[colId][i] == symbolIds[2]) symbolOrder.push(symbolIds[2]);
            if (cols[colId][i] == symbolIds[3]) symbolOrder.push(symbolIds[3]);
        }
        var o = symbolOrder.map(d => s[d]).join(" then ");
        ktaneSpeak(`Press the button in this order: ${o}`);
    } else {
        ktaneSpeak("No the right amount of symbols");
    }
}

return;

var colours = [];
var hasStar = false;
var hasLED = false;
for (var i = 0; i < args.length; i++) {
    if (['blue', 'red'].includes(args[i])) {
        colours.push(args[i])
    } else {
        ktaneSpeak(`Invalid colour`);
        return;
    }
    if (['star'].includes(args[i])) {
        hasStar = true;
    }
    if (['led'].includes(args[i])) {
        hasLED = true;
    }
}
var wireCount = t => colours.filter(x => x == t).length;
var checkComb = (a, t) => a.split("/").includes(t);
if (colours.length <= 2 && colours.length >= 1 && wireCount("blue") <= 1 && wireCount("red") <= 1 && wireCount("white") <= 1) {
    var str = wireCount("blue") == 1 ? "1" : "0" + wireCount("red") == 1 ? "1" : "0" + hasLED ? "1" : "0" + hasStar ? "1" : "0";
    var action = null;
    if (checkComb("0000/0001/0101", str)) action = "cut";
    else if (checkComb("0011/0110/0111", str)) action = (bombinfo.batteries.d + bombinfo.batteries.aa > 2) ? "cut" : "don't cut";
    else if (checkComb("1010/1011/1101", str)) action = (bombinfo.ports.parallel >= 1) ? "cut" : "don't cut";
    else if (checkComb("0100/1000/1100/1110", str)) action = (bombinfo.serialnumber.numbers[bombinfo.serialnumber.numbers.length - 1] % 2 == 0) ? "cut" : "don't cut";
    else action = "don't cut";
    ktaneSpeak(`${action} the wire`);
} else {
    ktaneSpeak(`Invalid wire colours`);
}
