
/* Sources: https://www.w3schools.com/js/js_htmldom_eventlistener.asp  &&  https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event*/
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const interest = document.getElementById("interest").value;
    const comments = document.getElementById("comments").value;

    console.log("Form submitted:", { name, email, interest, comments });

});

