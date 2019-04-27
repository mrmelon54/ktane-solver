//$$ {"name":"Wires","vanilla":true,"alias":["wires","simple wires"],"help":"wires <list of colours>"]} $$

var colours=[];
for (var i = 0; i < args.length; i++) {
    if (['blue','white','yellow','red','black'].includes(args[i])) {
        colours.push(args[i])
    } else {
        ktaneSpeak(`Invalid colour`);
        return;
    }
}
if(colours.length<3||colours.length>6){
    ktaneSpeak(`Invalid number of wires`);
    return;
}
var lastWire=colours[colours.length-1];
var wireCount=t=>colours.filter(x=>x==t).length;
var lastDigitOfSN=bombinfo.serialnumber.numbers[bombinfo.serialnumber.numbers.length-1];
var cutWire=null;
if(colours.length==3){
    if(!colours.includes('red'))cutWire="second";
    else if(lastWire=="white")cutWire="last";
    else if(wireCount("blue")>1)cutWire="last blue";
    else cutWire="last";
} else if(colours.length==4) {
    if(wireCount("red")>1&&lastDigitOfSN%2==1)cutWire="last red";
    else if(lastWire=="yellow"&&wireCount("red")==0)cutWire="first";
    else if(wireCount("blue")==1)cutWire="first";
    else if(wireCount("yellow")>1)cutWire="last";
    else cutWire="second";
} else if(colours.length==5) {
    if(lastWire=="black"&&lastDigitOfSN%2==1)cutWire="fourth";
    else if(wireCount("red")==1&&wireCount("yellow")>1)cutWire="first";
    else if(wireCount("black")==0)cutWire="second";
    else cutWire="first";
} else if(colours.length==6) {
    if(wireCount("yellow")==0&&lastDigitOfSN%2==1)cutWire="third";
    else if(wireCount("yellow")==1&&wireCount("white")>1)cutWire="fourth";
    else if(wireCount("red"))cutWire="last";
    else cutWire="fourth";
}
if(cutWire==null){
    ktaneSpeak(`Error following rules`);
    return;
} else {
    ktaneSpeak(`Cut the ${cutWire} wire`);
}
