document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const notificationElement = document.getElementById('notification');
    const form = document.getElementById('subscription-form');
    const spinner = document.getElementById('spinner');

    function updateCountdown() {
        const launchDate = new Date('August 15, 2024 00:00:00').getTime();
        const now = new Date().getTime();
        const timeDifference = launchDate - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            countdownElement.innerHTML = "We're Live!";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

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
            notificationElement.innerHTML = 'Thank you! Your email has been submitted.';
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
});
