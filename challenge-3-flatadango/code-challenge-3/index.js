// Function to display movie details
function displayMovie(movie) {
    // Update movie image
    movieImage.innerHTML = `<img src="${movie.poster}" alt="${movie.title} Image" width="300">`;

    // Update movie description
    movieDescription.innerHTML = `
        <h2>${movie.title}</h2>
        <p>Runtime: ${movie.runtime}</p>
        <p>Showtime: ${movie.showtime}</p>
        <p>Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
    `;

    // Update buy ticket button
    if (movie.tickets_sold >= movie.capacity) {
        buyTicketButton.textContent = "Sold Out";
        buyTicketButton.setAttribute("disabled", "true");
    } else {
        buyTicketButton.textContent = "Buy Ticket";
        buyTicketButton.removeAttribute("disabled");
    }

    // Enable delete movie button
    deleteMovieButton.removeAttribute("disabled");
}

// Call displayMovieDetails from displayMovie
function displayMovieDetails(movie) {
    displayMovie(movie);
}

// Function to update the movie list
function updateMovieList() {
    // Clear existing movie list
    movieList.innerHTML = "";

    // Create and populate <li> elements for each movie
    moviesData.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = movie.title;

        // Add click event listener
        li.addEventListener("click", () => {
            currentMovie = movie;
            displayMovie(movie);
        });

        // Append to movieList
        movieList.appendChild(li);
    });
}
