!function(l,d){l.HTMLInclude||(l.HTMLInclude=function(){function r(t,e){return t.getBoundingClientRect().top<=+e+l.innerHeight}function a(t,e){var o=new XMLHttpRequest;o.onreadystatechange=function(){4==o.readyState&&200==o.status&&e.forEach(function(t){var e=t.getAttribute("data-replace"),n=o.responseText;e&&e.split(",").forEach(function(t){var e=t.trim().split(":");n=n.replace(new RegExp(e[0],"g"),e[1])}),t.outerHTML=n;for(var r=(new DOMParser).parseFromString(n,"text/html").querySelectorAll("SCRIPT"),a=0,i=r.length;a<i;){var c=d.createElement("SCRIPT");r[a].src?c.src=r[a].src:c.innerHTML=r[a].innerHTML,d.head.appendChild(c),a++}})},o.open("GET",t,!0),o.send()}function t(e,n){l.addEventListener("scroll",function t(){r(e,n)&&(l.removeEventListener("scroll",t),a(e.getAttribute("data-include"),[e]))})}for(var e={},n=d.querySelectorAll("[data-include]:not([data-in])"),i=n.length;i--;){var c=n[i].getAttribute("data-include"),o=n[i].getAttribute("data-lazy");n[i].setAttribute("data-in",""),!o||o&&r(n[i],o)?(e[c]=e[c]||[],e[c].push(n[i])):t(n[i],o)}for(var u in e)a(u,e[u])}),l.HTMLInclude()}(window,document);



//===============================================










// FILTER BY DESIGN
document.getElementById("design-filter").addEventListener("change", function() {
    var filterValue = this.value;
    var items = document.querySelectorAll(".gallery-item");
  
    items.forEach(function(item) {
      if (filterValue === "all" || item.classList.contains(filterValue)) {
        item.style.display = "block"; 
      } else {
        item.style.display = "none";  
      }
    });
});
  