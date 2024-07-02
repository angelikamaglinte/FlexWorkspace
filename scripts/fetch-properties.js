// Define loadProperties function in the global scope
async function loadProperties() {
    const propertiesList = document.getElementById('properties-list');
    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
    const userId = localStorage.getItem('userId'); // Retrieve the user's ID from local storage

    try {
        const response = await fetch('https://flexworkspace-backend.onrender.com/api/property', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token, // Include the JWT token in the headers
                'x-user-id': userId // Include the user's ID in the headers
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Update DOM to display properties
            propertiesList.innerHTML = ''; // Clear previous properties

            data.forEach(property => {
                const propertyItem = document.createElement('div');
                propertyItem.innerHTML = `
                    <p>Address: ${property.address}</p>
                    <p>Neighborhood: ${property.neighborhood}</p>
                    <p>City: ${property.city}</p>
                    <p>Province: ${property.province}</p>
                    <p>Workspace Type: ${property.workspaceType}</p>
                    <p>Square Feet: ${property.squareFeet}</p>
                    <p>Lease Term: ${property.leaseTerm}</p>
                    <p>Price: ${property.price}</p>
                    <p>Parking Garage Included: ${property.parkingGarage ? 'Yes' : 'No'}</p>
                    <p>Near Public Transportation: ${property.publicTransport ? 'Yes' : 'No'}</p>
                `;
                propertiesList.appendChild(propertyItem);
            });

            // data.forEach(property => {
            //     const propertyItem = document.createElement('div');
            //     propertyItem.textContent = `
            //         Address: ${property.address}, 
            //         Neighborhood: ${property.neighborhood},
            //         City: ${property.city},
            //         Province: ${property.province},
            //         Workspace Type: ${property.workspaceType},
            //         Square Feet: ${property.squareFeet},
            //         Lease Term: ${property.leaseTerm},
            //         Price: ${property.price},
            //         Parking Garage Included: ${property.parkingGarage ? 'Yes' : 'No'},
            //         Near Public Transportation: ${property.publicTransport ? 'Yes' : 'No'}
            //         `;
            //     propertiesList.appendChild(propertyItem);
            // });
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
