async function fetchProperties() {
    const propertiesContainer = document.getElementById('properties-container');
    const modal = document.getElementById('property-modal');
    const modalContent = document.getElementById('modal-property-details');
    const closeModal = document.querySelector('.close');

    try {
        const response = await fetch('https://flexworkspace-backend.onrender.com/api/properties', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Update DOM to display properties as cards
            propertiesContainer.innerHTML = ''; // Clear previous properties
            data.forEach(property => {
                const propertyCard = document.createElement('div');
                propertyCard.className = 'property-card';
                propertyCard.innerHTML = `
                    <p>${property.city}, ${property.province}</p>
                    <p>${property.workspaceType}</p>
                    <p>$${property.price} per ${property.leaseTerm}</p>
                `;

                // Add click event to open the modal with property details
                propertyCard.addEventListener('click', () => {
                    showModal(property);
                });

                propertiesContainer.appendChild(propertyCard);
            });
        } else {
            // Handle error response
            console.error('Error fetching properties:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching properties.');
    }

    // Function to show the modal with property details
    function showModal(property) {
        modalContent.innerHTML = `
            <p>Address: ${property.address}</p>
            <p>Neighborhood: ${property.neighborhood}</p>
            <p>City: ${property.city}</p>
            <p>Province: ${property.province}</p>
            <p>Workspace Type: ${property.workspaceType}</p>
            <p>Square Feet: ${property.squareFeet}</p>
            <p>Parking Garage Included: ${property.parkingGarage ? 'Yes' : 'No'}</p>
            <p>Near Public Transportation: ${property.publicTransport ? 'Yes' : 'No'}</p>
        `;
        modal.style.display = 'block';
    }

    // Close modal when user clicks on the close button
    // if (closeModal) {
    //     closeModal.addEventListener('click', function () {
    //         modal.style.display = 'none';
    //     });
    // } else {
    //     console.error('Close button not found.');
    // }

    const close = document.querySelectorAll('.close');
    close.forEach(function (button) {
        button.addEventListener('click', function() {
            const modal = this.parentElement.parentElement;
            modal.style.display = 'none';
        })
    });

    // Close modal when user clicks outside of the modal
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// Call fetchProperties function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    fetchProperties(); // Initial load of properties
});


// // display-properties.js

// async function fetchProperties() {
//     const propertiesContainer = document.getElementById('properties-container');
//     const modal = document.getElementById('property-modal');
//     const modalContent = document.getElementById('modal-property-details');

//     // Function to show the modal with property details
//     function showModal(property) {
//         modalContent.innerHTML = `
//             <p>Address: ${property.address}</p>
//             <p>Neighborhood: ${property.neighborhood}</p>
//             <p>City: ${property.city}</p>
//             <p>Province: ${property.province}</p>
//             <p>Workspace Type: ${property.workspaceType}</p>
//             <p>Square Feet: ${property.squareFeet}</p>
//             <p>Parking Garage Included: ${property.parkingGarage ? 'Yes' : 'No'}</p>
//             <p>Near Public Transportation: ${property.publicTransport ? 'Yes' : 'No'}</p>
//         `;
//         modal.style.display = 'block';

//         // Add event listener to close button inside showModal function
//         const closeModal = document.querySelector('.close');
//         closeModal.onclick = function () {
//             modal.style.display = 'none';
//         }
        
//         // Close modal when user clicks outside of the modal
//         window.onclick = function (event) {
//             if (event.target == modal) {
//                 modal.style.display = 'none';
//             }
//         }
//     }
//     try {
//         const response = await fetch('https://flexworkspace-backend.onrender.com/api/properties', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         const data = await response.json();

//         if (response.ok) {
//             // Update DOM to display properties as cards
//             propertiesContainer.innerHTML = ''; // Clear previous properties
//             data.forEach(property => {
//                 const propertyCard = document.createElement('div');
//                 propertyCard.className = 'property-card';
//                 propertyCard.innerHTML = `
//                     <p>${property.city}, ${property.province}</p>
//                     <p>${property.workspaceType}</p>
//                     <p>$${property.price} per ${property.leaseTerm}</p>
                    
//                 `;

//                 // Add click event to open the modal with property details
//                 propertyCard.addEventListener('click', () => {
//                     showModal(property);
//                 });

//                 propertiesContainer.appendChild(propertyCard);
//             });
//         } else {
//             // Handle error response
//             console.error('Error fetching properties:', data.message);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred while fetching properties.');
//     }
// }

// // Call fetchProperties function when the DOM content is loaded
// document.addEventListener('DOMContentLoaded', function () {
//     fetchProperties(); // Initial load of properties
// });