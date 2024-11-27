// Variabler
const username = document.querySelector("#username");
const submitBTN = document.querySelector("#submitBTN");
const email = document.querySelector("#email");

// Click event til knappen
submitBTN.addEventListener("click", async function (e) {
    e.preventDefault();  // Prevent form from submitting normally

    const user = username.value;
    const userEmail = email.value;

    console.log("Username:", user);
    console.log("Email:", userEmail);

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

    // Tgaer svaret som result
    response.json().then(result => {
        console.log("Server response:", result);
    });
});
