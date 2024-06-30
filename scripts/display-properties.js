// display-properties.js

document.addEventListener('DOMContentLoaded', async function () {
    const propertiesContainer = document.getElementById('properties-container');
    
    // Fetch workspaces when the document is loaded
    await fetchWorkspaces(propertiesContainer);
});

async function fetchWorkspaces(container) {
    // Set up the URL for fetching properties
    const url = 'https://flexworkspace-backend.onrender.com/api/property';

    try {
        // Fetch properties from the backend
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // No token needed here, since this is for displaying all properties
            }
        });

        // Parse the JSON response
        const data = await response.json();

        if (response.ok) {
            // Clear any existing content
            container.innerHTML = '';

            // Populate the container with properties
            data.forEach(property => {
                const propertyElement = document.createElement('div');
                propertyElement.classList.add('property-item');
                propertyElement.innerHTML = `
                    <h3>${property.title}</h3>
                    <p>Address: ${property.address}</p>
                    <p>Neighborhood: ${property.neighborhood}</p>
                    <p>Square Feet: ${property.squareFeet}</p>
                `;
                container.appendChild(propertyElement);
            });
        } else {
            console.error('Error fetching workspaces:', data.message);
            container.innerHTML = '<p>Failed to load workspaces.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>An error occurred while fetching workspaces.</p>';
    }
}
