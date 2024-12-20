// Select the form and spinner elements
const form = document.getElementById('contact-form');
const spinner = document.getElementById('spinner');
const notificationElement = document.getElementById('notification');

// Form Submission Handling
const scriptURL = 'https://script.google.com/macros/s/AKfycbzbLOe4KdyI7zpvZYNW280Z1xUaSahRgtCLXBeh3f4k02oHf9WyWxX8UdHqYYU6WwV3/exec';

form.addEventListener('submit', e => {
    e.preventDefault();

    // Show the spinner
    spinner.style.display = 'block';

    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form) 
    })
    .then(response => response.text())
    .then(result => {
        notificationElement.innerHTML = 'Thank you! We will contact you soon.';
        form.reset(); // Clear the form after submission
    })
    .catch(error => {
        console.error('Error!', error.message);
        notificationElement.innerHTML = 'There was an error. Please try again.';
    })
    .finally(() => {
        // Hide the spinner after the submission is complete
        spinner.style.display = 'none';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links ul li a');

    // Close the menu when clicking anywhere outside the nav
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.checked = false;
        }
    });

    // Close the menu when clicking on any nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navToggle.checked = false;
        });
    });
});
