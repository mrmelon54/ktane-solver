console.log(args);
var mn=[];
if(args.length==1) {
    mn=args[0].split('').map(a=>parseInt(a));
}
var mnl=mn[mn.length-1];

var mod=bombinfo.moduleCount.total;
var mods=bombinfo.moduleCount.solved;
var bat=bombinfo.batteries.all;
var bath=bombinfo.batteries.holders;
var d=bombinfo.batteries.d;
var aa=bombinfo.batteries.aa;
var ind=bombinfo.indicators.getTotal();
var lit=bombinfo.indicators.getLit().length;
var unlit=bombinfo.indicators.getUnlit().length;
var port=bombinfo.getPortsCount();
var plate=bombinfo.portplates.length;

var fn=[];

// number 1
if(bat>port)fn.push(bath%2==0?9:1);
else fn.push(mnl%2==0?3:4);
// number 2
if(bombinfo.getPortsCount("ps2")>0)fn.push(bombinfo.serialnumber.letters.length>bombinfo.serialnumber.numbers.length?0:6);
else fn.push(bombinfo.indicators.isLit("bob")?5:2);
// number 3
if(mods%2==0)fn.push(mn[2]%2==0?8:4);
else fn.push(bombinfo.indicators.exists("rj45")?9:3);
// number 4
if(mn.reduce((a,b)=>a+b,0)%2==1)fn.push(plate>ind?7:3);
else fn.push(d>aa?7:2);
// number 5
if(mods>(bat*plate))fn.push(port%2==0?9:3);
else fn.push(port>ind?7:8);
// number 6
if(bombinfo.getPortsCount("parallel")>0)fn.push(bombinfo.getPortsCount("serial")>0?1:5);
else fn.push(bombinfo.indicators.isLit("frq")?0:4);
// number 7
if(bat>4)fn.push(unlit==0?2:6);
else fn.push(lit==0?4:9);
// number 8
if(bat=ind)fn.push(bombinfo.serialnumber.whole.split("").filter(a=>"BURG14R".includes(a)).length>0?1:0);
else fn.push(bombinfo.serialnumber.whole.split("").filter(a=>"AL53M".includes(a)).length>0?0:8);


fn=fn.map((a,i)=>(a+mn[i])%10);

ktaneSpeak("The code is: "+fn.join(', '));
