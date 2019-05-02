var colours=[];
for (var i = 0; i < args.length; i++) {
    if (['blue', 'red', 'green', 'yellow'].includes(args[i])) {
        colours.push(args[i])
    } else {
        ktaneSpeak(`Invalid colour`);
        return;
    }
}
var convertor=null;
if(bombinfo.strikes==0&&(/^[aeiou]$/i.test(bombinfo.serialnumber.whole))){
    convertor={blue:"red",red:"blue",yellow:"green",green:"yellow"};
} else if(bombinfo.strikes==1&&(/^[aeiou]$/i.test(bombinfo.serialnumber.whole))){
    convertor={blue:"green",red:"yellow",yellow:"red",green:"blue"};
} else if(bombinfo.strikes==2&&(/^[aeiou]$/i.test(bombinfo.serialnumber.whole))){
    convertor={blue:"red",red:"green",yellow:"blue",green:"yellow"};
} else if(bombinfo.strikes==0&&!(/^[aeiou]$/i.test(bombinfo.serialnumber.whole))){
    convertor={blue:"yellow",red:"blue",yellow:"red",green:"green"};
} else if(bombinfo.strikes==1&&!(/^[aeiou]$/i.test(bombinfo.serialnumber.whole))){
    convertor={blue:"blue",red:"red",yellow:"green",green:"yellow"};
} else if(bombinfo.strikes==2&&!(/^[aeiou]$/i.test(bombinfo.serialnumber.whole))){
    convertor={blue:"green",red:"yellow",yellow:"red",green:"blue"};
}
if(convertor===null){
    ktaneSpeak("Too many strikes");
    return;
}
var o="Press ";
for(var i=0;i<colours.length;i++) {
    o+=convertor[colours[i]]+" ";
}
ktaneSpeak(o);
