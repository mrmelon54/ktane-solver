if(args.length<2){
    ktaneSpeak("Tell me more");
    return;
}
var speechHelp={
    c:"charlie",
    cee:"see, starting with charlie",
    lead:"lead, L E A D",
    led:"L E D",
    leed:"leed, L E E D",
    read:"read, a book",
    red:"red, a colour",
    reed:"reed, sugar cane",
    see:"see, starting with sierra",
    their:"their, possession",
    there:"there, location",
    "they are":"they are, two words",
    "they're":"they're apostrophe",
    ur:"U R, letters",
    you:"you, word",
    "you are":"you are, two words",
    "you're":"you're, apostrophe",
    your:"your, possession",
    u:"uniform",
    "uh huh":"uh huh, positive",
    "uh uh":"uh uh, negative",
    uhhh:"uhhh, 3 hotels",
    what:"what, no question mark",
    "what?":"what, question mark",
}
if(args[0]==="screen"){
    args.shift();
    if (args.length === 1) args = args[0].split("");
    for (var i = 0; i < args.length; i++) args[i] = (args[i].length > 1) ? ktaneNatoToLetter(args[i]) : args[i];
    var word = "";
    args.map(d=>word+=d);
    var table={
        empty:'bl',
        blank:'mr',
        yes:'ml',
        first:'tr',
        display:'br',
        okay:'tr',
        says:'br',
        nothing:'ml',
        no:'br',
        led:'ml',
        lead:'br',
        read:'mr',
        red:'mr',
        reed:'bl',
        leed:'bl',
        holdon:'br',
        you:'mr',
        youare:'br',
        your:'mr',
        youre:'mr',
        ur:'tl',
        there:'br',
        theyre:'bl',
        their:'mr',
        theyare:'ml',
        see:'br',
        c:'tr',
        cee:'br'
    };
    word=word.replace('you are','youare').replace('you\'re','youre').replace('they\'re','theyre').replace('they are','theyare').replace('hold on','holdon');
    if(table[word]===undefined){
        ktaneSpeak(`Tell me the actual word`);
        return;
    }
    var longPositionNames={t:"top",m:"middle",b:"bottom",r:"right",l:"left"};
    var t=table[word].split("").map(d=>longPositionNames[d]).join(" ");
    ktaneSpeak(`Use the ${t} button`);
} else if(args[0]==="button"){
    args.shift();
    if (args.length === 1) args = args[0].split("");
    for (var i = 0; i < args.length; i++) args[i] = (args[i].length > 1) ? ktaneNatoToLetter(args[i]) : args[i];
    var word = "";
    args.map(d=>word+=d);
    var table={
        blank:"wait/right/okay/middle/blank",
        done:"sure/uh huh/next/what?/your/ur/you're/hold/like/you/u/you are/uh uh/done",
        first:"left/okay/yes/middle/no/right/nothing/uhhh/wait/ready/blank/what/press/first",
        hold:"you are/u/done/uh uh/you/ur/sure/what?/you're/next/hold",
        left:"right/left",
        like:"you're/next/u/ur/hold/done/uh uh/what?/uh huh/you/like",
        middle:"blank/ready/okay/what/nothing/press/no/wait/left/middle",
        next:"what?/uh huh/uh uh/your/hold/sure/next",
        no:"blank/uhhh/wait/first/what/ready/right/yes/nothing/left/press/okay/no",
        nothing:"uhhh/right/okay/middle/yes/blank/no/press/left/what/wait/first/nothing",
        okay:"middle/no/first/yes/uhhh/nothing/wait/okay",
        press:"right/middle/yes/ready/press",
        ready:"yes/okay/what/middle/left/press/right/blank/ready",
        right:"yes/nothing/ready/press/no/wait/what/right",
        sure:"you are/done/like/you're/you/hold/uh huh/ur/sure",
        u:"uh huh/sure/next/what?/you're/ur/uh uh/done/u",
        "uhhuh":"uh huh",
        "uhuh":"ur/u/you are/you're/next/uh uh",
        uhhh:"ready/nothing/left/what/okay/yes/right/no/press/blank/uhhh",
        ur:"done/u/ur",
        wait:"uhhh/no/blank/okay/yes/left/first/press/what/wait",
        what:"uhhh/what",
        "what?":"you/hold/you're/your/u/done/uh uh/like/you are/uh huh/ur/next/what?",
        yes:"okay/right/uhhh/middle/first/what/press/ready/nothing/yes",
        "youare":"your/next/like/uh huh/what?/done/uh uh/hold/you/u/you're/sure/ur/you are",
        you:"sure/you are/your/you're/next/uh huh/ur/hold/what?/you",
        your:"uh uh/you are/uh huh/your",
        "youre":"you/you're"
    };
    word=word.replace('you are','youare').replace('you\'re','youre').replace('uh huh','uhhuh').replace('uh uh','uhuh').replace('what question mark','what?').replace('what no question mark','what');
    if(table[word]===undefined){
        ktaneSpeak(`Tell me the actual word`);
        return;
    }
    var ws=table[word].split("/");
    for(var i=0;i<ws.length;i++){
        if(speechHelp[ws[i]]===undefined){
            ktaneSpeak(ws[i]);
        } else {
            ktaneSpeak(speechHelp[ws[i]]);
        }
    }
}
