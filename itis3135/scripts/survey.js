document.addEventListener("DOMContentLoaded", function () {
    const coursesBox = document.getElementById("coursesbox");
    const addCourseButton = document.getElementById("addcourse"); 

    if (!coursesBox || !addCourseButton) {
        console.error("Courses box or Add Course button not found.");
        return;
    }

    function addCourseField() {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course-entry");

        const newCourse = document.createElement("input");
        newCourse.setAttribute("type", "text");
        newCourse.setAttribute("name", "courses[]");
        newCourse.setAttribute("class", "course-input");
        newCourse.setAttribute("placeholder", "ITIS 3135");

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.type = "button";
        deleteButton.classList.add("delete-course");
        deleteButton.onclick = function () {
            courseDiv.remove();
            toggleDeleteButtons();
        };

        courseDiv.appendChild(newCourse);
        courseDiv.appendChild(deleteButton);
        coursesBox.appendChild(courseDiv);

        toggleDeleteButtons();
    }

    function toggleDeleteButtons() {
        const deleteButtons = document.querySelectorAll(".delete-course");
        deleteButtons.forEach(button => {
            button.style.display = deleteButtons.length > 0 ? "inline-block" : "none";
        });
    }

    addCourseButton.addEventListener("click", addCourseField);
});
