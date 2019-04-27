import glob, requests, json
g=glob.glob("modules/*.js")
o="var ktaneModuleCommandInterface={"
print("Building Modules:")
for item in g:
    f=open(item,'r')
    c=f.read()
    if not "//**no add**" in c:
        theitem=json.loads(c.split('$$')[1])
        theitem['script']="%%$$%%"
        print("  - "+theitem['name'])
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
