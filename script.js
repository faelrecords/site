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
