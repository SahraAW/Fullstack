const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("clicked the button");

    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries()); // Convert to plain object

    console.log(data); // Logs the object

    const fetchConfiguration = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // Send as JSON
    };

    fetch("http://localhost:3000/create-new", fetchConfiguration)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.error("Error:", error));
});
