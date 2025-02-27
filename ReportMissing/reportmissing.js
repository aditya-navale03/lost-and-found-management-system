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
        // Create item data object
        const itemData = {
            name: itemName,
            image: e.target.result,
            location: location,
            dateFound: dateFound,
            description: description,
            claimRequirement: claimRequirement
        };

        // Store the item in localStorage
        let existingItems = JSON.parse(localStorage.getItem('lostItems') || '[]');
        existingItems.unshift(itemData); // Add new item to the beginning
        localStorage.setItem('lostItems', JSON.stringify(existingItems));

        // Show success message
        const successMessage = `Item "${itemName}" has been successfully added!\n\nYou can now view it in the Lost Items page.`;
        alert(successMessage);

        // Reset the form
        event.target.reset();

        // Redirect to the student view page
        window.location.href = '/Student_View_Lost/StudentView.html';
    };
    
    reader.readAsDataURL(itemImage);
}

// Add event listener to the form
document.querySelector('form').addEventListener('submit', handleFormSubmit);

// Add this to your home page JavaScript
function openReportForm() {
    window.open('ReportMissing/reportmissing.html', 'ReportMissing', 'width=600,height=800');
} 