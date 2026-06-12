const menu=document.querySelector(".menu");
const links=document.querySelector(".links");
const navDropdown=document.querySelector(".nav-dropdown");

menu.addEventListener("click",()=>{
  const open=links.classList.toggle("open");
  menu.setAttribute("aria-expanded",String(open));
});

if(navDropdown){
  const trigger=navDropdown.querySelector("button");
  trigger.addEventListener("click",event=>{
    event.stopPropagation();
    const open=navDropdown.classList.toggle("open");
    trigger.setAttribute("aria-expanded",String(open));
  });
  document.addEventListener("click",()=>{
    navDropdown.classList.remove("open");
    trigger.setAttribute("aria-expanded","false");
  });
}

document.querySelectorAll(".faq article").forEach(item=>{
  item.querySelector("button").addEventListener("click",()=>{
    item.classList.toggle("open");
  });
});

const phoneRender=document.querySelector(".phone-stage");
const phoneSection=document.querySelector(".phone-showcase");
const phoneStates=[...document.querySelectorAll(".phone-state")];
const phoneDots=[...document.querySelectorAll(".phone-progress i")];
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
let phoneFrame=0;

function animatePhone(){
  phoneFrame=0;
  if(!phoneRender||!phoneSection||reducedMotion.matches)return;

  const rect=phoneSection.getBoundingClientRect();
  const start=Math.max(0,phoneSection.offsetTop-window.innerHeight*.16);
  const travel=Math.max(480,phoneSection.offsetHeight);
  const progress=Math.max(0,Math.min(1,(scrollY-start)/travel));
  const state=Math.min(2,Math.floor(progress*3));
  phoneStates.forEach((image,index)=>image.classList.toggle("is-active",index===state));
  phoneDots.forEach((dot,index)=>dot.classList.toggle("active",index===state));
}

function requestPhoneFrame(){
  if(!phoneFrame)phoneFrame=requestAnimationFrame(animatePhone);
}

if(phoneRender){
  animatePhone();
  addEventListener("scroll",requestPhoneFrame,{passive:true});
  addEventListener("resize",requestPhoneFrame,{passive:true});
  reducedMotion.addEventListener("change",requestPhoneFrame);
}
