import glob, requests, json
g=glob.glob("modules/*.js")
o="var ktaneModuleCommandInterface={"
log=""
log+="Building Modules:"
for item in g:
    f=open(item,'r')
    c=f.read()
    if not "//**no add**" in c:
        theitem=json.loads(c.split('$$')[1])
        theitem['script']="%%$$%%"
        log+="\n  - "+theitem['name']
        o+='"'+item.replace('modules\\','').replace('modules/','').replace('.js','')+'":'
        o+=json.dumps(theitem).replace('"%%$$%%"','(bombinfo,displayElement,args)=>{'+c+'}')
        o+=','
    f.close()
o+='thisIsTheLastItemAndItIsNotActuallyNeededButIPutItHereAsAJoke:{"name":"","alias":[],"script":()=>{}}};'
url = 'https://javascript-minifier.com/raw'
data = {'input':o+"\n/* Log\n"+log+"\n*/"}
response = requests.post(url, data=data).text
f=open('ktaneModules.js','w')
f.write(response)
f.close()
print(log)
if(response[:3]!="var"):
    print(response)
    input("Build error press enter to quit")
else:
    input("Completed build press enter to quit")
