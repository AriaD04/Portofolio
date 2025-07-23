// Map Configuration
const map = L.map('map').setView([0.9268, 104.4560], 16);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Custom Icon
const kelurahanIcon = L.divIcon({
    html: '<i class="bi bi-building-fill" style="color: #dc3545; font-size: 24px;"></i>',
    iconSize: [30, 30],
    className: 'custom-div-icon'
});

// Marker
const kelurahanMarker = L.marker([0.9268, 104.4560], { icon: kelurahanIcon }).addTo(map);
kelurahanMarker.bindPopup(`
    <div class="popup-content">
        <h6><strong>Kantor Kelurahan Tanjungpinang Kota</strong></h6>
        <p><i class="bi bi-geo-alt"></i> Jl. Mesjid No.7, Tanjungpinang Kota</p>
        <p><i class="bi bi-telephone"></i> (0771) 123456</p>
        <p><i class="bi bi-clock"></i> Senin-Jumat: 08:00 - 16:00 WIB</p>
    </div>
`);

// Circle Area
L.circle([0.9268, 104.4560], {
    color: '#198754',
    fillColor: '#198754',
    fillOpacity: 0.1,
    radius: 300
}).addTo(map).bindPopup("Area Pelayanan Kelurahan");
