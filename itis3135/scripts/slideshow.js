document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slides img");
    const prevBtn = document.querySelector(".slide-btn.prev");
    const nextBtn = document.querySelector(".slide-btn.next");

    let index = 0;

    function updateSlide() {
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        if (index < slides.length - 1) {
            index++;
            updateSlide();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
            index--;
            updateSlide();
        }
    });
});
