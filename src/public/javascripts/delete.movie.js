function deleteMovie(movieId, callback) {
    fetch(`/movies/${movieId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            callback(null, true);
        } else {
            callback(new Error('Failed to delete movie'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // callback(error);
    });
}

function buttonClick(movieId, buttonElement) {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    deleteMovie(movieId, (error, success) => {
        if (error) {
            console.error('Error deleting movie:', error);
            alert('Failed to delete movie. Please try again.');
            return;
        }

        if (success) {
            // Remove the entire column (col-*) that contains the card
            const col = buttonElement.closest('.col-lg-3, .col-md-4, .col-sm-6');
            if (col) col.remove();
            alert('Movie deleted successfully.');
        }
    });
}