// Set initial map coordinates and zoom level
let map = L.map('map').setView([36.349132101140932, -119.3214723081099], 8);

// Add layer
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);

// Define colors for each range of magnitudes
function colorSelector(magnitude){
    let color = "";
    if(magnitude >= 5){
        color = 'darkred'
    }else if(magnitude >= 4){
        color = 'red'
    }else if(magnitude >= 3){
        color = 'orange'
    }else if(magnitude >= 2){
        color = 'yellow'
    }else if(magnitude >= 1){
        color = 'lightgreen'
    }else{
        color = 'green'
    }
    return color
}


// Read data"
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
    .then(data =>{
        console.log(data)
        data.features.forEach(d =>{
        
            // gathering magnitude of earthquaques and transform in integer
            let magnitude = +d.properties.mag

            L.circle([d.geometry.coordinates[1], d.geometry.coordinates[0]],{
                fillOpacity: 0.7,
                color: "black",
                weight: 0.4,
                fillColor: colorSelector(magnitude),
                radius: (d.properties.mag * d.properties.mag * 1000),
            })  
            .bindPopup(`<h3>${d.properties.place}</h3> <hr> <h3>Points: ${d.properties.mag}</h3> <hr><p>${Date(d.properties.time)}</p>`)
            .addTo(map)
        })
    
})