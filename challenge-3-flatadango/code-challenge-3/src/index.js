document.addEventListener("DOMContentLoaded", () => {
    // Fetch initial movie details and display
    fetchMovieDetails();
    
    // Fetch all movies and display in the menu
    fetchAllMovies();

    // Event listener for buying tickets
    document.getElementById("buy-ticket-btn").addEventListener("click", buyTicket);

    // Event listener for deleting a film
    document.getElementById("films").addEventListener("click", handleFilmDelete);
});

async function fetchMovieDetails() {
    try {
        const response = await fetch('http://localhost:3000/films/1');
        const movieData = await response.json();
        // Update DOM with movie details
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

async function fetchAllMovies() {
    try {
        const response = await fetch('http://localhost:3000/films');
        const movies = await response.json();
        // Populate movie menu in the DOM
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

async function buyTicket() {
    // Logic for buying tickets and updating the backend
}

async function handleFilmDelete(event) {
    // Logic for deleting a film from the list and server
}
