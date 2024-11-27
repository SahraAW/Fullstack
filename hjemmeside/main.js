// Initialize the map (set to Copenhagen's coordinates)
const map = L.map('map').setView([55.6761, 12.5683], 13);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch cafes data from the server
fetch('http://localhost:3000/cafes')
    .then(response => response.json())
    .then(cafes => {
        console.log(cafes)
        cafes.forEach(cafe => {
            // Add a marker for each cafe using its latitude and longitude
            L.marker([cafe.latitude, cafe.longitude]).addTo(map)
                .bindPopup(`<strong>${cafe.name}</strong><br>${cafe.city}`)
                .openPopup();
        });
    })
    .catch(error => {
        console.error('Error fetching cafes data:', error);
    });

document.querySelector("#signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get("name"),
        username: formData.get("username"),
        password: formData.get("password"),
    };

    const response = await fetch("/users/create-new", {
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