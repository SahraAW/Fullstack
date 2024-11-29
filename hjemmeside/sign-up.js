const signupForm = document.querySelector("#signup-form");


signupForm.addEventListener("click", function (event) {
    event.preventDefault();  // Prevent form from submitting normally
    console.log("clicked the button")
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#formPassword").value;

    //const user = username.value;
    //const userEmail = email.value;

    //const formData = new FormData(event.target);
    console.log(username)
    console.log(email)
    console.log(password)

    const data = {
        username: username,
        email: email,
        password: password
    };
    // Fetch request til at sende dataen
    const fetchConfiguration = {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    }

    fetch("http://localhost:3000/create-new", fetchConfiguration)
        .then(res => res.json())
        .then(res => console.log(res));

    // Tager svaret som result
});

/*
// Variabler
const username = document.querySelector("#username");
const signupForm = document.querySelector("#submitBTN");
const email = document.querySelector("#email");

// Click event til knappen
signupForm.addEventListener("click", async function (event) {
    event.preventDefault();  // Prevent form from submitting normally

    const user = username.value;
    const userEmail = email.value;

    const formData = new FormData(e.target);
    const data = {
        name: formData.get("name"),
        username: formData.get("username"),
        password: formData.get("password")
    };

    // Fetch request til at sende dataen
    const response = await fetch("opret.html", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    // Tager svaret som result
    response.json().then(result => {
        console.log("Server response:", result);
    });
});
 */