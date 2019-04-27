function KtaneSolver() {
    this.moduleList=theModuleList;
    var scriptsLoaded=false;
    var scriptsCallback=this.callback;
    this.init=()=>{
        var scripts=[];
        for(var i=0;i<this.moduleList.modules.length;i++) {
            scripts.push(this.moduleList.modules[i].script);
        }
        $.getMultiScripts(scripts,'modules/').done(function() {
            scriptsLoaded=true;
            scriptsCallback();
        });
    }
    this.setCallback=(f)=>{
        scriptsCallback=f;
    };
    this.runCommand=(t)=>{
        if(!scriptsLoaded){
            console.error("KtaneSolver scripts are not loaded yet");
        }
        var cmd="";
        var action=null;
        for(var i=0;i<this.moduleList.modules.length;i++) {
            for(var j=0;j<this.moduleList.modules[i].alias.length;j++) {
                if(t.indexOf(this.moduleList.modules[i].alias[j])==0){
                    cmd=this.moduleList.modules[i].alias[j];
                    action=this.moduleList.modules[i].cmd;
                    break;
                }
            }
        }
        if(cmd==""){KtaneSolver.speak(`Invalid command`);return;}
        var s=t.split(cmd+" ");
        s.splice(0,1);
        var a=s.join("");
        KtaneSolver.moduleCommandInterface.apply(action,a.split(" "));
    }
}
KtaneSolver.moduleCommandInterface=()=>{};
KtaneSolver.speak=(t)=>{

}
