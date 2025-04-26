//HTMLInclude.min.js
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
  
 //SEARCH-BAR
  
//===============================================
  
// ADD-TO-CART

// UPDATING CART COUNT, GLOBAL
function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  
    document.querySelectorAll(".shop-item button").forEach(function (button) {
      button.addEventListener("click", function () {
        let product = button.parentElement;
        let productName = product.querySelector("p").innerText;
        cartItems.push(productName);
  
        localStorage.setItem("cart", JSON.stringify(cartItems));
        alert(productName + " had been added to the cart.");
        updateCartCount(); 
      });
    });
  
    let checkoutLink = document.querySelector(".cart a");  
    if (checkoutLink) {
      checkoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "checkout.html";
      });
    }
  
    updateCartCount(); 
  });
  
  //===============================================
  
  //CHECKOUT.HTML
  document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("checkout.html")) { 
        let cartItems = JSON.parse(localStorage.getItem("cart")) || []; 
        let cartList = document.getElementById("cart-list");
        let totalPriceElement = document.createElement("p");
        totalPriceElement.id = "total-price";
        document.querySelector("main").appendChild(totalPriceElement); 
  
        let totalCost = 0;
  
        if (cartItems.length === 0) {
            cartList.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceElement.textContent = "Total: $0.00";
        } else {
            cartItems.forEach(function (item, index) {
                let priceMatch = item.match(/\$(\d+\.\d{2})/);
                let price = priceMatch ? parseFloat(priceMatch[1]) : 0;
                totalCost += price;
  
                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="images/shirt1.jpg" alt="Product Image"> 
                    <p>${item}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartList.appendChild(cartItem);
            });
  
            totalPriceElement.textContent = `Total: $${totalCost.toFixed(2)}`;
  
            document.querySelectorAll(".remove-item").forEach(function (button) {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    cartItems.splice(index, 1); 
                    localStorage.setItem("cart", JSON.stringify(cartItems)); 
                    location.reload();
                    updateCartCount(); 
                });
            });
        }
  
        updateCartCount(); 
    }
  });
  
  //===============================================
  
  //GALLERY
  document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-btn");

    galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
            const largeImageSrc = this.src;
            modalImg.src = '';
            modalImg.src = largeImageSrc;
            modal.style.display = "flex";
            closeBtn.style.display = "block";
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
        closeBtn.style.display = "none";
        modalImg.src = '';
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            closeBtn.style.display = "none";
            modalImg.src = '';
        }
    });
});



  
  //===============================================
  
  // FILTER BY DESIGN
  document.getElementById("design-filter").addEventListener("change", function() {
      var filterValue = this.value;
      var items = document.querySelectorAll(".gallery-item");
    
      items.forEach(function (item) {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block"; 
        } else {
          item.style.display = "none";  
        }
      });
  });
    
  // FILTER BY DESIGN - FOR SHOP
  document.addEventListener("DOMContentLoaded", function () {
    const filterDropdown = document.getElementById("design-filter");
    const shopItems = document.querySelectorAll(".shop-item");
  
    filterDropdown.addEventListener("change", function () {
        const selectedCategory = filterDropdown.value;
  
        shopItems.forEach(function (item) {
            if (selectedCategory === "all" || item.getAttribute("data-category") === selectedCategory) {
                item.style.display = "flex"; 
            } else {
                item.style.display = "none"; 
            }
        });
    });
  });
  