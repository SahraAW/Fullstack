// Initialize the map (set to Copenhagen's coordinates)
const map = L.map('map').setView([55.6761, 12.5683], 13);


// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Et stort tomt array, hvor markøerne gemmes, de bliver gemt som et objekt
let cafeMarkers = [];


//Først sendes en HTTP-anmodning til serveren for at hente dataen
fetch('http://localhost:3000/cafes')

    //Svar modtages, og bliver konventeret til JSON
    .then(response => response.json())
    .then(cafes => {

        //Her loopes der igennem hver cafe, og der oprettes en markør for kortet via latitude og longitude
        cafes.forEach(cafe => {
            const marker = L.marker([cafe.latitude, cafe.longitude])

                //Når en markør klikkes på, popper der en besked op med navn og område.
                .bindPopup(`<strong>${cafe.name}</strong><br>${cafe.city}`)
                .addTo(map);

            //Her logges caféns navn og område til konsollen.
            console.log(`Adding marker: ${cafe.name} in ${cafe.city}`);

            // Her bliver markøerne gemt i cafeMarkers i det ellers tomme array, samt området den ligger i
            cafeMarkers.push({ marker, area: cafe.city });
        });
    })

    //Denne linje vil advare i konsollen hvis der er problemer ved hentning af data.
    .catch(error => {
        console.error('Error fetching cafes data:', error);
    });


// Markørerne bliver filtreret
function filterCafes(area) {

    // Først fjernes alle markøer fra kortet
    cafeMarkers.forEach(item => {
        map.removeLayer(item.marker);
    });

    // Så filtreres cafeMarkers arrayet, for at vise markøerne med et specifikt område.
    // === 'All' hvis alt bliver valgt
    const filteredMarkers = cafeMarkers.filter(item =>
        area === 'All' || item.area.toLowerCase() === area.toLowerCase()
    );

    // De filtrede markøer kommer tilbage til kortet
    filteredMarkers.forEach(item => {
        item.marker.addTo(map);
    });
}


// Vælger alle elementer med klassen filter-btn
document.querySelectorAll('.filter-btn').forEach(button => {

    //Når knappen klikkes, hentes værdien af data-area attribut fra knappen
    button.addEventListener('click', function () {
        const area = this.getAttribute('data-area');

        // Til sidst kaldes filterCafes funktionen, med det valgte område of kortet bliver opdateret
        filterCafes(area);
    });
});
