// LOGIN
function handleLogin(e) {
    e.preventDefault();
    const mobile = document.getElementById('mobile').value.trim();
    const password = document.getElementById('password').value;

    if (!/^[0-9]{10}$/.test(mobile)) {
        showNotification('Please enter a valid 10-digit mobile number', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }

    // Demo: Accept any valid mobile + password "password123"
    if (password === 'password123') {
        localStorage.setItem('nextgen_logged_in', 'true');
        localStorage.setItem('nextgen_user', JSON.stringify({
            mobile: mobile,
            name: 'Student',
            grade: '13',
            stream: 'Commerce'
        }));
        showNotification('Login successful!');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
    } else {
        showNotification('Invalid credentials. Try password: password123', 'error');
    }
}

// REGISTER
function handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!firstName) { showNotification('Please enter your first name', 'error'); return; }
    if (!/^[0-9]{10}$/.test(mobile)) { showNotification('Valid 10-digit mobile required', 'error'); return; }
    if (password.length < 6) { showNotification('Password must be 6+ characters', 'error'); return; }
    if (password !== confirmPassword) { showNotification('Passwords do not match', 'error'); return; }
    if (!document.getElementById('terms').checked) { showNotification('Please agree to Terms', 'error'); return; }

    localStorage.setItem('nextgen_logged_in', 'true');
    localStorage.setItem('nextgen_user', JSON.stringify({
        name: firstName,
        mobile: mobile,
        grade: document.getElementById('grade').value,
        stream: document.getElementById('stream').value
    }));

    showNotification('Account created successfully!');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
}

// Initialize forms
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
});