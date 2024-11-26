document.getElementById("create-user-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Forhindrer standardformularindsendelse

    // Hent input værdier
    const formData = new FormData(e.target);
    const data = {
        name: formData.get("name"),
        username: formData.get("username"),
        password: formData.get("password"),
    };

    try {
        // Send POST-requesten
        const response = await fetch("fetch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            alert("User created successfully!");
            console.log("Server response:", result);
            e.target.reset(); // Nulstil formular
        } else {
            const error = await response.json();
            alert(`Failed to create user: ${error.message}`);
            console.error("Error response:", error);
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("An error occurred. Please try again.");
    }
});
