// Add debug logging
console.log('reportmissing.js loaded');

function handleFormSubmit(event) {
    event.preventDefault();
    console.log('Form submission started');

    try {
        // Get form values
        const itemName = document.getElementById('item-name').value;
        const itemImage = document.getElementById('item-image').files[0];
        const description = document.getElementById('item-description').value;
        const location = document.getElementById('item-location').value;
        const dateFound = document.getElementById('date-found').value;
        const claimRequirement = document.getElementById('claim-requirement').value;

        console.log('Form values collected:', {
            itemName,
            description,
            location,
            dateFound,
            claimRequirement,
            'image present': !!itemImage
        });

        // Validate inputs
        if (!itemName || !itemImage || !description || !location || !dateFound || !claimRequirement) {
            alert('Please fill in all fields');
            return;
        }

        // Convert the uploaded image to a data URL
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                console.log('Image successfully read');
                
                // Create item data object
                const itemData = {
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

                console.log('Item data created:', itemData);

                // Verify addLostItem exists
                if (typeof window.addLostItem !== 'function') {
                    throw new Error('addLostItem function not found. Check if itemsData.js is properly loaded.');
                }

                // Add the item
                const updatedItems = window.addLostItem(itemData);
                console.log('Item added successfully, new items count:', updatedItems.length);

                // Show success message
                alert(`Item "${itemName}" has been successfully added!`);

                // Refresh the view
                if (window.opener) {
                    console.log('Refreshing parent window');
                    window.opener.location.reload();
                    window.close();
                } else {
                    console.log('Redirecting to StudentView');
                    window.location.href = '../Student_View_Lost/StudentView.html';
                }
            } catch (error) {
                console.error('Error in reader.onload:', error);
                alert('Error adding item: ' + error.message);
            }
        };

        reader.onerror = function(error) {
            console.error('Error reading file:', error);
            alert('Error reading image file');
        };

        console.log('Starting image read');
        reader.readAsDataURL(itemImage);

    } catch (error) {
        console.error('Form submission error:', error);
        alert('Error submitting form: ' + error.message);
    }
}

// Add event listener to the form
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    const form = document.querySelector('form');
    if (form) {
        console.log('Form found, adding submit listener');
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Form not found in the document');
    }
});

// Add this to your home page JavaScript
function openReportForm() {
    window.open('ReportMissing/reportmissing.html', 'ReportMissing', 'width=600,height=800');
} 