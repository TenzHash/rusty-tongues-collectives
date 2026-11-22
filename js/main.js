/* Rusty Tongues Collective: scripts (gallery, lightbox, nav, booking form) */
try{var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});document.querySelectorAll(".rv").forEach(function(el){io.observe(el)})}catch(e){document.querySelectorAll(".rv").forEach(function(el){el.classList.add("in")})}
document.getElementById("send").onclick=function(){var g=function(i){return document.getElementById(i).value};
var body="Name: "+g("n")+"\nBand/Venue: "+g("b")+"\nTopic: "+g("t")+"\n\n"+g("m");
location.href="mailto:rtcollectives25@gmail.com?subject="+encodeURIComponent("Rusty Tongues: "+g("t"))+"&body="+encodeURIComponent(body)};

(function(){var ph=[].slice.call(document.querySelectorAll("#gal img")),lb=document.getElementById("lb"),im=lb.querySelector("img"),ct=lb.querySelector(".ct2"),i=0;
function show(n){i=(n+ph.length)%ph.length;im.src=ph[i].src;ct.textContent=(i+1)+" / "+ph.length}
ph.forEach(function(p,n){p.parentNode.onclick=function(){show(n);lb.classList.add("on")}});
lb.querySelector(".x").onclick=function(){lb.classList.remove("on")};
lb.querySelector(".pv").onclick=function(){show(i-1)};lb.querySelector(".nx").onclick=function(){show(i+1)};
lb.onclick=function(e){if(e.target===lb)lb.classList.remove("on")};
document.addEventListener("keydown",function(e){if(!lb.classList.contains("on"))return;if(e.key==="Escape")lb.classList.remove("on");if(e.key==="ArrowLeft")show(i-1);if(e.key==="ArrowRight")show(i+1)})})();
(function(){var g=[].slice.call(document.querySelectorAll("#gal img")).slice(0,26),s=document.getElementById("strip"),t=document.createElement("div");
for(var k=0;k<2;k++)g.forEach(function(x){var c=document.createElement("img");c.src=x.src;c.alt="";t.appendChild(c)});s.appendChild(t)})();
(function(){var pb=document.getElementById("pb"),ls=[].slice.call(document.querySelectorAll(".links a")),secs=ls.map(function(a){return document.querySelector(a.getAttribute("href"))});
function u(){var h=document.documentElement,y=window.scrollY||h.scrollTop;pb.style.width=(y/Math.max(1,h.scrollHeight-innerHeight)*100)+"%";var cur=-1;secs.forEach(function(e,n){if(e&&e.getBoundingClientRect().top<innerHeight*.4)cur=n});ls.forEach(function(a,n){a.classList.toggle("on",n===cur)})}
addEventListener("scroll",u,{passive:true});u()})();
(function(){var s=document.querySelector(".brand img"),w=document.querySelector(".hero .w");if(s&&w){var i=document.createElement("img");i.className="stk";i.src=s.src;i.alt="Rusty Tongues Collective logo";w.appendChild(i)}})();
(function(){var l=document.getElementById("lb"),x=0;l.addEventListener("touchstart",function(e){x=e.touches[0].clientX},{passive:true});l.addEventListener("touchend",function(e){var d=e.changedTouches[0].clientX-x;if(Math.abs(d)>40)l.querySelector(d<0?".nx":".pv").click()},{passive:true})})();
(function(){var g=document.getElementById("gal"),n=g.querySelectorAll(".ph").length,b=document.createElement("button");g.classList.add("cut");b.type="button";b.className="btn more";b.textContent="Show all "+n+" photos";b.onclick=function(){g.classList.remove("cut");b.remove()};g.parentNode.appendChild(b)})();
