document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const coursesBox = document.getElementById("coursesbox");
    const addCourseButton = document.getElementById("addcourse");

    function getCourseList() {
        const courseInputs = document.querySelectorAll("input[name='courses[]']");
        const descriptionInputs = document.querySelectorAll("input[name='courseDescriptions[]']");
        let courseList = '';

        courseInputs.forEach((input, index) => {
            const courseName = input.value;
            const courseDescription = descriptionInputs[index].value;
            if (courseName && courseDescription) {
                courseList += `<li><strong>${courseName}:</strong> ${courseDescription}</li>`;
            }
        });

        return courseList;
    }
    
    function displayResults() {
        const name = form.name.value;
        const mascot = form.mascot.value;
        const imgCaption = form.imgcaption.value;
        const personalBackground = form.personalbackground.value;
        const profBackground = form.profbackground.value;
        const acadBackground = form.acadbackground.value;
        const webBackground = form.webbackground.value;
        const computerPlatform = form.computerplatform.value;
        const funny = form.funny.value;
        const otherItems = form.otheritems.value;

        const userImage = document.getElementById('userimage').files[0];
        const imageUrl = URL.createObjectURL(userImage);

        const introPage = `
            <h1>Introduction</h1>
            <h2>${name} || ${mascot}</h2>
            <img src="${imageUrl}" alt="User Image">
            <p><em>Image Caption: ${imgCaption}</em></p>
            <p><strong>Personal Background: </strong>${personalBackground}</p>
            <p><strong>Professional Background: </strong>${profBackground}</p>
            <p><strong>Academic Background: </strong>${acadBackground}</p>
            <p><strong>Background in Web Development: </strong>${webBackground}</p>
            <p><strong>Primary Computer Platform: </strong>${computerPlatform}</p>
            <h4>Courses Currently Taking:</h4>
            <ul>
            ${getCourseList()}
            </ul>
            <p><strong>Funny Thing: </strong>${funny}</p>
            <p><strong>Other Items: </strong>${otherItems}</p> 
        `;

        document.querySelector('main').innerHTML = introPage;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.name.value.trim() || !form.mascot.value.trim() || !form.agreement.checked) {
            alert("Please fill in all required fields and agree to the terms.");
            return;
        }
        displayResults();
    });



    document.querySelector("input[type='reset']").addEventListener("click", () => {
        form.reset();
        coursesBox.innerHTML = "";
    });

    addCourseButton.addEventListener("click", () => {
        const courseDiv = document.createElement("div");
        courseDiv.innerHTML = `
            <input type="text" name="courses[]" placeholder="ITSC 1600">
            <input type="text" name="courseDescriptions[]" placeholder="I like learning about...">
            <button type="button" class="delete-course">Delete</button>
        `;
        courseDiv.querySelector(".delete-course").addEventListener("click", () => {
            courseDiv.remove();
        });    
        coursesBox.appendChild(courseDiv);
    });

  
    function loadImage() {
        var image = document.getElementById('introImage').files[0];
        const imageUrl = URL.createObjectURL(image);
        var text = "<img src=\"" + imageUrl + "\" >";
        document.getElementById('loadImage').innerHTML = text;
    }
});
