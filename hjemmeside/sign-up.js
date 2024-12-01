const signupForm = document.querySelector("#signup-form");
const submitCafeForm = document.querySelector("#submit-cafe-form");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("clicked the button");

    const formData = new FormData(signupForm); //Creates a new FormData object
    const data = Object.fromEntries(formData.entries()); // Converts FormData to plain object

    console.log(data);

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

submitCafeForm.addEventListener("submit", function (event){
    event.preventDefault();
    console.log("Clicked cafe button")

    const cafeFormData = new FormData(submitCafeForm)
    const cafeData = Object.fromEntries(cafeFormData.entries());
    console.log(cafeData);

    const fetchConfiguration = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cafeData)
};

fetch("http://localhost:3000/create-new-cafe", fetchConfiguration)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.error("Error:", error));
});


