function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function updateLocation() {
    var address = document.getElementById('address').value;
    var neighborhood = document.getElementById('neighborhood').value;
    var locationValue = address + (neighborhood ? ', ' + neighborhood : '');
    document.getElementById('locationValue').innerText = locationValue;
    toggleDropdown('locationDropdown');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.location-label') && !event.target.matches('.location-value') && !event.target.matches('.dropdown input')) {
        var dropdowns = document.getElementsByClassName("dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
}
