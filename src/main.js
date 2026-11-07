/* Virtual Happy Diwali - Built by Engineer Pankaj Kumar */
import './style.css';

(function(){
'use strict';
var $=function(i){return document.getElementById(i)},cv=$('c'),ctx=cv.getContext('2d',{alpha:false}),sky=$('sky'),TAU=Math.PI*2,r=Math.random;
var W=0,H=0,DPR=1,stars=[],cityC,SG,started=false,auto=true,nextA=0,tapType='random',theme='mix',timers=[],cityFront=false,shells=0,LM=1,Q=1,ema=16.7,last=performance.now(),pf=false;
var PALS={mix:[[0,100],[30,100],[50,100],[130,100],[190,100],[270,100],[320,100],[0,0]],gold:[[42,100],[35,100],[28,100],[50,90],[15,100]],rainbow:[[0,100],[40,100],[60,100],[130,100],[210,100],[280,100]],tri:[[28,100],[0,0],[130,90]],royal:[[220,100],[320,100],[0,0],[190,100]],pastel:[[330,70],[190,70],[270,70],[90,60]]};
var TYPES=['peony','chrysanthemum','willow','kamuro','brocade','pistil','crossette','ring','palm','strobe','crackle','double','heart','star','spiral'];
var sel=$('shell');sel.innerHTML='<option value="random">Random</option>'+TYPES.map(function(t){return '<option value="'+t+'">'+t+'</option>'}).join('');
sel.onchange=function(){tapType=sel.value};$('theme').onchange=function(){theme=$('theme').value};$('launch').onchange=function(){LM=parseFloat($('launch').value)};

/* ---------- audio: voices -> bus -> limiter, plus reverb send; smoothed volume ---------- */
var AC,bus,nb,brn,vc=0,lastB=0,SM=1;
function audio(){if(AC){if(AC.state==='suspended')AC.resume();return}
try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){AC=null;return}
var cp=AC.createDynamicsCompressor();cp.threshold.value=-22;cp.knee.value=20;cp.ratio.value=10;cp.attack.value=.003;cp.release.value=.2;var mg2=AC.createGain(),sh=AC.createWaveShaper(),cu=new Float32Array(1024);mg2.gain.value=1.8;for(var q=0;q<1024;q++)cu[q]=Math.tanh((q/512-1)*1.6)/Math.tanh(1.6);sh.curve=cu;sh.oversample='2x';cp.connect(mg2);mg2.connect(sh);sh.connect(AC.destination);
bus=AC.createGain();bus.connect(cp);
var rv=AC.createConvolver(),n=AC.sampleRate*2.2|0,ib=AC.createBuffer(2,n,AC.sampleRate),i,c,d,lp;
for(c=0;c<2;c++){d=ib.getChannelData(c);lp=0;for(i=0;i<n;i++){lp+=((r()*2-1)-lp)*.25;d[i]=lp*Math.pow(1-i/n,2.5)}}
rv.buffer=ib;var wg=AC.createGain();wg.gain.value=.22;bus.connect(rv);rv.connect(wg);wg.connect(cp);
nb=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);d=nb.getChannelData(0);for(i=0;i<d.length;i++)d[i]=r()*2-1;
brn=AC.createBuffer(1,AC.sampleRate*3,AC.sampleRate);d=brn.getChannelData(0);lp=0;for(i=0;i<d.length;i++){lp=(lp+.02*(r()*2-1))/1.02;d[i]=lp*5}
setVol(true);AC.resume()}
function setVol(now){$('vl').textContent=$('vol').value;if(!bus)return;var v=$('vol').value/100;bus.gain.setTargetAtTime(v*v*2.2*SM,AC.currentTime,now?.001:.04)}
$('vol').oninput=function(){setVol()};$('snd').onchange=function(){SM=parseFloat($('snd').value);setVol()};
function outp(g,pan){var o=g;if(AC.createStereoPanner){var p=AC.createStereoPanner();p.pan.value=pan;g.connect(p);o=p}o.connect(bus)}
function voice(t,src,type,f0,f1,dur,peak,att,pan){if(!AC||vc>40)return;var s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=src;f.type=type;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+dur);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(peak,t+att);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f);f.connect(g);outp(g,pan);s.start(t,r()*.5);s.stop(t+dur+.03);vc++;s.onended=function(){vc--}}
function tone(t,f0,f1,dur,peak,pan){if(!AC)return;var o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(peak,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);outp(g,pan);o.start(t);o.stop(t+dur+.03)}
function panOf(x){return Math.max(-.8,Math.min(.8,x/W*2-1))}
function boom(x,y,type){if(!AC)return;var t=AC.currentTime+.1+(1-y/H)*.3,pan=panOf(x),light=(t-lastB<.12)||vc>30;lastB=t;
if(!light)voice(t,nb,'bandpass',2200,700,.07,.5,.002,pan);
voice(t,brn,'lowpass',1100,110,.8,1,.004,pan);voice(t+.01,nb,'bandpass',900,250,.35,.35,.003,pan);tone(t,100,32,.6,.8,pan);tone(t+.35,70,30,.5,.3,pan);voice(t+.03,brn,'lowpass',200,45,2.4,.5,.04,pan);
var np=type==='crackle'?22:type==='strobe'?6:9;if(vc<28)for(var q=0;q<np;q++)voice(t+.25+q*.07+r()*.15,nb,'highpass',3500,6500,.03,.07+r()*.1,.001,pan+(r()-.5)*.3)}
function launchSnd(x,dur){if(!AC)return;var t=AC.currentTime,pan=panOf(x);tone(t,80,45,.15,.3,pan);voice(t+.05,nb,'bandpass',500,2400,dur,.07,.08,pan)}
function pop(x){if(AC&&vc<30)voice(AC.currentTime,nb,'highpass',3000,6000,.03,.15,.001,panOf(x))}
function bang(x,big){if(!AC)return;var t=AC.currentTime+.02,pan=panOf(x);voice(t,nb,'bandpass',3200,900,big?.1:.05,big?.8:.5,.002,pan);voice(t,brn,'lowpass',big?800:1400,big?90:160,big?2.4:.3,big?1:.6,.003,pan);tone(t,big?85:140,big?24:50,big?.9:.2,big?1:.5,pan);if(big)voice(t+.04,brn,'lowpass',180,40,3,.6,.05,pan)}
function hiss(x,dur,f0,f1,pk){if(AC)voice(AC.currentTime,nb,'bandpass',f0,f1,dur,pk,.2,panOf(x))}

