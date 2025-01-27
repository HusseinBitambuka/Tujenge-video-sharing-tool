document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    function validatePassword(password) {
        // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        return re.test(password);
    }

    function validatePasswordMatch() {
        if (confirmPassword.value && password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset error message
        errorMessage.style.display = 'none';
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const cohort = document.getElementById('cohort').value;

        // Validate email
        if (!validateEmail(email)) {
            errorMessage.textContent = 'Please enter a valid email address';
            errorMessage.style.display = 'block';
            return;
        }

        // Validate password
        if (!validatePassword(password.value)) {
            errorMessage.textContent = 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
            errorMessage.style.display = 'block';
            return;
        }

        // Validate passwords match
        if (password.value !== confirmPassword.value) {
            errorMessage.textContent = 'Passwords do not match';
            errorMessage.style.display = 'block';
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password: password.value,
                    cohort,
                    role: 'student' // Default role is student
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                alert('Registration successful! Please login.');
                window.location.href = 'login.html';
            } else {
                // Show error message
                errorMessage.textContent = data.message || 'Registration failed';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred during registration';
            errorMessage.style.display = 'block';
        }
    });

    // Real-time password match validation
    password.addEventListener('change', validatePasswordMatch);
    confirmPassword.addEventListener('keyup', validatePasswordMatch);
});