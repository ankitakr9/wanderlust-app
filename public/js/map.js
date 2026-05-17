// Check if geometry exists
if (
  listing.geometry &&
  listing.geometry.coordinates &&
  listing.geometry.coordinates.length === 2
) {
  // Leaflet uses [latitude, longitude]
  const coordinates = [
    listing.geometry.coordinates[1],
    listing.geometry.coordinates[0],
  ];

  // Create map
  const map = L.map("map").setView(coordinates, 9);

  // OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Marker
  L.marker(coordinates)
    .addTo(map)
    .bindPopup(
      `<div class="map-click">
        <h4><b>${listing.title}</b></h4>
        <p>Exact location will be provided after booking.</p>
      </div>`
    )
    .openPopup();
}