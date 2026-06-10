const API_KEY = "8fa66155";

const moviesContainer = document.getElementById("moviesContainer");
const favoritesContainer = document.getElementById("favoritesContainer");
window.onload = () => {
    searchMovies("Marvel");
    loadFavorites();
};
const teluguMovies = [
    "29",
    "mirchi",
    "peddi",
    "rrr",
    "Pushpa:the rise",
    "Salaar",
    "Kalki 2898 AD",
    "Baahubali",
    "Baahubali 2",
    "Devara",
    "Hanuman",
    "Tillu Square",
    "DJ Tillu",
    "Virupaksha",
    "Lucky Baskhar",
    "Eega",
    "Magadheera",
    "Pokiri",
    "Athadu",
    "Khaleja",
    "Businessman",
    "Race Gurram",
    "Julayi",
    "Ala Vaikunthapurramuloo",
    "Sarrainodu",
    "Srimanthudu",
    "Maharshi",
    "Fidaa",
    "Love Story"
];

window.onload = async () => {
    moviesContainer.innerHTML = "";

    for (const title of teluguMovies) {
        try {
            const response = await fetch(
                `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
            );

            const movie = await response.json();

            if (movie.Response === "True") {
                displayMovie(movie);
            }
        } catch (err) {
            console.log(err);
        }
    }

    loadFavorites();
};
document.getElementById("searchBtn").addEventListener("click", () => {
    const searchTerm = document.getElementById("searchInput").value.trim();

    if (searchTerm) {
        searchMovies(searchTerm);
    }
});

async function searchMovies(movie) {
    const url = `https://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    moviesContainer.innerHTML = "";

    if (data.Search) {
        data.Search.forEach(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            displayMovie(details);
        });
    } else {
        moviesContainer.innerHTML = "<p>No movies found.</p>";
    }
}

async function fetchMovieDetails(id) {
    const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );

    return await response.json();
}
function displayMovie(movie) {

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>⭐ ${movie.imdbRating}</p>
        <p>${movie.Year}</p>
        <button class="favorite-btn">❤️ Favorite</button>
    `;

    // Poster click -> movie details page
    card.querySelector("img").addEventListener("click", () => {

        console.log("Clicked:", movie.imdbID);

        window.location.href =
            `movie.html?id=${movie.imdbID}`;
    });

    // Favorite button
    card.querySelector(".favorite-btn").addEventListener("click", (e) => {

        e.stopPropagation(); // card click trigger avvakunda

        addToFavorites(movie);
    });

    moviesContainer.appendChild(card);
}

function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        loadFavorites();
    }
}

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesContainer.innerHTML = "";

    favorites.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>⭐ ${movie.imdbRating}</p>
            <button onclick="removeFavorite('${movie.imdbID}')">
                Remove
            </button>
        `;

        favoritesContainer.appendChild(card);
    });
}
card.querySelector("img").addEventListener("click", () => {
    window.location.href = `movie.html?id=${movie.imdbID}`;
});
function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(movie => movie.imdbID !== id);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    loadFavorites();
}

loadFavorites();
document.getElementById("closeModal").onclick = () => {
    document.getElementById("movieModal").style.display = "none";
};

window.onclick = (event) => {
    const modal = document.getElementById("movieModal");

    if(event.target === modal){
        modal.style.display = "none";
    }
};
