function KtaneSolver() {
    this.moduleList = ktaneModuleCommandInterface;
    this.bombinfo = new KtaneBombInfo();
    this.bombinfo.displayBombInfo();
    this.runCommand = (t) => {
        this.moduleList = ktaneModuleCommandInterface;
        t = t.toLowerCase();
        t = t.trim();
        t = replaceWords(t, ["in Decatur", "4th", "part", "wart", "bart", "fort", "modular"], ["indicator", "port", "port", "port", "port", "port", "modulo"]);
        var cmd = "";
        var moduleTag = "";
        var action = null;
        if (t.indexOf("stop") == 0) {
            speechSynthesis.cancel();
            return;
        } else if (t.indexOf("help") == 0) {
            var s = t.replace('help', '').trim();
            var helpText = "";
            var helpName = "";
            for (var i = 0; i < Object.keys(this.moduleList).length; i++) {
                for (var j = 0; j < this.moduleList[Object.keys(this.moduleList)[i]].alias.length; j++) {
                    if (s.indexOf(this.moduleList[Object.keys(this.moduleList)[i]].alias[j]) == 0) {
                        helpText = this.moduleList[Object.keys(this.moduleList)[i]].help;
                        helpName = this.moduleList[Object.keys(this.moduleList)[i]].name;
                        break;
                    }
                }
            }
            ktaneSpeak(`Showing help text for ${helpName}`);
            $("#display").html(`Showing help text for ${helpName}<br><br>` + helpText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\&lt;/g, '<').replace(/\\&gt;/g, '>'));
            return;
        }
        if (t.indexOf("total modules") == 0) {
            t = replaceWords(t, ["to", "for"], ["2", "4"]);
            var s = /[total modules] ?(\d+)/.exec(t);
            try {
                this.bombinfo.moduleCount.total = parseInt(s[1]);
                this.bombinfo.recalculateModuleCounts();
                ktaneSpeak(`${s[1]} module${parseInt(s[1])==1?"":"s"} in total`);
            } catch (e) {
                ktaneSpeak("Invalid number of modules");
            }
        } else if (t.indexOf("solved modules") == 0) {
            t = replaceWords(t, ["to", "for"], ["2", "4"]);
            var s = /[solved modules] ?(\d+)/.exec(t);
            try {
                this.bombinfo.moduleCount.solved = parseInt(s[1]);
                this.bombinfo.recalculateModuleCounts();
                ktaneSpeak(`${s[1]} solved module${parseInt(s[1])==1?"":"s"}`);
            } catch (e) {
                ktaneSpeak("Invalid number of modules");
            }
        } else if (t.indexOf("needy modules") == 0) {
            t = replaceWords(t, ["to", "for"], ["2", "4"]);
            var s = /[needy modules] ?(\d+)/.exec(t);
            try {
                this.bombinfo.moduleCount.unsolved = parseInt(s[1]);
                this.bombinfo.recalculateModuleCounts();
                ktaneSpeak(`${s[1]} needy module${parseInt(s[1])==1?"":"s"}`);
            } catch (e) {
                ktaneSpeak("Invalid number of modules");
            }
        } else if (t.indexOf("batteries") == 0 || t.indexOf("battery") == 0) {
            t = replaceWords(t, ["to", "for"], ["2", "4"]);

            for (var i = 0; i < 10; i++)
                t = t.replace(ktaneNumberToWord(i), i.toString());

            var s = /[batteries|battery] (d|aa|holders) ?(\d+)/.exec(t);

            try {
                if (s[1] == "d") {
                    this.bombinfo.batteries.d = parseInt(s[2]);
                } else if (s[1] == "aa") {
                    this.bombinfo.batteries.aa = parseInt(s[2]);
                } else if (s[1] == "holders") {
                    this.bombinfo.batteries.holders = parseInt(s[2]);
                }

                ktaneSpeak(`Battery ${s[1]} ${s[2]}`);
            } catch (e) {
                ktaneSpeak("Invalid number of batteries");
            }
            this.bombinfo.recalculateBatteries();
            this.bombinfo.displayBombInfo();
            return;
        } else if (t.indexOf("lit indicator") == 0 || t.indexOf("on indicator") == 0) {
            var s = t.split(" ");
            var a = "";
            for (var i = 0; i < s.length; i++) {
                if (["lit", "on", "indicator"].includes(s[i])) continue;
                if (this.toLetter(s[i]) !== null) {
                    a += this.toLetter(s[i]);
                } else {
                    a += s[i];
                }
            }
            this.bombinfo.indicatorList.push(("*" + a).toLowerCase());
            this.bombinfo.displayBombInfo();
            ktaneSpeak(`Lit indicator ${a}`);
            return;
        } else if (t.indexOf("unlit indicator") == 0 || t.indexOf("off indicator") == 0) {
            var s = t.split(" ");
            var a = "";
            for (var i = 0; i < s.length; i++) {
                if (["unlit", "off", "indicator"].includes(s[i])) continue;
                if (this.toLetter(s[i]) !== null) {
                    a += this.toLetter(s[i]);
                } else {
                    a += s[i];
                }
            }
            this.bombinfo.indicatorList.push((" " + a).toLowerCase());
            this.bombinfo.displayBombInfo();
            ktaneSpeak(`Unlit indicator ${a}`);
            return;
        } else if (t.indexOf("remove indicator") == 0) {
            if (this.bombinfo.indicatorList.length == 0) return;
            this.bombinfo.indicatorList.splice(this.bombinfo.indicatorList.length - 1, 1);
            this.bombinfo.displayBombInfo();
            ktaneSpeak(`Removed last indicator`);
            return;
        } else if (t.indexOf("serial number") == 0) {
            t = replaceWords(t, ["serial number ", " to ", "tree", "for", "mic", "you", "-", "syrup", "cereal"], ["", "2", "3", "4", "mike", "u", "", "0", "0"]);

            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 6; j++) {
                    t = t.replace(ktaneNumberToWord(i), i.toString());
                }
            }

            var s = t.split(" ");

            this.bombinfo.serialnumber = {
                whole: "",
                letters: [],
                numbers: []
            };
            for (var i = 0; i < s.length; i++) {
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
            ktaneSpeak(`Serial number is ${this.bombinfo.serialnumber.whole.split("").map(function (obj) {
				if (isNaN(obj)) return ktaneLetterToNato(obj);

				return obj;
			}).join(" ")}`);
            return;
        } else if (t.indexOf("port") == 0 || t.indexOf("portplate") == 0) {
            var s = t.split(" ");
            var p = [];
            if (s.some(x => ["parallel"].includes(x))) p.push("parallel");
            if (s.some(x => ["divd", "dvi-d", "dvi", "dvid"].includes(x))) p.push("dvid");
            if (s.some(x => ["stereorca", "stereo", "rca"].includes(x))) p.push("stereorca");
            if (s.some(x => ["ps2", "ps"].includes(x))) p.push("ps2");
            if (s.some(x => ["rj45", "rj", "45"].includes(x))) p.push("rj45");
            if (s.some(x => ["serial", "cereal"].includes(x))) p.push("serial");
            if (s.some(x => ["ac", "power"].includes(x))) p.push("ac");
            if (s.some(x => ["component", "componentvideo"].includes(x))) p.push("componentvideo");
            if (s.some(x => ["composite", "compositevideo"].includes(x))) p.push("compositevideo");
            if (s.some(x => ["hdmi"].includes(x))) p.push("hdmi");
            if (s.some(x => ["vga"].includes(x))) p.push("vga");
            if (s.some(x => ["usb"].includes(x))) p.push("usb");
            if (s.some(x => ["pcmcia"].includes(x))) p.push("pcmcia");
            var pp = new KtanePortplate();
            p.map(x => pp.addPort(x));
            this.bombinfo.portplates.push(pp);
            this.bombinfo.recalculatePorts();
            this.bombinfo.displayBombInfo();
            var addedPorts = pp.getNames();
            ktaneSpeak(`${(addedPorts.split(", ").join("").length >= 1) ? "Portplate with " + addedPorts : "Empty portplate"}`);
            return;
        } else if (t.indexOf("remove port") == 0 || t.indexOf("remove portplate") == 0) {
            if (this.bombinfo.portplates.length == 0) return;
            this.bombinfo.portplates.splice(this.bombinfo.portplates.length - 1, 1);
            this.bombinfo.displayBombInfo();
            ktaneSpeak("Removed last portplate");
            return;
        } else if (t.indexOf("strike") == 0) {
            var s = t.replace('strike ', '');
            var a = parseInt(s);
            if (!isNaN(a)) {
                this.bombinfo.strikes = a;
                this.bombinfo.displayBombInfo();
                ktaneSpeak(`${a} strikes`);
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
                        moduleTag = Object.keys(this.moduleList)[i];
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
        action(this.bombinfo, $("#display"), `assets/${moduleTag}/`, a.split(" "));
    }
    this.toLetter = (t) => {
        return ktaneNatoToLetter(t);
    }
    this.toNumber = (t) => {
        return ktaneWordToNumber(t);
    }
}

