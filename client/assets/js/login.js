document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset error message
        errorMessage.style.display = 'none';
        
        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token
                localStorage.setItem('token', data.token);
                
                // Store user info if needed
                localStorage.setItem('user', JSON.stringify({
                    id: data.user.id,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    email: data.user.email,
                    role: data.user.role
                }));

                // Redirect based on role
                if (data.user.role === 'admin') {
                    window.location.href = '../pages/videos.html'; // or your admin dashboard
                } else {
                    window.location.href = '../pages/videos.html'; // or your student dashboard
                }
            } else {
                // Show error message
                errorMessage.textContent = data.message || 'Invalid email or password';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred during login';
            errorMessage.style.display = 'block';
        }
    });

    // Add password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.innerHTML = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        // Verify token validity here if needed
        window.location.href = '../pages/videos.html'; // or your dashboard page
    }
});