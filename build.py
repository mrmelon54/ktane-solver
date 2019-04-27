import glob, requests, json
g=glob.glob("modules/*.js")
o="var ktaneModuleCommandInterface={"
for item in g:
    f=open(item,'r')
    c=f.read()
    theitem=json.loads(c.split('$$')[1])
    theitem['script']="%%$$%%"
    o+='"'+item.replace('modules\\','').replace('modules/','').replace('.js','')+'":'
    o+=json.dumps(theitem).replace('"%%$$%%"','(bombinfo,args)=>{'+c+'}')
    o+=','
    f.close()
o+='thisIsTheLastItemAndItIsNotActuallyNeededButIPutItHereAsAJoke:{"name":"","alias":[],"script":()=>{}}};'
url = 'https://javascript-minifier.com/raw'
data = {'input':o}
response = requests.post(url, data=data).text
f=open('ktaneModules.js','w')
f.write(response)
f.close()
if(response[:3]!="var"):
    print(response)
    input("Build error press enter to quit")
else:
    input("Completed build press enter to quit")
