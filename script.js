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
  const travel=window.innerHeight+rect.height;
  const progress=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/travel));
  const centered=(progress-.5)*2;
  const mobile=window.innerWidth<=650;

  phoneRender.style.setProperty("--phone-rx",`${(-centered*(mobile?3:7)).toFixed(2)}deg`);
  phoneRender.style.setProperty("--phone-ry",`${(centered*(mobile?7:16)).toFixed(2)}deg`);
  phoneRender.style.setProperty("--phone-rz",`${(-centered*(mobile?1:2.5)).toFixed(2)}deg`);
  phoneRender.style.setProperty("--phone-y",`${(-progress*(mobile?12:24)).toFixed(1)}px`);
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
