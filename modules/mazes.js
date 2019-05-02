$$ temp disabled {"name":"Mazes","vanilla":true,"alias":["mazes","maze"],"help":"mazes <maze number> player <position> target <position>"} $$

var EasyStar=function(t){function n(o){if(e[o])return e[o].exports;var r=e[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){var o={},r=e(1),i=e(2),s=e(3);const u=0,a=1;t.exports=o;var l=1;o.js=function(){var t,n,e,c=1,f=1.4,h=!1,p={},d={},v={},y={},T=!0,g={},x=[],O=Number.MAX_VALUE,b=!1;this.setAcceptableTiles=function(t){t instanceof Array?e=t:!isNaN(parseFloat(t))&&isFinite(t)&&(e=[t])},this.enableSync=function(){h=!0},this.disableSync=function(){h=!1},this.enableDiagonals=function(){b=!0},this.disableDiagonals=function(){b=!1},this.setGrid=function(n){t=n;for(var e=0;e<t.length;e++)for(var o=0;o<t[0].length;o++)d[t[e][o]]||(d[t[e][o]]=1)},this.setTileCost=function(t,n){d[t]=n},this.setAdditionalPointCost=function(t,n,e){void 0===v[n]&&(v[n]={}),v[n][t]=e},this.removeAdditionalPointCost=function(t,n){void 0!==v[n]&&delete v[n][t]},this.removeAllAdditionalPointCosts=function(){v={}},this.setDirectionalCondition=function(t,n,e){void 0===y[n]&&(y[n]={}),y[n][t]=e},this.removeAllDirectionalConditions=function(){y={}},this.setIterationsPerCalculation=function(t){O=t},this.avoidAdditionalPoint=function(t,n){void 0===p[n]&&(p[n]={}),p[n][t]=1},this.stopAvoidingAdditionalPoint=function(t,n){void 0!==p[n]&&delete p[n][t]},this.enableCornerCutting=function(){T=!0},this.disableCornerCutting=function(){T=!1},this.stopAvoidingAllAdditionalPoints=function(){p={}},this.findPath=function(n,o,i,u,a){var f=function(t){h?a(t):setTimeout(function(){a(t)})};if(void 0===e)throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");if(void 0===t)throw new Error("You can't set a path without first calling setGrid() on EasyStar.");if(n<0||o<0||i<0||u<0||n>t[0].length-1||o>t.length-1||i>t[0].length-1||u>t.length-1)throw new Error("Your start or end point is outside the scope of your grid.");if(n===i&&o===u)return void f([]);for(var p=t[u][i],d=!1,v=0;v<e.length;v++)if(p===e[v]){d=!0;break}if(d===!1)return void f(null);var y=new r;y.openList=new s(function(t,n){return t.bestGuessDistance()-n.bestGuessDistance()}),y.isDoneCalculating=!1,y.nodeHash={},y.startX=n,y.startY=o,y.endX=i,y.endY=u,y.callback=f,y.openList.push(P(y,y.startX,y.startY,null,c));var T=l++;return g[T]=y,x.push(T),T},this.cancelPath=function(t){return t in g&&(delete g[t],!0)},this.calculate=function(){if(0!==x.length&&void 0!==t&&void 0!==e)for(n=0;n<O;n++){if(0===x.length)return;h&&(n=0);var o=x[0],r=g[o];if("undefined"!=typeof r)if(0!==r.openList.size()){var i=r.openList.pop();if(r.endX!==i.x||r.endY!==i.y)i.list=u,i.y>0&&m(r,i,0,-1,c*F(i.x,i.y-1)),i.x<t[0].length-1&&m(r,i,1,0,c*F(i.x+1,i.y)),i.y<t.length-1&&m(r,i,0,1,c*F(i.x,i.y+1)),i.x>0&&m(r,i,-1,0,c*F(i.x-1,i.y)),b&&(i.x>0&&i.y>0&&(T||A(t,e,i.x,i.y-1,i)&&A(t,e,i.x-1,i.y,i))&&m(r,i,-1,-1,f*F(i.x-1,i.y-1)),i.x<t[0].length-1&&i.y<t.length-1&&(T||A(t,e,i.x,i.y+1,i)&&A(t,e,i.x+1,i.y,i))&&m(r,i,1,1,f*F(i.x+1,i.y+1)),i.x<t[0].length-1&&i.y>0&&(T||A(t,e,i.x,i.y-1,i)&&A(t,e,i.x+1,i.y,i))&&m(r,i,1,-1,f*F(i.x+1,i.y-1)),i.x>0&&i.y<t.length-1&&(T||A(t,e,i.x,i.y+1,i)&&A(t,e,i.x-1,i.y,i))&&m(r,i,-1,1,f*F(i.x-1,i.y+1)));else{var s=[];s.push({x:i.x,y:i.y});for(var a=i.parent;null!=a;)s.push({x:a.x,y:a.y}),a=a.parent;s.reverse();var l=s;r.callback(l),delete g[o],x.shift()}}else r.callback(null),delete g[o],x.shift();else x.shift()}};var m=function(n,o,r,i,s){var u=o.x+r,l=o.y+i;if((void 0===p[l]||void 0===p[l][u])&&A(t,e,u,l,o)){var c=P(n,u,l,o,s);void 0===c.list?(c.list=a,n.openList.push(c)):o.costSoFar+s<c.costSoFar&&(c.costSoFar=o.costSoFar+s,c.parent=o,n.openList.updateItem(c))}},A=function(t,n,e,o,r){var i=y[o]&&y[o][e];if(i){var s=E(r.x-e,r.y-o),u=function(){for(var t=0;t<i.length;t++)if(i[t]===s)return!0;return!1};if(!u())return!1}for(var a=0;a<n.length;a++)if(t[o][e]===n[a])return!0;return!1},E=function(t,n){if(0===t&&n===-1)return o.TOP;if(1===t&&n===-1)return o.TOP_RIGHT;if(1===t&&0===n)return o.RIGHT;if(1===t&&1===n)return o.BOTTOM_RIGHT;if(0===t&&1===n)return o.BOTTOM;if(t===-1&&1===n)return o.BOTTOM_LEFT;if(t===-1&&0===n)return o.LEFT;if(t===-1&&n===-1)return o.TOP_LEFT;throw new Error("These differences are not valid: "+t+", "+n)},F=function(n,e){return v[e]&&v[e][n]||d[t[e][n]]},P=function(t,n,e,o,r){if(void 0!==t.nodeHash[e]){if(void 0!==t.nodeHash[e][n])return t.nodeHash[e][n]}else t.nodeHash[e]={};var s=L(n,e,t.endX,t.endY);if(null!==o)var u=o.costSoFar+r;else u=0;var a=new i(o,n,e,u,s);return t.nodeHash[e][n]=a,a},L=function(t,n,e,o){if(b){var r=Math.abs(t-e),i=Math.abs(n-o);return r<i?f*r+i:f*i+r}var r=Math.abs(t-e),i=Math.abs(n-o);return r+i}},o.TOP="TOP",o.TOP_RIGHT="TOP_RIGHT",o.RIGHT="RIGHT",o.BOTTOM_RIGHT="BOTTOM_RIGHT",o.BOTTOM="BOTTOM",o.BOTTOM_LEFT="BOTTOM_LEFT",o.LEFT="LEFT",o.TOP_LEFT="TOP_LEFT"},function(t,n){t.exports=function(){this.pointsToAvoid={},this.startX,this.callback,this.startY,this.endX,this.endY,this.nodeHash={},this.openList}},function(t,n){t.exports=function(t,n,e,o,r){this.parent=t,this.x=n,this.y=e,this.costSoFar=o,this.simpleDistanceToTarget=r,this.bestGuessDistance=function(){return this.costSoFar+this.simpleDistanceToTarget}}},function(t,n,e){t.exports=e(4)},function(t,n,e){var o,r,i;(function(){var e,s,u,a,l,c,f,h,p,d,v,y,T,g,x;u=Math.floor,d=Math.min,s=function(t,n){return t<n?-1:t>n?1:0},p=function(t,n,e,o,r){var i;if(null==e&&(e=0),null==r&&(r=s),e<0)throw new Error("lo must be non-negative");for(null==o&&(o=t.length);e<o;)i=u((e+o)/2),r(n,t[i])<0?o=i:e=i+1;return[].splice.apply(t,[e,e-e].concat(n)),n},c=function(t,n,e){return null==e&&(e=s),t.push(n),g(t,0,t.length-1,e)},l=function(t,n){var e,o;return null==n&&(n=s),e=t.pop(),t.length?(o=t[0],t[0]=e,x(t,0,n)):o=e,o},h=function(t,n,e){var o;return null==e&&(e=s),o=t[0],t[0]=n,x(t,0,e),o},f=function(t,n,e){var o;return null==e&&(e=s),t.length&&e(t[0],n)<0&&(o=[t[0],n],n=o[0],t[0]=o[1],x(t,0,e)),n},a=function(t,n){var e,o,r,i,a,l;for(null==n&&(n=s),i=function(){l=[];for(var n=0,e=u(t.length/2);0<=e?n<e:n>e;0<=e?n++:n--)l.push(n);return l}.apply(this).reverse(),a=[],o=0,r=i.length;o<r;o++)e=i[o],a.push(x(t,e,n));return a},T=function(t,n,e){var o;if(null==e&&(e=s),o=t.indexOf(n),o!==-1)return g(t,0,o,e),x(t,o,e)},v=function(t,n,e){var o,r,i,u,l;if(null==e&&(e=s),r=t.slice(0,n),!r.length)return r;for(a(r,e),l=t.slice(n),i=0,u=l.length;i<u;i++)o=l[i],f(r,o,e);return r.sort(e).reverse()},y=function(t,n,e){var o,r,i,u,c,f,h,v,y,T;if(null==e&&(e=s),10*n<=t.length){if(u=t.slice(0,n).sort(e),!u.length)return u;for(i=u[u.length-1],v=t.slice(n),c=0,h=v.length;c<h;c++)o=v[c],e(o,i)<0&&(p(u,o,0,null,e),u.pop(),i=u[u.length-1]);return u}for(a(t,e),T=[],r=f=0,y=d(n,t.length);0<=y?f<y:f>y;r=0<=y?++f:--f)T.push(l(t,e));return T},g=function(t,n,e,o){var r,i,u;for(null==o&&(o=s),r=t[e];e>n&&(u=e-1>>1,i=t[u],o(r,i)<0);)t[e]=i,e=u;return t[e]=r},x=function(t,n,e){var o,r,i,u,a;for(null==e&&(e=s),r=t.length,a=n,i=t[n],o=2*n+1;o<r;)u=o+1,u<r&&!(e(t[o],t[u])<0)&&(o=u),t[n]=t[o],n=o,o=2*n+1;return t[n]=i,g(t,a,n,e)},e=function(){function t(t){this.cmp=null!=t?t:s,this.nodes=[]}return t.push=c,t.pop=l,t.replace=h,t.pushpop=f,t.heapify=a,t.updateItem=T,t.nlargest=v,t.nsmallest=y,t.prototype.push=function(t){return c(this.nodes,t,this.cmp)},t.prototype.pop=function(){return l(this.nodes,this.cmp)},t.prototype.peek=function(){return this.nodes[0]},t.prototype.contains=function(t){return this.nodes.indexOf(t)!==-1},t.prototype.replace=function(t){return h(this.nodes,t,this.cmp)},t.prototype.pushpop=function(t){return f(this.nodes,t,this.cmp)},t.prototype.heapify=function(){return a(this.nodes,this.cmp)},t.prototype.updateItem=function(t){return T(this.nodes,t,this.cmp)},t.prototype.clear=function(){return this.nodes=[]},t.prototype.empty=function(){return 0===this.nodes.length},t.prototype.size=function(){return this.nodes.length},t.prototype.clone=function(){var n;return n=new t,n.nodes=this.nodes.slice(0),n},t.prototype.toArray=function(){return this.nodes.slice(0)},t.prototype.insert=t.prototype.push,t.prototype.top=t.prototype.peek,t.prototype.front=t.prototype.peek,t.prototype.has=t.prototype.contains,t.prototype.copy=t.prototype.clone,t}(),function(e,s){return r=[],o=s,i="function"==typeof o?o.apply(n,r):o,!(void 0!==i&&(t.exports=i))}(this,function(){return e})}).call(this)}]);

var maps = [
    [
        "#############",
        "#     #     #",
        "# ### # #####",
        "#@#   #     #",
        "# # ####### #",
        "# #   #    @#",
        "# ### # ### #",
        "# #     #   #",
        "# ######### #",
        "#     #   # #",
        "# ### # ### #",
        "#   #   #   #",
        "#############"
    ],
    [
        "#############",
        "#     #     #",
        "### ### # ###",
        "#   #   #@  #",
        "# ### ##### #",
        "# #   #     #",
        "# # ### ### #",
        "#  @#   # # #",
        "# ### ### # #",
        "# # # #   # #",
        "# # # # ### #",
        "# #   #     #",
        "#############"
    ],
    [
        "#############",
        "#     # #   #",
        "# ### # # # #",
        "# # # #   # #",
        "### # ##### #",
        "#   # #   # #",
        "# # # # # # #",
        "# # # #@# #@#",
        "# # # # # # #",
        "# #   # # # #",
        "# ##### # # #",
        "#       #   #",
        "#############"
    ],
    [
        "#############",
        "#@  #       #",
        "# # ####### #",
        "# # #       #",
        "# # # ##### #",
        "# #   #   # #",
        "# ##### ### #",
        "#@#         #",
        "# ######### #",
        "#         # #",
        "# ####### # #",
        "#     #   # #",
        "#############"
    ],
    [
        "#############",
        "#           #",
        "######### # #",
        "#         # #",
        "# ##### #####",
        "#   #   #@  #",
        "# # ##### # #",
        "# #     # # #",
        "# ##### ### #",
        "# #       # #",
        "# # ####### #",
        "# #    @    #",
        "#############"
    ],
    [
        "#############",
        "# #   #  @  #",
        "# # # ### # #",
        "# # # #   # #",
        "# # # # ### #",
        "#   # # #   #",
        "# ##### # ###",
        "#   #   # # #",
        "### # # # # #",
        "#   #@# #   #",
        "# ##### ### #",
        "#       #   #",
        "#############"
    ],
    [
        "#############",
        "#  @    #   #",
        "# ##### # # #",
        "# #   #   # #",
        "# # ####### #",
        "#   #   #   #",
        "##### ### ###",
        "#   #     # #",
        "# # # ##### #",
        "# # #     # #",
        "# ####### # #",
        "#  @        #",
        "#############"
    ],
    [
        "#############",
        "# #    @#   #",
        "# # ### # # #",
        "#     #   # #",
        "# ######### #",
        "# #       # #",
        "# # ##### # #",
        "# #  @#     #",
        "# ### #######",
        "# # #       #",
        "# # #########",
        "#           #",
        "#############"
    ],
    [
        "#############",
        "# #         #",
        "# # ##### # #",
        "# # #@  # # #",
        "# # # ### # #",
        "#     #   # #",
        "# ##### ### #",
        "# # #   #   #",
        "# # # ##### #",
        "#@# # #   # #",
        "# # # # # ###",
        "#   #   #   #",
        "#############"
    ]
];

var mazesTags=[16,25,46,11,45,35,22,34,13];
/*
var o=`<style>
#test-maps {overflow-y:auto;height:100%;}
#test-maps div div span {position:relative;display:inline-block;width:50px;height:50px;}
#test-maps div div span[tile]::before {position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:black;width:5px;height:5px;content:'';display:block;}
#test-maps div div span::after {content:'';display:block;}
#test-maps div div span[corner]::after {position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:black;width:20px;height:20px;}
#test-maps div div span[wall-hor]::before {position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:black;width:80px;height:20px;content:'';display:block;}
#test-maps div div span[wall-ver]::after {position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:black;width:20px;height:80px;}
#test-maps div div span[ind]::after {position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:transparent;width:40px;height:40px;border:20px solid red;border-radius:50%;}
#test-maps div div span[ind]::before {position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:black;width:5px;height:5px;content:'';display:block;}
</style>`;
o+="<pre id='test-maps'>";
for(var i=0;i<maps.length;i++) {
    o+="<div style='margin-top:20px;'><h2>"+mazesTags[i]+"</h2>";
    for(var r=0;r<maps[i].length;r++) {
        o+="<div>";
        for(var c=0;c<maps[i][r].length;c++) {
            if(r%2==0&&c%2==0)o+="<span corner></span>";
            else if(maps[i][r][c]=="#"&&(r==0||r==(maps[i].length-1)))o+="<span wall-hor></span>";
            else if(maps[i][r][c]=="#"&&(c==0||c==(maps[i][r].length-1)))o+="<span wall-ver></span>";
            else if(maps[i][r][c]=="#"&&maps[i][r][c-1]=="#"&&maps[i][r][c+1]=="#"&&maps[i][r-1][c]=="#"&&maps[i][r+1][c]=="#")o+="<span wall-ver wall-hor></span>";
            else if(maps[i][r][c]=="#"&&maps[i][r][c-1]=="#"&&maps[i][r][c+1]=="#")o+="<span wall-hor></span>";
            else if(maps[i][r][c]=="#"&&maps[i][r-1][c]=="#"&&maps[i][r+1][c]=="#")o+="<span wall-ver></span>";
            else if(maps[i][r][c]=="@")o+="<span ind></span>";
            else if(r%2==1&&c%2==1)o+="<span tile></span>";
            else o+="<span></span>";
        }
        o+="</div>";
    }
    o+="</div>";
}
o+="</pre>";
displayElement.html(o);
*/
ktaneSpeak(`I don't know how you got this far but mazes is disabled!`);
return;

var algorithm=new EasyStar.js();
algorithm.setGrid();
algorithm.setAcceptableTiles([" ","@"]);
algorithm.findPath(startX, startY, endX, endY, (d)=>{
    console.log(d);
    ktaneSpeak("Path found");
});
algorithm.calculate();
var cols = [
    [12, 0, 13, 1, 14, 15, 16],
    [17, 12, 16, 18, 19, 15, 20],
    [2, 3, 18, 21, 4, 13, 19],
    [22, 23, 24, 14, 21, 20, 25],
    [26, 25, 24, 5, 23, 6, 7],
    [22, 17, 8, 9, 26, 10, 11]
];

if (args[0] == "list") {
    var output = "";
    for (var i = 0; i < s.length; i++) {
        output += `<div style="height:64px;width:240px;"><img src="${assetsPath}${img[i]}.png" style="vertical-align:middle;"> = ${s[i]}</div>`;
    }
    displayElement.html('<div style="display:flex;flex-wrap:wrap;">' + output + '</div>');
} else {
    var t = args.join(" ");
    var symbolCount = 0;
    var symbolIds = [];
    for (var i = 0; i < s.length; i++) {
        if (t.includes(s[i])) {
            symbolIds.push(i);
            symbolCount++;
        } else {
            if(s[i]=="question mark"){
                if(t.includes("?")){
                    symbolIds.push(i);
                    symbolCount++;
                }
            }
        }
    }
    if (symbolCount == 4) {
        if (!unique(symbolIds)) {
            ktaneSpeak("The symbols must be unique");
            return;
        }
        var colId = -1;
        for (var i = 0; i < cols.length; i++) {
            var sOne = cols[i].includes(symbolIds[0]);
            var sTwo = cols[i].includes(symbolIds[1]);
            var sThree = cols[i].includes(symbolIds[2]);
            var sFour = cols[i].includes(symbolIds[3]);
            if (sOne && sTwo && sThree && sFour) {
                colId = i;
                break;
            }
        }
        if (colId == -1) {
            ktaneSpeak("No column found");
            return;
        }
        var symbolOrder = [];
        for (var i = 0; i < cols[colId].length; i++) {
            if (cols[colId][i] == symbolIds[0]) symbolOrder.push(symbolIds[0]);
            if (cols[colId][i] == symbolIds[1]) symbolOrder.push(symbolIds[1]);
            if (cols[colId][i] == symbolIds[2]) symbolOrder.push(symbolIds[2]);
            if (cols[colId][i] == symbolIds[3]) symbolOrder.push(symbolIds[3]);
        }
        var o = symbolOrder.map(d => s[d]).join(" then ");
        ktaneSpeak(`Press the button in this order: ${o}`);
    } else {
        ktaneSpeak("No the right amount of symbols");
    }
}

return;

var colours = [];
var hasStar = false;
var hasLED = false;
for (var i = 0; i < args.length; i++) {
    if (['blue', 'red'].includes(args[i])) {
        colours.push(args[i])
    } else {
        ktaneSpeak(`Invalid colour`);
        return;
    }
    if (['star'].includes(args[i])) {
        hasStar = true;
    }
    if (['led'].includes(args[i])) {
        hasLED = true;
    }
}
var wireCount = t => colours.filter(x => x == t).length;
var checkComb = (a, t) => a.split("/").includes(t);
if (colours.length <= 2 && colours.length >= 1 && wireCount("blue") <= 1 && wireCount("red") <= 1 && wireCount("white") <= 1) {
    var str = wireCount("blue") == 1 ? "1" : "0" + wireCount("red") == 1 ? "1" : "0" + hasLED ? "1" : "0" + hasStar ? "1" : "0";
    var action = null;
    if (checkComb("0000/0001/0101", str)) action = "cut";
    else if (checkComb("0011/0110/0111", str)) action = (bombinfo.batteries.d + bombinfo.batteries.aa > 2) ? "cut" : "don't cut";
    else if (checkComb("1010/1011/1101", str)) action = (bombinfo.ports.parallel >= 1) ? "cut" : "don't cut";
    else if (checkComb("0100/1000/1100/1110", str)) action = (bombinfo.serialnumber.numbers[bombinfo.serialnumber.numbers.length - 1] % 2 == 0) ? "cut" : "don't cut";
    else action = "don't cut";
    ktaneSpeak(`${action} the wire`);
} else {
    ktaneSpeak(`Invalid wire colours`);
}
