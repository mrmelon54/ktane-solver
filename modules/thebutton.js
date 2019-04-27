ktaneModuleCommandInterface.theButton=(bombinfo,args)=>{
    if(args.length!==2)return;
    var colour='',word='';
    for(var i=0;i<args.length;i++) {
        if(['blue','red','white','yellow'].includes(args[i]))colour=args[i];
        if(['abort','detonate','hold','press'].includes(args[i]))word=args[i];
    }
    if(colour==="")return;
    if(args.includes('strip')) {
        var t='one';
        if(colour=='blue')t='four';
        else if(colour=='yellow')t='five';
        ktaneSpeak(`Release on a ${t}`);
        return;
    }
    if(word==="")return;

    var a='';
    if(colour=='blue'&&word=='abort')a='hold';
    else if(bombinfo.batteries.total>1&&word=='detonate')a='press';
    else if(colour=='white'&&bombinfo.indicators.exists('car'))a='hold';
    else if(bombinfo.batteries.total>2&&bombinfo.indicators.isLit('frk'))a='press';
    else if(colour=='yellow')a='hold';
    else if(colour=='red'&&word='hold')a='press';
    else a='hold';
    ktaneSpeak(`${a=='hold'?'Hold':'Press'} the button`);
}
