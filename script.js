const menu=document.querySelector(".menu");
const links=document.querySelector(".links");

menu.addEventListener("click",()=>{
  const open=links.classList.toggle("open");
  menu.setAttribute("aria-expanded",String(open));
});

document.querySelectorAll(".faq article").forEach(item=>{
  item.querySelector("button").addEventListener("click",()=>{
    item.classList.toggle("open");
  });
});

const phoneRender=document.querySelector(".phone-render");
const phoneSection=document.querySelector(".phone-showcase");
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
let phoneFrame=0;

function animatePhone(){
  phoneFrame=0;
  if(!phoneRender||!phoneSection||reducedMotion.matches)return;

  const rect=phoneSection.getBoundingClientRect();
  const start=Math.max(0,phoneSection.offsetTop-window.innerHeight*.12);
  const travel=Math.max(420,phoneSection.offsetHeight*.9);
  const progress=Math.max(0,Math.min(1,(scrollY-start)/travel));
  const mobile=window.innerWidth<=650;

  phoneRender.style.setProperty("--phone-rx",`${(Math.sin(progress*Math.PI*2)*(mobile?3:6)).toFixed(2)}deg`);
  phoneRender.style.setProperty("--phone-ry",`${(progress*360).toFixed(2)}deg`);
  phoneRender.style.setProperty("--phone-rz",`${(Math.sin(progress*Math.PI*2)*(mobile?1:2)).toFixed(2)}deg`);
  phoneRender.style.setProperty("--phone-y",`${(-Math.sin(progress*Math.PI)*(mobile?10:20)).toFixed(1)}px`);
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
