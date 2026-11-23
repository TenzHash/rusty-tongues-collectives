/* Rusty Tongues Collective: scripts */
(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
// scroll reveal
try{var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});$$(".rv").forEach(function(el){io.observe(el)})}catch(e){$$(".rv").forEach(function(el){el.classList.add("in")})}
// booking form: opens Gmail (desktop) or the mail app (phones), with copy fallback
var TO="rtcollectives25@gmail.com",box=document.createElement("div"),sb=$("#send");
box.style.cssText="margin-top:18px;display:none";box.setAttribute("aria-live","polite");
box.innerHTML='<p class="bk-s" style="margin:0 0 4px;font-weight:700"></p><a class="btn alt bk-g" target="_blank" rel="noopener">Open Gmail</a> <a class="btn alt bk-m">Open email app</a> <button type="button" class="btn alt bk-c">Copy message</button>';
sb.parentNode.appendChild(box);
var st=$(".bk-s",box),ag=$(".bk-g",box),am=$(".bk-m",box),bc=$(".bk-c",box),txt="";
function val(i){return document.getElementById(i).value.trim()}
sb.textContent="Send message";
sb.onclick=function(){
 if(!val("n")||!val("m")){box.style.display="block";st.textContent="Please add your name and a message first.";ag.style.display=am.style.display=bc.style.display="none";return}
 var subj="Rusty Tongues: "+val("t"),body="Name: "+val("n")+"\nBand/Venue: "+val("b")+"\nTopic: "+val("t")+"\n\n"+val("m");
 txt="To: "+TO+"\nSubject: "+subj+"\n\n"+body;
 var q="su="+encodeURIComponent(subj)+"&body="+encodeURIComponent(body);
 ag.href="https://mail.google.com/mail/?view=cm&fs=1&to="+TO+"&"+q;
 am.href="mailto:"+TO+"?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(body);
 ag.style.display=am.style.display=bc.style.display="";box.style.display="block";
 var phone=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),ok=false;
 try{if(phone){location.href=am.href;ok=true}else{var w=window.open(ag.href,"_blank");if(w){w.opener=null;ok=true}}}catch(e){}
 st.textContent=ok?"Your email is ready. Press Send in your mail app or Gmail. Nothing opened? Use a button below.":"Choose how you want to send your message:";
};
bc.onclick=function(){
 function done(){bc.textContent="Copied! Paste it into an email to "+TO}
 function old(){var t=document.createElement("textarea");t.value=txt;t.style.cssText="position:fixed;opacity:0";document.body.appendChild(t);t.select();try{document.execCommand("copy");done()}catch(e){bc.textContent="Please email "+TO}document.body.removeChild(t)}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,old)}else old()};
// photo tabs + "show all" on phones
var tabs=$$(".tab"),gws=$$(".gw");
gws.forEach(function(w){var g=$(".gal",w);if($$(".ph",w).length>12){g.classList.add("cut");var b=document.createElement("button");b.type="button";b.className="btn more";b.textContent="Show all "+$$(".ph",w).length+" photos";b.onclick=function(){g.classList.remove("cut");b.remove()};w.appendChild(b)}});
function setTab(t){tabs.forEach(function(x){var on=x.getAttribute("data-t")===t;x.classList.toggle("on",on);x.setAttribute("aria-selected",on)});gws.forEach(function(w){w.hidden=w.getAttribute("data-set")!==t})}
tabs.forEach(function(x){x.onclick=function(){setTab(x.getAttribute("data-t"))}});
$$("[data-open]").forEach(function(a){a.addEventListener("click",function(){setTab(a.getAttribute("data-open"))})});
// lightbox
var lb=$("#lb"),im=$("img",lb),ct=$(".ct2",lb),list=[],i=0;
function full(el){return el.getAttribute("data-full")||el.src}
function show(n){i=(n+list.length)%list.length;im.src=full(list[i]);ct.textContent=(i+1)+" / "+list.length}
$$(".ph").forEach(function(p){p.onclick=function(){var w=p.closest(".gw");list=$$(".ph img",w);show(list.indexOf($("img",p)));lb.classList.add("on")}});
$(".x",lb).onclick=function(){lb.classList.remove("on")};$(".pv",lb).onclick=function(){show(i-1)};$(".nx",lb).onclick=function(){show(i+1)};
lb.onclick=function(e){if(e.target===lb)lb.classList.remove("on")};
document.addEventListener("keydown",function(e){if(!lb.classList.contains("on"))return;if(e.key==="Escape")lb.classList.remove("on");if(e.key==="ArrowLeft")show(i-1);if(e.key==="ArrowRight")show(i+1)});
var x0=0;lb.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});lb.addEventListener("touchend",function(e){var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)$(d<0?".nx":".pv",lb).click()},{passive:true});
// hero photo strip (mix of both nights)
var all=$$(".ph img"),s=$("#strip"),t=document.createElement("div"),pick=all.filter(function(_,k){return k%5===0}).slice(0,26);
for(var r=0;r<2;r++)pick.forEach(function(x){var c=document.createElement("img");c.src=x.src;c.alt="";t.appendChild(c)});s.appendChild(t);
// progress bar + active nav
var pb=$("#pb"),ls=$$(".links a"),secs=ls.map(function(a){return $(a.getAttribute("href"))});
function u(){var h=document.documentElement,y=window.scrollY||h.scrollTop;pb.style.width=(y/Math.max(1,h.scrollHeight-innerHeight)*100)+"%";var cur=-1;secs.forEach(function(e,n){if(e&&e.getBoundingClientRect().top<innerHeight*.4)cur=n});ls.forEach(function(a,n){a.classList.toggle("on",n===cur)})}
addEventListener("scroll",u,{passive:true});u();
// logo sticker in hero
var lg=$(".brand img"),w=$(".hero .w");if(lg&&w){var st=document.createElement("img");st.className="stk";st.src=lg.src;st.alt="Rusty Tongues Collective logo";w.appendChild(st)}
})();
