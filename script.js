const API_KEY = "414fa9cd1d5abe3a521d0c8b4d8d9d2a";

const loader = document.getElementById("loader");
const moviesContainer = document.getElementById("moviesContainer");

let currentMovies = [];

// ============================
// Load Telugu Movies
// ============================

async function loadMovies() {

    loader.style.display = "block";

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te`
        );

        const data = await response.json();

        currentMovies = data.results;

        renderMovies(currentMovies);

    } catch (error) {

        console.error("Error loading movies:", error);

    } finally {

        loader.style.display = "none";

    }
}

// ============================
// Load Trending Movies
// ============================

async function loadTrendingMovies() {

    loader.style.display = "block";

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );

        const data = await response.json();

        currentMovies = data.results;

        renderMovies(currentMovies);

    } catch (error) {

        console.error("Trending Error:", error);

    } finally {

        loader.style.display = "none";

    }
}

// ============================
// Render Movies
// ============================

function renderMovies(movies) {

    moviesContainer.innerHTML = "";

    if (!movies || movies.length === 0) {

        moviesContainer.innerHTML =
            "<h2>No Movies Found</h2>";

        return;
    }

    movies.forEach(movie => {
        displayMovie(movie);
    });
}

// ============================
// Display Movie Card
// ============================

function displayMovie(movie) {

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image";

    const card = document.createElement("div");

    card.classList.add("movie-card");

    card.innerHTML = `
        <img src="${poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average.toFixed(1)}</p>

        <button class="fav-btn">
            ❤️ Favorite
        </button>
    `;

    // Favorites

    card.querySelector(".fav-btn")
    .addEventListener("click", (e) => {

        e.stopPropagation();

        let favorites =
            JSON.parse(
                localStorage.getItem("favorites")
            ) || [];

        const exists =
            favorites.find(
                m => m.id === movie.id
            );

        if (!exists) {

            favorites.push(movie);

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            alert(
                `${movie.title} added to Favorites ❤️`
            );

        } else {

            alert(
                "Already in Favorites ❤️"
            );

        }

    });

    // Open Details Page

    card.addEventListener("click", () => {

        window.location.href =
            `movie.html?id=${movie.id}`;

    });

    moviesContainer.appendChild(card);
}

// ============================
// Search Movies
// ============================

async function searchMovies() {

    const query =
        document
        .getElementById("searchInput")
        .value
        .trim();

    if (!query) {

        loadMovies();
        return;

    }

    loader.style.display = "block";

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        const data = await response.json();

      const exactMovies = data.results.filter(movie =>
    movie.title.toLowerCase() === query.toLowerCase()
);

if (exactMovies.length > 0) {
    renderMovies(exactMovies);
} else {
    renderMovies(data.results);
}
    } catch (error) {

        console.error("Search Error:", error);

    } finally {

        loader.style.display = "none";

    }
}

// ============================
// Genre Filter
// ============================

async function fetchMoviesByGenre(genreId) {

    loader.style.display = "block";

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te&with_genres=${genreId}`
        );

        const data = await response.json();

        currentMovies = data.results;

        renderMovies(currentMovies);

    } catch (error) {

        console.error("Genre Error:", error);

    } finally {

        loader.style.display = "none";

    }
}

// ============================
// Show Favorites
// ============================

function showFavorites() {

    const favorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];

    renderMovies(favorites);
}

// ============================
// Search Button
// ============================

document
.getElementById("searchBtn")
?.addEventListener(
    "click",
    searchMovies
);

// ============================
// Enter Key Search
// ============================

document
.getElementById("searchInput")
?.addEventListener(
    "keypress",
    function (e) {

        if (e.key === "Enter") {

            searchMovies();

        }

    }
);

// ============================
// Genre Dropdown
// ============================

document
.getElementById("genreFilter")
?.addEventListener(
    "change",
    function () {

        const selected =
            this.value;

        if (selected === "all") {

            loadMovies();

        } else {

            fetchMoviesByGenre(
                selected
            );

        }

    }
);

// ============================
// Favorites Button
// ============================

document
.getElementById("favoritesBtn")
?.addEventListener(
    "click",
    showFavorites
);

// ============================
// Trending Button
// ============================

document
.getElementById("trendingBtn")
?.addEventListener(
    "click",
    loadTrendingMovies
);

// ============================
// Initial Load
// ============================
// Dark Mode

const themeBtn =
document.getElementById("themeBtn");

themeBtn?.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );

    themeBtn.innerHTML =
        document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});

async function loadCast(movieId){

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
    );

    const data = await response.json();

    let castHTML = "<h2>🎭 Cast</h2><div class='cast-container'>";

    data.cast.slice(0,10).forEach(actor => {

        const photo = actor.profile_path
        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
        : "https://via.placeholder.com/200x300";

        castHTML += `
            <div class="cast-card">
                <img src="${photo}">
                <p>${actor.name}</p>
                <small>${actor.character}</small>
            </div>
        `;
    });

    castHTML += "</div>";

    document.getElementById("castContainer").innerHTML =
    castHTML;
}
async function loadSimilarMovies(movieId){

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`
    );

    const data = await response.json();

    let html =
    "<h2>🎬 Similar Movies</h2><div class='similar-container'>";

    data.results.slice(0,8).forEach(movie=>{

        const poster =
        `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

        html += `
            <div class="similar-card"
            onclick="window.location.href='movie.html?id=${movie.id}'">

                <img src="${poster}">
                <p>${movie.title}</p>

            </div>
        `;
    });

    html += "</div>";

    document.getElementById("similarMovies").innerHTML =
    html;
}
loadMovies();
