document.querySelector("#signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        email: formData.get("email"),
        username: formData.get("username"),
    };

    const response = await fetch("http://localhost:3000/users/create-new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json();
        alert("User created successfully!");
        console.log("Server response:", result);
        e.target.reset(); // Denne linje reseter inputfeltet
    } else {
        const error = await response.json();
        alert(`Failed to create user: ${error.message}`);
        console.error("Error response:", error);
    }
});
