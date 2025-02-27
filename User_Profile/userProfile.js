document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isLoggedIn) {
        window.location.href = '/login.html';
        return;
    }

    loadProfiles();
    
    document.getElementById('saveProfile').addEventListener('click', saveProfile);
    document.getElementById('deleteProfile').addEventListener('click', deleteProfile);
    document.getElementById('logout').addEventListener('click', handleLogout);
    
    document.getElementById('profileSelect').addEventListener('change', loadSelectedProfile);

    // Pre-fill email if user is logged in
    if (currentUser && currentUser.email) {
        document.getElementById('email').value = currentUser.email;
        document.getElementById('email').readOnly = true;
    }
});

// Add logout handler
function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login.html';
}

async function loadProfiles() {
    try {
        const response = await fetch('/profiles');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const select = document.getElementById('profileSelect');
        select.innerHTML = '<option value="">Select a profile</option>';
        
        data.profiles.forEach(profile => {
            const option = document.createElement('option');
            option.value = profile.email;
            option.textContent = `${profile.fullName} (${profile.email})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading profiles:', error);
    }
}

function loadSelectedProfile() {
    const select = document.getElementById('profileSelect');
    const selectedEmail = select.value;
    
    if (!selectedEmail) {
        clearForm();
        return;
    }
    
    fetch('/profiles')
        .then(response => response.json())
        .then(data => {
            const profile = data.profiles.find(p => p.email === selectedEmail);
            if (profile) {
                document.getElementById('username').value = profile.username;
                document.getElementById('email').value = profile.email;
                document.getElementById('fullName').value = profile.fullName;
                document.getElementById('phone').value = profile.phone;
            }
        })
        .catch(error => console.error('Error:', error));
}

function clearForm() {
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('fullName').value = '';
    document.getElementById('phone').value = '';
}

async function saveProfile() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || !currentUser.isLoggedIn) {
            alert('Please login first');
            window.location.href = '/login.html';
            return;
        }

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!username || !email || !fullName || !phone) {
            alert('Please fill in all fields');
            return;
        }

        const profileData = {
            id: Date.now(),
            username,
            email,
            fullName,
            phone,
            createdAt: new Date().toISOString()
        };

        const response = await fetch('/saveProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.email}` // Add authentication header
            },
            body: JSON.stringify(profileData)
        });

        const result = await response.json();
        
        if (result.success) {
            alert('Profile saved successfully!');
            await loadProfiles();
        } else {
            throw new Error(result.error || 'Failed to save profile');
        }
    } catch (error) {
        console.error('Error saving profile:', error);
        alert(`Error saving profile: ${error.message}`);
    }
}

async function deleteProfile() {
    const select = document.getElementById('profileSelect');
    const selectedEmail = select.value;
    
    if (!selectedEmail) {
        alert('Please select a profile to delete');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this profile?')) {
        return;
    }
    
    try {
        const response = await fetch('/deleteProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: selectedEmail })
        });

        const result = await response.json();
        
        if (result.success) {
            alert('Profile deleted successfully!');
            clearForm();
            await loadProfiles(); // Reload the profile list
        } else {
            throw new Error(result.error || 'Failed to delete profile');
        }
    } catch (error) {
        console.error('Error deleting profile:', error);
        alert(`Error deleting profile: ${error.message}`);
    }
} 