/* ---------- particles: pooled objects, no per-frame allocation ---------- */
var P=[],FREE=[],MAXP=3000,DUM={},R=[],F=[],GE=[];
function mk(x,y,a,sp,o){o=o||{};var p;if(P.length>=MAXP&&o.tx==null)p=DUM;else{p=FREE.pop()||{};P.push(p)}
p.x=p.px=x;p.y=p.py=y;p.vx=Math.cos(a)*sp;p.vy=Math.sin(a)*sp;p.l=0;p.ml=o.ml||1.4+r()*.6;p.h=o.h||0;p.s=o.s||0;p.g=o.g==null?.06:o.g;p.d=o.d||.965;p.w=o.w||1.6;
p.fl=o.fl||0;p.cr=o.cr||0;p.sp=o.sp||0;p.tr=o.tr||0;p.st=o.st||0;p.tx=o.tx==null?NaN:o.tx;p.ty=o.ty||0;p.hold=o.hold||0;return p}
var SPR={};function spr(h){var k=(h/30|0)*30;if(SPR[k])return SPR[k];var c=document.createElement('canvas');c.width=c.height=128;var g=c.getContext('2d'),gr=g.createRadialGradient(64,64,0,64,64,64);
gr.addColorStop(0,'hsla('+k+',100%,88%,1)');gr.addColorStop(.25,'hsla('+k+',100%,62%,.45)');gr.addColorStop(1,'hsla('+k+',100%,50%,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);return SPR[k]=c}
var CC={};function col(h,s,L,a){var a9=a*9|0,l4=L>>2,k=(h|0)*1000000+(s/10|0)*10000+l4*100+a9;return CC[k]||(CC[k]='hsla('+(h|0)+','+((s/10|0)*10)+'%,'+(l4<<2)+'%,'+(a9/9).toFixed(2)+')')}
function burst(x,y,type,pal){var c=pal[r()*pal.length|0],h=c[0],s=c[1],c2=pal[r()*pal.length|0];F.push({x:x,y:y,l:0,h:s>0?h:45});
function n(k,f){k=Math.max(10,k*Q|0);for(var i=0;i<k;i++)f(i,i/k*TAU)}
switch(type){
case'peony':n(210,function(i,a){mk(x,y,a,4.2+r()*.4,{h:h,s:s,ml:2+r()*.5})});break;
case'chrysanthemum':n(130,function(i,a){mk(x,y,a,2+r()*3.2,{h:h,s:s,tr:1,ml:2.4})});break;
case'willow':n(90,function(i,a){mk(x,y,a,1+r()*2.6,{h:42,s:100,tr:1,g:.03,d:.975,ml:3.4})});break;
case'kamuro':n(100,function(i,a){mk(x,y,a,1+r()*2.8,{h:38,s:100,tr:1,g:.03,d:.978,ml:4.2,w:2})});break;
case'brocade':n(130,function(i,a){mk(x,y,a,r()*4,{h:45,s:90,fl:1,ml:2.6,g:.04})});break;
case'pistil':n(120,function(i,a){mk(x,y,a,3.2+r()*.3,{h:h,s:s})});n(40,function(i,a){mk(x,y,a,1.4,{h:c2[0],s:c2[1]})});break;
case'crossette':n(8,function(i,a){mk(x,y,a,2.6,{h:h,s:s,sp:1,ml:1.6,w:2.8})});break;
case'ring':n(80,function(i,a){var m=mk(x,y,a,3.4,{h:h,s:s,ml:2.4,w:2.2}),ux=m.vx,uy=m.vy*.4,cc=Math.cos(.6),ss=Math.sin(.6);m.vx=ux*cc-uy*ss;m.vy=ux*ss+uy*cc});break;
case'palm':n(9,function(i,a){mk(x,y,a,3.2,{h:h,s:s,tr:1,w:3,d:.975,ml:2.2,g:.05})});break;
case'strobe':n(100,function(i,a){mk(x,y,a,r()*3.5,{h:0,s:0,st:1,ml:2.2})});break;
case'crackle':n(90,function(i,a){mk(x,y,a,r()*3.4,{h:h,s:s,cr:1,ml:1.6})});break;
case'double':burst(x,y,'peony',pal);setTimeout(function(){burst(x,y,'chrysanthemum',pal)},380);break;
case'heart':n(90,function(i,t){var m=mk(x,y,0,0,{h:340,s:100,g:.015,d:.955,ml:2});m.vx=16*Math.pow(Math.sin(t),3)*.3;m.vy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*.3});break;
case'star':n(100,function(i,a){var q=Math.abs((a/TAU*5)%1-.5)*2;mk(x,y,a,(.35+.65*q)*3.6,{h:50,s:100,ml:2,g:.03})});break;
case'spiral':n(120,function(i,a){mk(x,y,a*6,a/TAU*3.8,{h:h,s:s,ml:2})});break}}
function textBurst(cx,cy,txt,pal){var fs=Math.max(16,Math.min(W*.9/(txt.length*.58),H*.2,120)),oc=document.createElement('canvas');oc.width=W|0;oc.height=Math.ceil(fs*1.5);
var g=oc.getContext('2d');g.font='bold '+fs+'px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(txt,oc.width/2,oc.height/2,oc.width*.95);
var d=g.getImageData(0,0,oc.width,oc.height).data,pts=[],x,y;for(y=0;y<oc.height;y+=2)for(x=0;x<oc.width;x+=2)if(d[(y*oc.width+x)*4+3]>128)pts.push(x,y);
var np=pts.length/2,st=Math.max(1,Math.ceil(np/750));F.push({x:cx,y:cy,l:0,h:45});
for(var i=0;i<np;i+=st){var c=pal[r()*pal.length|0];mk(cx,cy,0,0,{tx:pts[i*2],ty:H*.34+pts[i*2+1]-oc.height/2,h:c[0],s:c[1],ml:5,hold:3.6,g:.012,d:.99,w:2.2})}}
function fire(x,y,type,msg){if(!type||type==='tap')type=tapType;if(type==='random')type=TYPES[r()*TYPES.length|0];var dur=(.8+(1-y/H)*.7)*LM;shells++;$('cnt').textContent=shells;
R.push({x0:x+(r()-.5)*60,x1:x,y0:H,y1:y,l:0,dur:dur,type:type,pal:PALS[theme],msg:msg,x:x,y:H});launchSnd(x,dur)}
var rx=function(){return W*(.1+r()*.8)},ry=function(){return H*(.12+r()*.4)};

/* ---------- render loop ---------- */
function frame(t){requestAnimationFrame(frame);if(document.hidden){last=t;return}
var rdt=t-last;last=t;if(rdt>100)rdt=17;ema+=(rdt-ema)*.08;if(ema>21&&Q>.35)Q-=.01;else if(ema<17.5&&Q<1)Q+=.003;
var dt=Math.min(rdt,34)/1000,k=dt*60,i,j,p,e;
ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1-Math.pow(.84,k);ctx.fillStyle=SG;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';for(i=0;i<stars.length;i++){var s=stars[i];ctx.globalAlpha=.12+.12*Math.sin(t/700+s.p);ctx.fillRect(s.x,s.y,s.s,s.s)}ctx.globalAlpha=1;
if(!cityFront)ctx.drawImage(cityC,0,0,W,H);
if(auto&&t>nextA&&R.length<12){fire(rx(),ry(),'random');nextA=t+(started?900+r()*1800:1400+r()*1600)}
for(i=R.length-1;i>=0;i--){var q=R[i],f=q.l+=dt;f=Math.min(f/q.dur,1);e=1-(1-f)*(1-f);q.x=q.x0+(q.x1-q.x0)*e;q.y=q.y0+(q.y1-q.y0)*e;
mk(q.x,q.y,Math.PI/2+(r()-.5)*1.2,.7,{h:28+r()*14,s:100,ml:.55,w:1.3,g:.05});if(Q>.6)mk(q.x,q.y,0,0,{h:0,s:0,ml:.8,w:1,g:0,d:.9});
if(f>=1){R[i]=R[R.length-1];R.pop();if(q.msg)textBurst(q.x,q.y,q.msg,q.pal);else burst(q.x,q.y,q.type,q.pal);boom(q.x,q.y,q.type)}}
for(i=GE.length-1;i>=0;i--){e=GE[i];e.l+=dt;if(e.l>(e.du||3)){GE.splice(i,1);continue}var nq=Math.ceil(5*Q);
if(e.k==='anar'){for(j=nq*3;j>0;j--)mk(e.x,H-6,-Math.PI/2+(r()-.5)*.9,5+r()*4.5,{h:r()<.5?40+r()*15:PALS[theme][r()*PALS[theme].length|0][0],s:100,ml:1.5,w:1.6,g:.12,d:.98})}
else if(e.k==='chakri'){e.a+=dt*16;var cy=H*.74;for(var z=0;z<2;z++){var aa=e.a+z*Math.PI;for(j=Math.ceil(nq/2);j>0;j--)mk(e.x+Math.cos(aa)*12,cy+Math.sin(aa)*12,aa+Math.PI/2+(r()-.5)*.25,4+r()*2,{h:38+r()*20,s:100,ml:.7,w:1.5,g:.06,d:.97})}}
else if(e.k==='phul'){for(j=nq*2;j>0;j--)mk(e.x,H*.78,r()*TAU,1+r()*3.5,{h:45+r()*10,s:60,ml:.5,w:1,g:.12,d:.95,fl:1})}
else if(e.k==='fuse'){mk(e.x,H-18,-Math.PI/2+(r()-.5)*1.5,1+r()*2,{h:30,s:100,ml:.4,w:1.2,g:.1})}
else{for(j=nq;j>0;j--)mk(e.x,H-6,-Math.PI/2+(r()-.5)*.5,4+r()*3,{h:38+r()*10,s:100,ml:1.1,w:1.5,g:.1,d:.98})}}
ctx.globalCompositeOperation='lighter';
for(i=F.length-1;i>=0;i--){var fl=F[i];fl.l+=dt;var fd=fl.fd||.6;if(fl.l>fd){F.splice(i,1);continue}var fa=1-fl.l/fd,sz=fl.sz||H*.9,cz=fl.sz?fl.sz*.7:140;ctx.globalAlpha=.5*fa*fa;ctx.drawImage(spr(fl.h),fl.x-sz/2,fl.y-sz/2,sz,sz);ctx.globalAlpha=.9*fa*fa;ctx.drawImage(spr(45),fl.x-cz/2,fl.y-cz/2,cz,cz)}
ctx.globalAlpha=1;ctx.lineCap='round';var lw=0,cs='';
for(i=P.length-1;i>=0;i--){p=P[i];p.l+=dt;
if(p.l>=p.ml){if(p.cr&&r()<.5){for(j=0;j<2;j++)mk(p.x,p.y,r()*TAU,1+r(),{ml:.3,h:0,s:0,w:1});if(r()<.1)pop(p.x)}P[i]=P[P.length-1];P.pop();FREE.push(p);continue}
p.px=p.x;p.py=p.y;var txt=p.tx===p.tx;
if(txt&&p.l<.9){var ee=Math.min(1,.14*k);p.x+=(p.tx-p.x)*ee;p.y+=(p.ty-p.y)*ee}
else if(!(txt&&p.l<p.hold)){var dr=1-(1-p.d)*k;p.vx*=dr;p.vy=p.vy*dr+p.g*k;p.x+=p.vx*k;p.y+=p.vy*k}
if(p.sp&&p.l>p.ml*.45){var b=r()*TAU;for(j=0;j<4;j++)mk(p.x,p.y,b+j*Math.PI/2,2.2,{h:p.h,s:p.s,ml:1.2,w:1.8});P[i]=P[P.length-1];P.pop();FREE.push(p);continue}
if(p.tr&&r()<.5*k*Q)mk(p.x,p.y,0,0,{ml:.45,h:p.h,s:p.s,w:1,g:.02,d:.9});
var fr=p.l/p.ml,a,L;
if(txt){a=p.l<p.hold?1:1-(p.l-p.hold)/(p.ml-p.hold);L=64}
else{a=1-fr*fr;if(p.fl&&r()<.5)a*=.2;if(p.st&&(p.l*14|0)%2)a*=.05;L=(fr<.2?90-fr*200:50-(fr-.2)*30)+(p.s===0?20:0)}
if(a<.06)continue;
var c=col(p.h,p.s,L,a);if(c!==cs){ctx.strokeStyle=c;cs=c}if(p.w!==lw){ctx.lineWidth=p.w;lw=p.w}
ctx.beginPath();ctx.moveTo(p.px,p.py);ctx.lineTo(p.x,p.y);ctx.stroke()}
for(i=0;i<R.length;i++){ctx.globalAlpha=.7;ctx.drawImage(spr(40),R[i].x-13,R[i].y-13,26,26)}
ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
if(cityFront)ctx.drawImage(cityC,0,0,W,H)}

/* ---------- sky and city ---------- */
function bld(g,col,hmin,hmax,wmin,wmax,wp){var x=-10;while(x<W){var w=wmin+r()*(wmax-wmin),h=H*(hmin+r()*(hmax-hmin));g.fillStyle=col;g.fillRect(x,H-h,w,h+2);if(r()<.35)g.fillRect(x+w*.4,H-h-12,2,12);if(r()<.3)g.fillRect(x+w*.15,H-h-6,w*.3,6);
if(wp)for(var yy=H-h+6;yy<H-4;yy+=9)for(var xx=x+4;xx<x+w-5;xx+=7)if(r()<wp){g.fillStyle=r()<.8?'rgba(255,214,120,'+(.5+r()*.5)+')':'rgba(190,225,255,.8)';g.fillRect(xx,yy,3,4)}x+=w+(r()<.3?4+r()*10:0)}}
function buildCity(){cityC=document.createElement('canvas');cityC.width=W*DPR|0;cityC.height=H*DPR|0;var g=cityC.getContext('2d');g.scale(DPR,DPR);var gr=g.createLinearGradient(0,H*.55,0,H);
gr.addColorStop(0,'rgba(255,150,60,0)');gr.addColorStop(1,'rgba(255,150,60,.22)');g.fillStyle=gr;g.fillRect(0,H*.55,W,H*.45);bld(g,'#16233f',.08,.2,30,80,0);
var hz=g.createLinearGradient(0,H*.75,0,H);hz.addColorStop(0,'rgba(60,80,130,0)');hz.addColorStop(1,'rgba(60,80,130,.35)');g.fillStyle=hz;g.fillRect(0,H*.75,W,H*.25);
bld(g,'#0d1730',.05,.15,26,70,.18);bld(g,'#070c1b',.03,.1,24,64,.3);g.fillStyle='#03050c';g.fillRect(0,H-5,W,5);
for(var i=0;i<W/60;i++){var lx=i*60+r()*30,rg=g.createRadialGradient(lx,H-8,0,lx,H-8,10);rg.addColorStop(0,'rgba(255,200,110,.9)');rg.addColorStop(1,'rgba(255,200,110,0)');g.fillStyle=rg;g.fillRect(lx-10,H-18,20,20)}}
function rs(){DPR=Math.min(window.devicePixelRatio||1,1.5);var b=sky.getBoundingClientRect();W=b.width;H=b.height;cv.width=W*DPR|0;cv.height=H*DPR|0;ctx.setTransform(DPR,0,0,DPR,0,0);
SG=ctx.createLinearGradient(0,0,0,H);SG.addColorStop(0,'#01020a');SG.addColorStop(.65,'#070b1f');SG.addColorStop(1,'#16264a');
stars=[];for(var i=0;i<90;i++)stars.push({x:r()*W,y:r()*H*.8,s:r()*1.4+.3,p:r()*6});buildCity();ctx.fillStyle='#01020a';ctx.fillRect(0,0,W,H)}

/* ---------- shows and controls ---------- */
function clr(){timers.forEach(clearTimeout);timers=[];$('cd').textContent=''}
function seq(L){clr();L.forEach(function(a){timers.push(setTimeout(a[1],a[0]))})}
function finale(t0){var L=[];for(var i=0;i<40;i++)L.push([t0+i*100,function(){fire(rx(),ry(),'random')}]);return L}
function grand(){var L=[],t=0;for(var i=0;i<30;i++){t+=Math.max(350,1600-i*45);L.push([t,function(){fire(rx(),ry(),'random')}])}seq(L.concat(finale(t+1500)))}
function today(){var d=new Date(),sd=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();function rn(){sd|=0;sd=sd+0x6D2B79F5|0;var t=Math.imul(sd^sd>>>15,1|sd);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}
var L=[],t=0;for(var i=0;i<26;i++){t+=500+rn()*1300;(function(x,y,ty){L.push([t,function(){fire(W*x,H*y,TYPES[ty])}])})(.1+rn()*.8,.12+rn()*.4,rn()*TYPES.length|0)}seq(L.concat(finale(t+1500)))}
function count(){var L=[];for(var n=10;n>=1;n--)(function(n){L.push([(10-n)*1000,function(){$('cd').textContent=n;fire(W/2,H*.4,'peony')}])})(n);
L.push([10000,function(){$('cd').textContent='Happy Diwali!'}]);L.push([15500,function(){$('cd').textContent=''}]);seq(L.concat(finale(10300)))}
function tp(o){$('panel').style.display=o?'flex':'none';$('bar').style.display=o?'none':'flex'}
function run(fn){return function(){audio();tp(0);fn()}}
$('bCtl').onclick=function(){tp(1)};$('hide').onclick=function(){tp(0)};
$('bGrand').onclick=run(grand);$('bToday').onclick=run(today);$('bCount').onclick=run(count);$('bFin').onclick=run(function(){seq(finale(0))});
$('bGround').onclick=run(function(){for(var i=0;i<3;i++)GE.push({x:W*(.2+i*.3)+r()*40,l:0});if(AC)voice(AC.currentTime,nb,'bandpass',900,2600,2.8,.1,.3,0)});
function later(L){L.forEach(function(a){timers.push(setTimeout(a[1],a[0]))})}
$('cAnar').onclick=run(function(){for(var i=0;i<2;i++){var x=W*(.25+r()*.5);GE.push({k:'anar',x:x,l:0,du:3.5});hiss(x,3.5,900,2800,.2)}});
$('cChakri').onclick=run(function(){var x=W*(.3+r()*.4);GE.push({k:'chakri',x:x,l:0,du:4,a:0});hiss(x,4,300,1900,.2)});
$('cPhul').onclick=run(function(){var x=W*(.3+r()*.4);GE.push({k:'phul',x:x,l:0,du:5});hiss(x,5,2000,5000,.14)});
$('cLadi').onclick=run(function(){var L=[];for(var i=0;i<56;i++)(function(x,i){L.push([i*85+r()*40,function(){bang(x,false);F.push({x:x,y:H-14,l:0,h:45,sz:90,fd:.18});for(var j=0;j<10;j++)mk(x,H-14,-r()*Math.PI,1+r()*3.5,{h:40,s:60,ml:.4,w:1.4,g:.1})}])})(W*.08+W*.84*i/55,i);later(L)});
$('cBomb').onclick=run(function(){var x=W*(.3+r()*.4),y=H-16;GE.push({k:'fuse',x:x,l:0,du:1});later([[1000,function(){bang(x,true);F.push({x:x,y:y,l:0,h:40,sz:H*1.1,fd:.9});for(var j=0;j<70;j++)mk(x,y,-r()*Math.PI,2+r()*7,{h:25+r()*25,s:90,ml:.9,w:1.8,g:.12});for(var k=0;k<50;k++)mk(x,y,k/50*TAU,8,{h:30,s:25,ml:.45,d:.88,g:0,w:2.2})}]])});
$('bAuto').onclick=function(){auto=!auto;$('bAuto').textContent=auto?'⏸ Auto show: on':'▶ Auto show: off'};
$('bCity').onclick=function(){cityFront=!cityFront;$('bCity').textContent='🏙 City in front: '+(cityFront?'on':'off')};
$('write').onclick=run(function(){var m=$('msg').value.trim()||'Happy Diwali!';clr();fire(W/2,H*.4,'peony',m)});
$('share').onclick=function(){var b=$('share'),m=$('msg').value.trim()||'Happy Diwali!',u=location.href.split('#')[0];function done(){b.textContent='✔ Shared';setTimeout(function(){b.textContent='🔗 Share greeting'},1600)}
function go(){var a=document.createElement('a');a.href='https://wa.me/?text='+encodeURIComponent(m+' 🎆🪔 '+u);a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();done()}
if(navigator.share){navigator.share({title:'Virtual Happy Diwali',text:m,url:u}).then(done,function(e){if(e&&e.name!=='AbortError')go()})}else go()};
$('bPhoto').onclick=function(){try{var u=cv.toDataURL('image/png'),o=document.createElement('div');o.style.cssText='position:absolute;inset:0;z-index:9;background:rgba(1,2,10,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:14px;text-align:center';
var im=new Image();im.src=u;im.style.cssText='max-width:100%;max-height:65%;border-radius:8px';var t=document.createElement('div');t.textContent='Press and hold (or right-click) the photo to save it';
var a=document.createElement('a');a.href=u;a.download='virtual-happy-diwali.png';a.textContent='⬇ Download PNG';a.style.color='#ff9d2e';var c=document.createElement('button');c.textContent='Close';c.onclick=function(){o.remove()};o.append(im,t,a,c);sky.appendChild(o)}catch(e){}};
function pseudo(){pf=!pf;var s=sky.style;if(pf){s.position='fixed';s.inset='0';s.zIndex='99';s.height='100%'}else{s.position='';s.inset='';s.zIndex='';s.height=''}setTimeout(rs,50)}
$('fs').onclick=function(){if(pf){pseudo();return}try{if(document.fullscreenElement)document.exitFullscreen();else if(sky.requestFullscreen)sky.requestFullscreen().catch(pseudo);else pseudo()}catch(e){pseudo()}};
cv.addEventListener('pointerdown',function(e){if(!started)return;var b=cv.getBoundingClientRect();fire(e.clientX-b.left,Math.min(e.clientY-b.top,H*.8),'tap')});
$('start').onclick=function(){audio();started=true;$('intro').style.display='none';$('bar').style.display='flex';grand()};
window.addEventListener('resize',rs);rs();requestAnimationFrame(frame);
})();
