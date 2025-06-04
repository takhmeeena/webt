
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const confirmation = document.getElementById('confirmationMessage');
            if (confirmation) {
                confirmation.style.display = 'block';
                this.style.display = 'none';
            }
        });
    }
});
