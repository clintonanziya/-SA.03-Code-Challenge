document.addEventListener("DOMContentLoaded", () => {
    const movieDetailsContainer = document.getElementById("showing");
    const filmsList = document.getElementById("films");

    // Function to fetch and display details of the first movie
    function displayFirstMovie() {
        fetch("http://localhost:3000/films/1")
            .then(response => response.json())
            .then(movie => {
                const availableTickets = movie.capacity - movie.tickets_sold;
                const soldOutClass = availableTickets === 0 ? "sold-out" : "";
                const buyButtonText = availableTickets === 0 ? "Sold Out" : "Buy Ticket";

                movieDetailsContainer.innerHTML = `
                    <div class="card">
                        <div class="title">${movie.title}</div>
                        <div class="meta">${movie.runtime} minutes</div>
                        <div class="content">
                            <div class="description">
                                ${movie.description}
                                <span class="ui label">${movie.showtime}</span>
                                <span id="ticket-num" class="${soldOutClass}">${availableTickets}</span> remaining tickets
                            </div>
                        </div>
                        <div class="extra content">
                            <button id="buy-ticket" class="ui orange button ${soldOutClass}" ${availableTickets === 0 ? "disabled" : ""}>${buyButtonText}</button>
                        </div>
                    </div>
                `;
            });
    }

    // Function to fetch all movies and display them in the films list
    function displayAllMovies() {
        fetch("http://localhost:3000/films")
            .then(response => response.json())
            .then(movies => {
                filmsList.innerHTML = "";
                movies.forEach(movie => {
                    const listItem = document.createElement("li");
                    listItem.textContent = movie.title;
                    listItem.className = movie.tickets_sold === movie.capacity ? "film-item sold-out" : "film-item";
                    filmsList.appendChild(listItem);
                });
            });
    }

    // Function to handle buying tickets for a movie
    function buyTicket(movieId) {
        fetch(`http://localhost:3000/films/${movieId}`)
            .then(response => response.json())
            .then(movie => {
                if (movie.tickets_sold < movie.capacity) {
                    const newTicketsSold = movie.tickets_sold + 1;
                    fetch(`http://localhost:3000/films/${movieId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            tickets_sold: newTicketsSold
                        })
                    })
                    .then(() => {
                        displayFirstMovie();
                        displayAllMovies();
                    });
                }
            });
    }

    // Event listener for buying tickets
    movieDetailsContainer.addEventListener("click", event => {
        if (event.target.id === "buy-ticket") {
            const movieId = event.target.dataset.id;
            buyTicket(movieId);
        }
    });

    // Initial display of the first movie details and all movies list
    displayFirstMovie();
    displayAllMovies();
});