function ktaneNatoToLetter(t) {
    t = replaceWords(t, ["clara", "ecco", "joliet", "xray", "sulu"], ["sierra", "echo", "juliet", "x-ray", "zulu"]);
    if (!"alpha;bravo;charlie;delta;echo;foxtrot;golf;hotel;india;juliet;kilo;lima;mike;november;oscar;papa;quebec;romeo;sierra;tango;uniform;victor;whiskey;x-ray;yankee;zulu".split(';').includes(t)) return null;
    return t[0];
}

function ktaneLetterToNato(t) {
    if (t.length !== 1) return null;
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

function ktaneWordToNumber(t) {
    var convertor = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
        thirteen: 13,
        fourteen: 14,
        fifteen: 15,
        sixteen: 16,
        seventeen: 17,
        eighteen: 18,
        nineteen: 19,
        twenty: 20,
        thirty: 30
    };
    try {
        return convertor[t].toString();
    } catch (e) {
        if (isNaN(parseInt(t))) return null;
        return t;
    }
}

function ktaneNumberToWord(n) {
    var words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

    if (n < 0 || n >= words.length) return null;

    return words[n];
}

function replaceWords(original, words, replacers) {
    if (words.length <= 0 || replacers.length <= 0 || replacers.length !== words.length) return original;

    for (var i = 0; i < words.length; i++)
        original = replaceAll(original, words[i], replacers[i]);

    return original;
}

