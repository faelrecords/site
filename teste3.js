const dropdown=document.querySelector(".t3-dropdown");
const dropdownButton=dropdown?.querySelector("button");
dropdownButton?.addEventListener("click",event=>{
  event.stopPropagation();
  const open=dropdown.classList.toggle("open");
  dropdownButton.setAttribute("aria-expanded",String(open));
});
document.addEventListener("click",()=>dropdown?.classList.remove("open"));

const mobileButton=document.querySelector(".t3-mobile-menu");
const navigation=document.querySelector(".t3-header nav");
mobileButton?.addEventListener("click",()=>{
  const open=navigation.classList.toggle("open");
  mobileButton.setAttribute("aria-expanded",String(open));
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)entry.target.classList.add("visible");
    else if(entry.boundingClientRect.top>0)entry.target.classList.remove("visible");
  });
},{threshold:.16,rootMargin:"0px 0px -40px"});
document.querySelectorAll(".reveal").forEach(element=>observer.observe(element));

const timeline=document.querySelector(".t3-timeline");
const timelineItems=[...document.querySelectorAll(".t3-timeline article")];
let timelineFrame=0;
function updateTimeline(){
  timelineFrame=0;
  if(!timeline)return;
  const rect=timeline.getBoundingClientRect();
  const start=innerHeight*.72;
  const end=innerHeight*.28;
  const progress=Math.max(0,Math.min(1,(start-rect.top)/(rect.height+start-end)));
  timeline.style.setProperty("--line-progress",progress.toFixed(3));
  timelineItems.forEach(item=>{
    const itemRect=item.getBoundingClientRect();
    item.classList.toggle("timeline-active",itemRect.top<innerHeight*.72);
  });
}
function requestTimeline(){
  if(!timelineFrame)timelineFrame=requestAnimationFrame(updateTimeline);
}
updateTimeline();
addEventListener("scroll",requestTimeline,{passive:true});
addEventListener("resize",requestTimeline,{passive:true});

document.querySelector(".t3-form")?.addEventListener("submit",event=>{
  event.preventDefault();
  event.currentTarget.classList.add("sent");
});
