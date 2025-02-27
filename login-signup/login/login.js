async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        // If login is successful
        localStorage.setItem('currentUser', JSON.stringify({
            name: data.user.name,
            email: data.user.email,
            isLoggedIn: true
        }));

        // Alert success and redirect
        alert('Login successful!');
        setTimeout(() => {
            window.location.replace('/home');
        }, 500); // Small delay to ensure alert is seen

    } catch (error) {
        console.error('Login error:', error);
        alert(error.message);
    }
}