function replaceAll(original, word, replacer) {
    return original.split(word).join(replacer);
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
        aa: 0,
        holders: 0,
        all: 0
    };
    this.moduleCount={
        total:0,
        solved:0,
        needy:0,
        unsolved:0
    }
    this.indicatorList = [];
    this.indicators = {
        exists: t => {
            return this.indicators.isLit(t)||this.indicators.isUnlit(t);
        },
        isLit: t => {
            return this.indicatorList.includes("*" + t.toLowerCase());
        },
        isUnlit:t => {
            return this.indicatorList.includes(" " + t.toLowerCase());
        },
        getLit: ()=>{
            return this.indicatorList.map(a=>a.indexOf("*")==0);
        },
        getUnlit: ()=>{
            return this.indicatorList.map(a=>a.indexOf(" ")==0);
        }
    }
    this.portplates = [];
    var portsCount = {
        parallel: 0,
        dvid: 0,
        stereorca: 0,
        serial: 0,
        rj45: 0,
        ps2: 0,
        ac: 0,
        componentvideo: 0,
        hdmi: 0,
        compositevideo: 0,
        vga: 0,
        usb: 0,
        pcmcia: 0,
        all: 0
    };
    this.getPortsCount = t => {
        if (!t) return portsCount.all;
        if (portsCount[t] === undefined) return null;
        return portsCount[t];
    }
    this.recalculatePorts = () => {
        var count = {
            parallel: 0,
            dvid: 0,
            stereorca: 0,
            serial: 0,
            rj45: 0,
            ps2: 0,
            ac: 0,
            componentvideo: 0,
            hdmi: 0,
            compositevideo: 0,
            vga: 0,
            usb: 0,
            pcmcia: 0,
            all: 0
        };
        for (var i = 0; i < this.portplates.length; i++) {
            for (var j = 0; j < Object.keys(count).length; j++) {
                var t = Object.keys(count)[j];
                if (t === "all") {
                    count.all += this.portplates[i].getCount();
                    continue;
                }
                count[t] += this.portplates[i].getCount(t);
            }
        }
        portsCount = count;
    }
    this.recalculateBatteries = () => {
        this.batteries.all = this.batteries.d + this.batteries.aa;
    }
    this.recalculateModuleCounts=()=>{
        this.moduleCount.unsolved=this.moduleCount.total-(this.moduleCount.solved+this.moduleCount.needy);
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
        var portplatesHTML = '<ul>';
        for (var i = 0; i < this.portplates.length; i++) {
            portplatesHTML += '<li>' + this.portplates[i].getNames() + '</li>';
        }
        portplatesHTML += '</ul>';
        var portsCountHTML = '<ul>';
        portsCountHTML += '<li>Parallel: ' + this.getPortsCount("parallel") + '</li>';
        portsCountHTML += '<li>DVI-D: ' + this.getPortsCount("dvid") + '</li>';
        portsCountHTML += '<li>Stereo RCA: ' + this.getPortsCount("stereorca") + '</li>';
        portsCountHTML += '<li>Serial: ' + this.getPortsCount("serial") + '</li>';
        portsCountHTML += '<li>RJ-45: ' + this.getPortsCount("rj45") + '</li>';
        portsCountHTML += '<li>PS/2: ' + this.getPortsCount("ps2") + '</li>';
        portsCountHTML += '<li>AC: ' + this.getPortsCount("ac") + '</li>';
        portsCountHTML += '<li>Component Video: ' + this.getPortsCount("componentvideo") + '</li>';
        portsCountHTML += '<li>HDMI: ' + this.getPortsCount("hdmi") + '</li>';
        portsCountHTML += '<li>Composite Video: ' + this.getPortsCount("compositevideo") + '</li>';
        portsCountHTML += '<li>VGA: ' + this.getPortsCount("vga") + '</li>';
        portsCountHTML += '<li>USB: ' + this.getPortsCount("usb") + '</li>';
        portsCountHTML += '<li>PCMCIA: ' + this.getPortsCount("pcmcia") + '</li>';
        portsCountHTML += '<li>Total: ' + this.getPortsCount() + '</li>';
        portsCountHTML += '</ul>';
        $("#bombinfo").html(`<div>Serial Number: ${this.serialnumber.whole}</div>
        <div>Module Counts:
            <ul>
                <li>Total: ${this.moduleCount.total}</li>
                <li>Solved: ${this.moduleCount.solved}</li>
                <li>Unsolved: ${this.moduleCount.unsolved}</li>
                <li>Needy: ${this.moduleCount.needy}</li>
            </ul>
        </div>
        <div>Serial Number Letters: ${this.serialnumber.letters}</div>
        <div>Serial Number Numbers: ${this.serialnumber.numbers}</div>
        <div>Batteries:
            <ul>
                <li>D: ${this.batteries.d}</li>
                <li>AA: ${this.batteries.aa}</li>
                <li>Holders: ${this.batteries.holders}</li>
                <li>Total: ${this.batteries.all}</li>
            </ul>
        </div>
        <div>Indicators: ${indicatorsHTML}</div>
        <div>Portplates: ${portplatesHTML}</div>
        <div>Ports Count: ${portsCountHTML}</div>
        <div>Strikes: ${this.strikes}</div>`);
    }
}

