// Clear existing items in localStorage
localStorage.removeItem('lostItems');

// Initial hardcoded items
const initialItems = [
    {
        id: 1,
        name: "Black Leather Wallet",
        location: "Library",
        dateFound: "Feb 10, 2025",
        description: "Black wallet with multiple cards inside.",
        claimRequirement: "Provide a valid ID matching the name on the cards.",
        image: "/assets/leather wallet.jpg"
    },
    {
        id: 2,
        name: "Set of House Keys",
        location: "Main Hall",
        dateFound: "Feb 12, 2025",
        description: "Keychain with three silver keys and a red tag.",
        claimRequirement: "Describe the red tag in detail.",
        image: "/assets/pair-of-keys.jpg"
    },
    {
        id: 3,
        name: "iPhone 12",
        location: "Cafeteria",
        dateFound: "Feb 14, 2025",
        description: "Black iPhone with a cracked screen protector.",
        claimRequirement: "Unlock the phone or provide proof of ownership.",
        image: "/assets/apple-iphone-12.jpg"
    },
    {
        id: 4,
        name: "Blue Backpack",
        location: "Gym Locker Room",
        dateFound: "Feb 16, 2025",
        description: "Contains books and a water bottle.",
        claimRequirement: "Describe the books inside.",
        image: "/assets/blue backpack.jpg"
    },
    {
        id: 5,
        name: "Scientific Calculator",
        location: "Physics Laboratory",
        dateFound: "Feb 18, 2025",
        description: "Casio FX-991ES Plus calculator with name engraved.",
        claimRequirement: "State the name engraved on the calculator.",
        image: "/assets/scientific-calculator.jpg"
    },
    {
        id: 6,
        name: "Gold Necklace",
        location: "Girls Restroom",
        dateFound: "Feb 19, 2025",
        description: "14k gold chain with heart pendant.",
        claimRequirement: "Describe any unique markings or inscriptions.",
        image: "/assets/golden-heart-pendant.jpg"
    },
    {
        id: 7,
        name: "Student ID Card",
        location: "Computer Laboratory",
        dateFound: "Feb 20, 2025",
        description: "BSU Student ID for Academic Year 2024-2025",
        claimRequirement: "Verify identity with another valid ID.",
        image: "/assets/student id card.jpg"
    },
    {
        id: 8,
        name: "USB Flash Drive",
        location: "Engineering Building",
        dateFound: "Feb 21, 2025",
        description: "32GB SanDisk flash drive with blue casing",
        claimRequirement: "Describe the contents of the drive.",
        image: "/assets/usb-flash-memory.jpg"
    },
    {
        id: 9,
        name: "Prescription Glasses",
        location: "Student Lounge",
        dateFound: "Feb 22, 2025",
        description: "Black-rimmed glasses with brown case",
        claimRequirement: "Try on glasses to verify prescription.",
        image: "/assets/glasses.jpg"
    },
    {
        id: 10,
        name: "Wireless Earbuds",
        location: "Basketball Court",
        dateFound: "Feb 23, 2025",
        description: "White wireless earbuds with charging case",
        claimRequirement: "Connect to device to prove ownership.",
        image: "/assets/wireless-earbuds.jpg"
    },
    {
        id: 11,
        name: "Textbook",
        location: "Study Hall",
        dateFound: "Feb 24, 2025",
        description: "Advanced Calculus textbook with highlighted pages",
        claimRequirement: "Show proof of enrollment in the course.",
        image: "/assets/workbook.jpg"
    },
    {
        id: 12,
        name: "Water Bottle",
        location: "Sports Complex",
        dateFound: "Feb 25, 2025",
        description: "Stainless steel water bottle with stickers",
        claimRequirement: "Describe the stickers on the bottle.",
        image: "/assets/bottle.jpg"
    }
];

// Force initialize localStorage with hardcoded items
localStorage.setItem('lostItems', JSON.stringify(initialItems));

// Function to add a new item
function addLostItem(item) {
    let items = JSON.parse(localStorage.getItem('lostItems')) || initialItems;
    
    // Generate new ID if not provided
    if (!item.id) {
        const maxId = Math.max(...items.map(item => item.id || 0), 0);
        item.id = maxId + 1;
    }
    
    // Add the new item to the beginning of the array
    items.unshift(item);
    
    // Save to localStorage
    localStorage.setItem('lostItems', JSON.stringify(items));
    
    // Return the updated items array
    return items;
}

// Function to get all items
function getAllLostItems() {
    return JSON.parse(localStorage.getItem('lostItems')) || initialItems;
}

// Export functions if needed
window.addLostItem = addLostItem;
window.getAllLostItems = getAllLostItems;

// Ensure items are initialized when the file loads
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('lostItems')) {
        console.log('Initializing items in localStorage');
        localStorage.setItem('lostItems', JSON.stringify(initialItems));
    }

    // Get the container where items will be displayed
    const itemsContainer = document.querySelector('.items-container');
    
    // Get all items from localStorage
    const items = getAllLostItems();
    
    // Display items
    function displayItems(items) {
        itemsContainer.innerHTML = ''; // Clear existing items
        
        if (items.length === 0) {
            itemsContainer.innerHTML = '<div class="no-results">No items found</div>';
            return;
        }
        
        items.forEach(item => {
            const itemCard = `
                <div class="item-card">
                    <img src="${item.image}" alt="${item.name}">
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
    
    // Initial display of items
    displayItems(items);
    
    // Handle search functionality if it exists
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredItems = items.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.location.toLowerCase().includes(searchTerm)
            );
            displayItems(filteredItems);
        });
    }
}); 