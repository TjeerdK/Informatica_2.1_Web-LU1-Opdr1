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
            const row = buttonElement.closest('tr');
            if (row) row.remove();
            alert('Movie deleted successfully.');
        }
    });
}