//$$ {"name":"Complicated Wires","vanilla":true,"alias":["complicated wires"],"help":"complicated wires <colour>"} $$

var colours=[];
var hasStar=false;
var hasLED=false;
for (var i = 0; i < args.length; i++) {
    if (['blue','red'].includes(args[i])) {
        colours.push(args[i])
    } else {
        ktaneSpeak(`Invalid colour`);
        return;
    }
    if (['star'].includes(args[i])) {
        hasStar=true;
    }
    if (['led'].includes(args[i])) {
        hasLED=true;
    }
}
var wireCount=t=>colours.filter(x=>x==t).length;
var checkComb=(a,t)=>a.split("/").includes(t);
if(colours.length<=2&&colours.length>=1&&wireCount("blue")<=1&&wireCount("red")<=1&&wireCount("white")<=1) {
    var str=wireCount("blue")==1?"1":"0"+wireCount("red")==1?"1":"0"+hasLED?"1":"0"+hasStar?"1":"0";
    var action=null;
    if(checkComb("0000/0001/0101",str))action="cut";
    else if(checkComb("0011/0110/0111",str))action=(bombinfo.batteries.d+bombinfo.batteries.aa>2)?"cut":"don't cut";
    else if(checkComb("1010/1011/1101",str))action=(bombinfo.ports.parallel>=1)?"cut":"don't cut";
    else if(checkComb("0100/1000/1100/1110",str))action=(bombinfo.serialnumber.numbers[bombinfo.serialnumber.numbers.length-1]%2==0)?"cut":"don't cut";
    else action="don't cut";
    ktaneSpeak(`${action} the wire`);
} else {
    ktaneSpeak(`Invalid wire colours`);
}
