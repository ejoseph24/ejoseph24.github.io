document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slides img").length;
    let index = 0;
  
    function showSlide() {
      slidesContainer.style.transition = "transform 1s ease-in-out"; 
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  
      index = (index + 1) % totalSlides;
    }
  
    setInterval(showSlide, 3000);
  });
  