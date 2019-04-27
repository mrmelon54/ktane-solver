function KtaneSolver() {
    this.moduleList=ktaneModuleCommandInterface;
    this.bombinfo=new KtaneBombInfo();
    this.runCommand=(t)=>{
        t=t.toLowerCase();
        t=t.trim();
        var cmd="";
        var action=null;
        for(var i=0;i<Object.keys(this.moduleList).length;i++) {
            for(var j=0;j<this.moduleList[Object.keys(this.moduleList)[i]].alias.length;j++) {
                console.log("Checking: "+this.moduleList[Object.keys(this.moduleList)[i]].alias[j]+" against: "+t);
                if(t.indexOf(this.moduleList[Object.keys(this.moduleList)[i]].alias[j])==0){
                    console.log("Running command for "+this.moduleList[Object.keys(this.moduleList)[i]].name);
                    cmd=this.moduleList[Object.keys(this.moduleList)[i]].alias[j];
                    action=this.moduleList[Object.keys(this.moduleList)[i]].script;
                    break;
                }
            }
        }
        if(cmd==""){ktaneSpeak(`Invalid command`);return;}
        var s=t.split(cmd+" ");
        s.splice(0,1);
        var a=s.join("");
        action(this.bombinfo,a.split(" "));
    }
}
function KtaneBombInfo() {
    this.serialnumber="";
    this.batteries={d:0,aa:0,aax3:0,aax4:0};
    var indicators=[];
    this.indicators={
        exists:(t)=>{
            return indicators.includes("*"+t)||indicators.includes(" "+t);
        },
        isLit:(t)=>{
            return indicators.includes("*"+t)||indicators.includes(" "+t);
        },
        isUnlit:(t)=>{
            return indicators.includes("*"+t)||indicators.includes(" "+t);
        }
    }
}
window.ktaneSpeak=(t)=>{
    console.log(`Saying: ${t}`);
}
