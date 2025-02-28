function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const itemName = document.getElementById('item-name').value;
    const itemImage = document.getElementById('item-image').files[0];
    const description = document.getElementById('item-description').value;
    const location = document.getElementById('item-location').value;
    const dateFound = document.getElementById('date-found').value;
    const claimRequirement = document.getElementById('claim-requirement').value;

    // Convert the uploaded image to a data URL
    const reader = new FileReader();
    reader.onload = function(e) {
        // Get existing items to determine next ID
        let existingItems = JSON.parse(localStorage.getItem('lostItems')) || initialItems;
        const maxId = Math.max(...existingItems.map(item => item.id || 0), 0);

        // Create item data object
        const itemData = {
            id: maxId + 1,
            name: itemName,
            image: e.target.result,
            location: location,
            dateFound: new Date(dateFound).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            description: description,
            claimRequirement: claimRequirement
        };

        // Log the formatted item data for easy copying to itemsData.js
        console.log('New item data to add to itemsData.js:');
        console.log(JSON.stringify({
            id: itemData.id,
            name: itemData.name,
            location: itemData.location,
            dateFound: itemData.dateFound,
            description: itemData.description,
            claimRequirement: itemData.claimRequirement,
            image: "/assets/your-image-name.jpg"  // You'll need to save the image file separately
        }, null, 4));

        // Use the addLostItem function from itemsData.js
        addLostItem(itemData);

        // Show success message and redirect
        alert(`Item "${itemName}" has been successfully added!\n\nYou can now view it in the Lost Items page.\n\nCheck console for item data to add to itemsData.js`);
        window.location.href = '../Student_View_Lost/StudentView.html';
    };
    
    reader.readAsDataURL(itemImage);
}

// Add event listener to the form
document.querySelector('form').addEventListener('submit', handleFormSubmit);

// Add this to your home page JavaScript
function openReportForm() {
    window.open('ReportMissing/reportmissing.html', 'ReportMissing', 'width=600,height=800');
} 