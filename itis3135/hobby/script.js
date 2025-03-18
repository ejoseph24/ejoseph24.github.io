function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');

    sections.forEach(function(section) {
        section.classList.remove('active');
    });

    var activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    showSection('home');  
});
