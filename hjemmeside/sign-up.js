const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("clicked the button");

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#formPassword").value; // Brug password direkte

    console.log(username);
    console.log(email);
    console.log(password);

    const data = {
        username: username,
        email: email,
        password_hash: password // Send password direkte
    };

    const fetchConfiguration = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // Data sendes som JSON
    };

    fetch("http://localhost:3000/create-new", fetchConfiguration)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error("Error:", err));
});
