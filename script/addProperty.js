document.addEventListener('DOMContentLoaded', function () {
    const addPropertyForm = document.getElementById('add-property-form');

    addPropertyForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const address = document.getElementById('address').value;
        const neighborhood = document.getElementById('neighborhood').value;
        const squareFeet = document.getElementById('square-feet').value;
        const parkingGarage = document.getElementById('parking-garage').checked;
        const publicTransport = document.getElementById('public-transport').checked;

        const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

        try {
            const response = await fetch('https://flexworkspace-backend.onrender.com/api/property', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Include the JWT token in the headers
                },
                body: JSON.stringify({
                    address,
                    neighborhood,
                    squareFeet,
                    parkingGarage,
                    publicTransport
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Property added successfully
                alert('Property added successfully');
                addPropertyForm.reset();
                // Optionally, you can reload the properties list
                loadProperties();
            } else {
                // Error adding property
                alert(data.errors ? data.errors[0].msg : 'Error adding property');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});

// Define loadProperties function
async function loadProperties() {
    try {
        const response = await fetch('https://flexworkspace-backend.onrender.com/api/property', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token') // Include the JWT token in the headers
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Update DOM to display properties
            // Example: Display properties in a list
            const propertiesList = document.getElementById('properties-list');
            propertiesList.innerHTML = ''; // Clear previous properties
            data.forEach(property => {
                const propertyItem = document.createElement('div');
                propertyItem.textContent = `Address: ${property.address}, Neighborhood: ${property.neighborhood}, Square Feet: ${property.squareFeet}`;
                propertiesList.appendChild(propertyItem);
            });
        } else {
            // Handle error response
            console.error('Error fetching properties:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching properties.');
    }
}

// Call loadProperties function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    loadProperties(); // Initial load of properties
});
