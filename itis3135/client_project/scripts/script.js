!(function (l, d) {
  if (!l.HTMLInclude) {
      l.HTMLInclude = function () {
          function isElementInViewport(el, offset) {
              return el.getBoundingClientRect().top <= +offset + l.innerHeight;
          }

          function loadHTML(url, elements) {
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4 && xhr.status === 200) {
                      elements.forEach(function (el) {
                          var replaceAttr = el.getAttribute("data-replace");
                          var responseHTML = xhr.responseText;

                          if (replaceAttr) {
                              replaceAttr.split(",").forEach(function (pair) {
                                  var parts = pair.trim().split(":");
                                  responseHTML = responseHTML.replace(new RegExp(parts[0], "g"), parts[1]);
                              });
                          }

                          el.outerHTML = responseHTML;

                          var parsedHTML = new DOMParser().parseFromString(responseHTML, "text/html");
                          var scripts = parsedHTML.querySelectorAll("script");

                          scripts.forEach(function (script) {
                              var newScript = d.createElement("script");
                              if (script.src) {
                                  newScript.src = script.src;
                              } else {
                                  newScript.innerHTML = script.innerHTML;
                              }
                              d.head.appendChild(newScript);
                          });
                      });
                  }
              };

              xhr.open("GET", url, true);
              xhr.send();
          }

          function lazyLoadElement(el, offset) {
              l.addEventListener("scroll", function onScroll() {
                  if (isElementInViewport(el, offset)) {
                      l.removeEventListener("scroll", onScroll);
                      loadHTML(el.getAttribute("data-include"), [el]);
                  }
              });
          }

          var elementsToLoad = {};
          var elements = d.querySelectorAll("[data-include]:not([data-in])");

          elements.forEach(function (el) {
              var url = el.getAttribute("data-include");
              var lazyOffset = el.getAttribute("data-lazy");

              el.setAttribute("data-in", "");

              if (!lazyOffset || (lazyOffset && isElementInViewport(el, lazyOffset))) {
                  elementsToLoad[url] = elementsToLoad[url] || [];
                  elementsToLoad[url].push(el);
              } else {
                  lazyLoadElement(el, lazyOffset);
              }
          });

          for (var url in elementsToLoad) {
              loadHTML(url, elementsToLoad[url]);
          }
      };

      l.HTMLInclude();
  }
})(window, document);



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
  