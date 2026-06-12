const dropdown=document.querySelector(".t2-dropdown");
const dropdownButton=dropdown?.querySelector("button");
dropdownButton?.addEventListener("click",event=>{
  event.stopPropagation();
  const open=dropdown.classList.toggle("open");
  dropdownButton.setAttribute("aria-expanded",String(open));
});
document.addEventListener("click",()=>dropdown?.classList.remove("open"));

const mobileButton=document.querySelector(".t2-mobile-menu");
const navigation=document.querySelector(".t2-header nav");
mobileButton?.addEventListener("click",()=>navigation.classList.toggle("open"));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)entry.target.classList.add("visible");
    else if(entry.boundingClientRect.top>0)entry.target.classList.remove("visible");
  });
},{threshold:.16,rootMargin:"0px 0px -40px"});

document.querySelectorAll(".reveal").forEach((element,index)=>{
  if(index%3===1)element.classList.add("from-left");
  observer.observe(element);
});
