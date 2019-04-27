function KtaneSolver() {
    this.moduleList = ktaneModuleCommandInterface;
    this.bombinfo = new KtaneBombInfo();
    this.runCommand = (t) => {
        t = t.toLowerCase();
        t = t.trim();
        var cmd = "";
        var action = null;
        if(t.indexOf("batteries")==0) {
            try {
                this.bombinfo.batteries.d=parseInt(t.split(" ")[1]);
                this.bombinfo.batteries.aa=parseInt(t.split(" ")[2]);
            } catch(e) {
                ktaneSpeak(`Invalid number of batteries`);
            }
            return;
        } else if(t.indexOf("lit indicator")==0) {
            var s=t.split(" ");
            this.bombinfo.indicatorList.push("*"+this.toLetter(s[2])+this.toLetter(s[3])+this.toLetter(s[4]));
            return;
        } else if(t.indexOf("unlit indicator")==0) {
            var s=t.split(" ");
            this.bombinfo.indicatorList.push(" "+this.toLetter(s[2])+this.toLetter(s[3])+this.toLetter(s[4]));
            return;
        } else if(t.indexOf("remove indicator")==0) {
            if(this.bombinfo.indicatorList.length==0)return;
            this.bombinfo.indicatorList.splice(this.bombinfo.indicatorList.length-1,1);
            return;
        } else if(t.indexOf("serial number")==0) {
            var s=t.split(" ");
            this.bombinfo.serialnumber={whole:"",letters:[],numbers:[]};
            for(var i=0;i<6;i++) {
                if("0123456789".split("").includes(s[i+1])) {
                    this.bombinfo.serialnumber.whole+=s[i+2];
                    this.bombinfo.serialnumber.numbers.push(parseInt(s[i+2]));
                } else {
                    this.bombinfo.serialnumber.whole+=this.toLetter(s[i+2]);
                    this.bombinfo.serialnumber.letters.push(this.toLetter(s[i+2]));
                }
            }
            return;
        } else if(t.indexOf("port")==0) {
            var s=t.split(" ");
            var p={parallel:false,dvid:false,stereorca:false,ps2:false,rj45:false,serial:false};
            if(s.includes("parallel"))p.parallel=true;
            if(s.includes("dvid"))p.dvid=true;
            if(s.includes("stereo"))p.stereo=true;
            if(s.includes("ps2"))p.ps2=true;
            if(s.includes("rj45"))p.rj45=true;
            if(s.includes("serial")||s.includes("cereal"))p.serial=true;
            this.bombinfo.portplates.push(p);
            this.bombinfo.recalculatePorts();
        }
        if(cmd=="") {
            for (var i = 0; i < Object.keys(this.moduleList).length; i++) {
                for (var j = 0; j < this.moduleList[Object.keys(this.moduleList)[i]].alias.length; j++) {
                    if (t.indexOf(this.moduleList[Object.keys(this.moduleList)[i]].alias[j]) == 0) {
                        cmd = this.moduleList[Object.keys(this.moduleList)[i]].alias[j];
                        action = this.moduleList[Object.keys(this.moduleList)[i]].script;
                        break;
                    }
                }
            }
        }
        if (cmd == "") {
            ktaneSpeak(`Invalid command`);
            return;
        }
        var s = t.split(cmd + " ");
        s.splice(0, 1);
        var a = s.join("");
        action(this.bombinfo, a.split(" "));
    }
    this.toLetter=(t)=>{
        t=t.replace('ciara','sierra');
        return t[0];
    }
}

function KtaneBombInfo() {
    this.serialnumber = {
        whole:"",
        letters:[],
        numbers:[]
    };
    this.batteries = {
        d: 0,
        aa: 0
    };
    this.indicatorList = [];
    this.indicators = {
        exists: (t) => {
            return this.indicatorList.includes("*" + t) || this.indicatorList.includes(" " + t);
        },
        isLit: (t) => {
            return this.indicatorList.includes("*" + t) || this.indicatorList.includes(" " + t);
        },
        isUnlit: (t) => {
            return this.indicatorList.includes("*" + t) || this.indicatorList.includes(" " + t);
        }
    }
    this.portplates=[];
    this.ports={parallel:0,dvid:0,stereorca:0,ps2:0,rj45:0,serial:0};
    this.recalculatePorts=()=>{
        var count={parallel:0,dvid:0,stereorca:0,ps2:0,rj45:0,serial:0};
        for(var i=0;i<this.portplates.length;i++) {
            if(this.portplates.parallel)count.parallel++;
            if(this.portplates.dvid)count.dvid++;
            if(this.portplates.stereorca)count.stereorca++;
            if(this.portplates.ps2)count.ps2++;
            if(this.portplates.rj45)count.rj45++;
            if(this.portplates.serial)count.serial++;
        }
        this.ports=count;
    }
    this.displayBombInfo=()=>{
        $("#bombinfo").html(`<div>Serial Number: </div>`);
    }
}
window.ktaneSpeak = (t) => {
    console.log(`Saying: ${t}`);
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[2];
    msg.text = t;
    speechSynthesis.speak(msg);
}
