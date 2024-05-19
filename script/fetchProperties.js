document.addEventListener('DOMContentLoaded', function () {
    const propertiesList = document.getElementById('properties-list');
    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

    async function loadProperties() {
        try {
            const response = await fetch('https://flexworkspace-backend.onrender.com/api/property', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Include the JWT token in the headers
                }
            });

            const data = await response.json();

            if (response.ok) {
                propertiesList.innerHTML = ''; // Clear existing properties

                if (data.length === 0) {
                    propertiesList.innerHTML = '<p>No properties found.</p>';
                } else {
                    data.forEach(property => {
                        const propertyDiv = document.createElement('div');
                        propertyDiv.classList.add('property');

                        propertyDiv.innerHTML = `
                            <h3>${property.address}</h3>
                            <p>Neighborhood: ${property.neighborhood}</p>
                            <p>Square Feet: ${property.squareFeet}</p>
                            <p>Parking Garage: ${property.parkingGarage ? 'Yes' : 'No'}</p>
                            <p>Public Transport: ${property.publicTransport ? 'Yes' : 'No'}</p>
                        `;

                        propertiesList.appendChild(propertyDiv);
                    });
                }
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    loadProperties();
});
