function KtaneSolver() {
    this.moduleList = ktaneModuleCommandInterface;
    this.bombinfo = new KtaneBombInfo();
    this.runCommand = (t) => {
        t = t.toLowerCase();
        t = t.trim();
        var cmd = "";
        var action = null;
        if (t.indexOf("help") == 0) {
            var s = t.replace('help', '').trim();
            var helpText = "";
            var helpName = "";
            for (var i = 0; i < Object.keys(this.moduleList).length; i++) {
                for (var j = 0; j < this.moduleList[Object.keys(this.moduleList)[i]].alias.length; j++) {
                    if (s.indexOf(this.moduleList[Object.keys(this.moduleList)[i]].alias[j]) == 0) {
                        helpText = this.moduleList[Object.keys(this.moduleList)[i]].help;
                        helpName = this.moduleList[Object.keys(this.moduleList)[i]].names;
                        break;
                    }
                }
            }
            ktaneSpeak(`Showing help text for ${helpName}`);
            $("#output").html(helpText);
            return;
        }
        if (t.indexOf("batteries") == 0) {
            var s = /batteries (d|aa) ?(\d+)/.exec(t);
            try {
                if (s[1] == "d") {
                    this.bombinfo.batteries.d = parseInt(s[2]);
                } else if (s[1] == "aa") {
                    this.bombinfo.batteries.aa = parseInt(s[2]);
                }
            } catch (e) {
                ktaneSpeak("Invalid number of batteries");
            }
            this.bombinfo.displayBombInfo();
            return;
        } else if (t.indexOf("lit indicator") == 0) {
            var s = t.split(" ");
            this.bombinfo.indicatorList.push(("*" + this.toLetter(s[2]) + this.toLetter(s[3]) + this.toLetter(s[4])).toLowerCase());
            this.bombinfo.displayBombInfo();
            return;
        } else if (t.indexOf("unlit indicator") == 0) {
            var s = t.split(" ");
            this.bombinfo.indicatorList.push((" " + this.toLetter(s[2]) + this.toLetter(s[3]) + this.toLetter(s[4])).toLowerCase());
            this.bombinfo.displayBombInfo();
            return;
        } else if (t.indexOf("remove indicator") == 0) {
            if (this.bombinfo.indicatorList.length == 0) return;
            this.bombinfo.indicatorList.splice(this.bombinfo.indicatorList.length - 1, 1);
            this.bombinfo.displayBombInfo();
            return;
        } else if (t.indexOf("serial number") == 0) {
            var s = t.split(" ");
            s.shift();
            s.shift();
            this.bombinfo.serialnumber = {
                whole: "",
                letters: [],
                numbers: []
            };
            for (var i = 0; i < s.length; i++) {
                if (["serial", "number"].includes(s[i])) continue;
                if (this.toLetter(s[i]) !== null) {
                    this.bombinfo.serialnumber.whole += this.toLetter(s[i]);
                } else {
                    this.bombinfo.serialnumber.whole += s[i];
                }
            }
            this.bombinfo.serialnumber.whole = this.bombinfo.serialnumber.whole.toUpperCase();
            this.bombinfo.serialnumber.letters = this.bombinfo.serialnumber.whole.replace(/[^A-Z]/g, "").split("");
            this.bombinfo.serialnumber.numbers = this.bombinfo.serialnumber.whole.replace(/[^\d]/g, "").split("").map(d => parseInt(d));
            this.bombinfo.displayBombInfo();
            return;
        } else if (t.indexOf("port") == 0) {
            var s = t.split(" ");
            var p = {
                parallel: false,
                dvid: false,
                stereorca: false,
                ps2: false,
                rj45: false,
                serial: false
            };
            if (s.includes("parallel")) p.parallel = true;
            if (s.includes("dvid")) p.dvid = true;
            if (s.includes("stereo")) p.stereo = true;
            if (s.includes("ps2")) p.ps2 = true;
            if (s.includes("rj45")) p.rj45 = true;
            if (s.includes("serial") || s.includes("cereal")) p.serial = true;
            this.bombinfo.portplates.push(p);
            this.bombinfo.recalculatePorts();
            this.bombinfo.displayBombInfo();
            return;
        } else if(t.indexOf("remove port")==0){
            if(this.bombinfo.portplates.length==0)return;
            this.bombinfo.portplates splice(this.bombinfo.portplates.length-1,1);
            this.bombinfo.displayBombInfo();
        } else if (t.indexOf("strike") == 0) {
            var s = t.replace('strike ', '');
            var a = parseInt(s);
            if (!isNaN(a)) {
                this.bombinfo.strikes = a;
            } else {
                ktaneSpeak("Error parsing number of strikes");
            }
            return;
        }
        if (cmd == "") {
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
    this.toLetter = (t) => {
        return ktaneNatoToLetter(t);
    }
}

function ktaneNatoToLetter(t) {
    t = t.replace('ciara', 'sierra').replace('xray', 'x-ray');
    if (!"alpha;bravo;charlie;delta;echo;foxtrot;golf;hotel;india;juliet;kilo;lima;mike;november;oscar;papa;quebec;romeo;sierra;tango;uniform;victor;whiskey;x-ray;yankee;zulu".split(';').includes(t)) return null;
    return t[0];
}

function ktaneLetterToNato(t) {
    if (t.length !== 1) return;
    var convertor = {
        a: "alpha",
        b: "bravo",
        c: "charlie",
        d: "delta",
        e: "echo",
        f: "foxtrot",
        g: "golf",
        h: "hotel",
        i: "india",
        j: "juliet",
        k: "kilo",
        l: "lima",
        m: "mike",
        n: "november",
        o: "oscar",
        p: "papa",
        q: "quebec",
        r: "romeo",
        s: "sierra",
        t: "tango",
        u: "uniform",
        v: "victor",
        w: "whiskey",
        x: "x-ray",
        y: "yankee",
        z: "zulu"
    };
    return convertor[t.toLowerCase()];
}

function KtaneBombInfo() {
    this.strikes = 0;
    this.serialnumber = {
        whole: "",
        letters: [],
        numbers: []
    };
    this.batteries = {
        d: 0,
        aa: 0
    };
    this.indicatorList = [];
    this.indicators = {
        exists: (t) => {
            t = t.toLowerCase()
            return this.indicators.isLit(t) || this.indicators.isUnlit(t);
        },
        isLit: (t) => {
            t = t.toLowerCase()
            return this.indicatorList.includes("*" + t);
        },
        isUnlit: (t) => {
            t = t.toLowerCase()
            return this.indicatorList.includes(" " + t);
        }
    }
    this.portplates = [];
    this.ports = {
        parallel: 0,
        dvid: 0,
        stereorca: 0,
        ps2: 0,
        rj45: 0,
        serial: 0
    };
    this.recalculatePorts = () => {
        var count = {
            parallel: 0,
            dvid: 0,
            stereorca: 0,
            ps2: 0,
            rj45: 0,
            serial: 0
        };
        for (var i = 0; i < this.portplates.length; i++) {
            if (this.portplates.parallel) count.parallel++;
            if (this.portplates.dvid) count.dvid++;
            if (this.portplates.stereorca) count.stereorca++;
            if (this.portplates.ps2) count.ps2++;
            if (this.portplates.rj45) count.rj45++;
            if (this.portplates.serial) count.serial++;
        }
        this.ports = count;
    }
    this.displayBombInfo = () => {
        var indicatorsHTML = '<ul>';
        for (var i = 0; i < this.indicatorList.length; i++) {
            if (this.indicatorList[i].indexOf('*') == 0) {
                indicatorsHTML += '<li>Lit ' + this.indicatorList[i].substr(1, 3) + '</li>';
            } else if (this.indicatorList[i].indexOf(' ') == 0) {
                indicatorsHTML += '<li>Unlit ' + this.indicatorList[i].substr(1, 3) + '</li>';
            }
        }
        indicatorsHTML += '</ul>';
        var portplatesHTML ='<ul>';
        for(var i=0;i<this.portplates.length;i++){
            var a =this.portplates[i];
            var p=[];
            p.push(a.parallel?"Parallel":"");
            p.push(a.dvid?"DVI-D":"");
            p.push(a.rj45?"RJ-45":"");
            p.push(a.ps2?"PS/2":"");
            p.push(a.stereorca?"Stereo RCA":"");
            p.push(a.serial?"Serial":"");
            portplatesHTML+='<li>'+p.join(", ")+'</li>';
        portplatesHTML+='</ul>';
        var portsCountHTML = '<ul>';
        portsCountHTML += '<li>Parallel: ' + this.ports.parallel + '</li>';
        portsCountHTML += '<li>DVI-D: ' + this.ports.dvid + '</li>';
        portsCountHTML += '<li>Stereo RCA: ' + this.ports.stereorca + '</li>';
        portsCountHTML += '<li>PS/2: ' + this.ports.ps2 + '</li>';
        portsCountHTML += '<li>RJ-45: ' + this.ports.rj45 + '</li>';
        portsCountHTML += '<li>Serial: ' + this.ports.serial + '</li>';
        portsCountHTML += '</ul>';
        $("#bombinfo").html(`<div>Serial Number: ${this.serialnumber.whole}</div>
        <div>Serial Number Letters: ${this.serialnumber.letters}</div>
        <div>Serial Number Numbers: ${this.serialnumber.numbers}</div>
        <div>D Batteries: ${this.batteries.d}</div>
        <div>AA Batteries: ${this.batteries.aa}</div>
        <div>Indicators: ${indicatorsHTML}</div>
        <div>Portplates: ${portplatesHTML}</div>
        <div>Ports Count: ${portsCountHTML}</div>
        <div>Strikes: ${this.strikes}</div>`);
    }
}
window.ktaneSpeak = (t) => {
    console.log(`Saying: ${t}`);
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[2];
    msg.lang = "en-US";
    msg.text = t;
    speechSynthesis.speak(msg);
}
