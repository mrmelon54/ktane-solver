function KtaneSolver() {
    this.moduleList=theModuleList;
    this.init=()=>{
        for(var i=0;i<this.moduleList.modules.length;i++) {
            $.getScript(this.moduleList.modules[i].script);
        }
    }
    this.callback=()=>{};
}
