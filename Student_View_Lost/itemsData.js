const API_URL = 'http://localhost:5000/api/lost-items';

// Function to get all items
async function getAllLostItems() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}

// Function to add a new item
async function addLostItem(item) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding item:', error);
        return null;
    }
}

// Function to display items
function displayItems(items) {
    const itemsContainer = document.querySelector('.items-container');
    if (!itemsContainer) return;
    
    itemsContainer.innerHTML = '';
    
    if (items.length === 0) {
        itemsContainer.innerHTML = '<div class="no-results">No items found</div>';
        return;
    }
    
    items.forEach(item => {
        const itemCard = `
            <div class="item-card">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='/assets/default-image.jpg'">
                <h3>${item.name}</h3>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Date Found:</strong> ${item.dateFound}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Claim Requirement:</strong> ${item.claimRequirement}</p>
            </div>
        `;
        itemsContainer.innerHTML += itemCard;
    });
}

// Initialize display when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    const itemsContainer = document.getElementById('itemsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Get initial items
    let currentItems = await getAllLostItems();
    
    // Display initial items
    displayItems(currentItems);
    
    // Set up search functionality
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', async function() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const response = await fetch(`${API_URL}/search?term=${searchTerm}`);
            const filteredItems = await response.json();
            displayItems(filteredItems);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
});

// Export functions
window.addLostItem = addLostItem;
window.getAllLostItems = getAllLostItems;
window.displayItems = displayItems; 