function KtanePortplate() {
    var portTypes = {
        parallel: "Parallel",
        dvid: "DVI-D",
        stereorca: "Stereo RCA",
        serial: "Serial",
        rj45: "RJ-45",
        ps2: "PS/2",
        ac: "AC",
        componentvideo: "Component Video",
        hdmi: "HDMI",
        compositevideo: "Composite Video",
        vga: "VGA",
        usb: "USB",
        pcmcia: "PCMCIA"
    };
    var ports = [];
    this.getCount = t => {
        if (!t) return ports.length;
        if (portTypes[t] === undefined) return null;
        return ports.filter(d => d === t).length;
    }
    this.addPort = t => {
        if (portTypes[t] === undefined) return null;
        if (ports.includes(t)) return;
        ports.push(t);
    }
    this.removePort = t => {
        if (portTypes[t] === undefined) return null;
        if (!ports.includes(t)) return;
        ports.splice(ports.indexOf(t), 1);
    }
    this.getNames = () => {
        var p = ports.map(d => portTypes[d]);
        return p.length === 0 ? "Empty" : p.join(", ");
    }
}
window.ktaneSpeak = (t) => {
    console.log(`Saying: ${t}`);
    $("#speech-output").text(t);
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];
    msg.lang = "en-US";
    msg.text = t;
    speechSynthesis.speak(msg);
}
