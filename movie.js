const API_KEY = "414fa9cd1d5abe3a521d0c8b4d8d9d2a";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function loadMovie() {

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );

    const movie = await response.json();

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "";

    document.getElementById("movieDetails").innerHTML = `
        <div class="details-container">

            <img src="${poster}" alt="${movie.title}">

            <h1>${movie.title}</h1>

            <p><strong>Release Date:</strong> ${movie.release_date}</p>

            <p><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>

            <p><strong>Runtime:</strong> ${movie.runtime} mins</p>

            <p><strong>Language:</strong> ${movie.original_language.toUpperCase()}</p>

            <p><strong>Popularity:</strong> ${movie.popularity}</p>

            <h2>Story</h2>

            <p>${movie.overview}</p>

            

        </div>
    `;
loadTrailer(movieId);

loadCast(movieId);

loadSimilarMovies(movieId);
}

async function loadCast(movieId) {

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
    );

    const data = await response.json();

    let html =
    `<h2>🎭 Cast & Crew</h2>
     <div class="cast-container">`;

    data.cast.slice(0, 10).forEach(actor => {

        const photo = actor.profile_path
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
            : "https://via.placeholder.com/200x300";

        html += `
            <div class="cast-card">

                <img src="${photo}" alt="${actor.name}">

                <h4>${actor.name}</h4>

                <p>${actor.character}</p>

            </div>
        `;
    });

    html += `</div>`;

    document.getElementById("castContainer").innerHTML =
    html;
}

async function loadSimilarMovies(movieId) {

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`
    );

    const data = await response.json();

    let html =
    `<h2>🎬 Similar Movies</h2>
     <div class="similar-container">`;

    data.results.slice(0, 8).forEach(movie => {

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "";

        html += `
            <div class="similar-card"
            onclick="window.location.href='movie.html?id=${movie.id}'">

                <img src="${poster}" alt="${movie.title}">

                <p>${movie.title}</p>

            </div>
        `;
    });

    html += `</div>`;

    document.getElementById("similarMovies").innerHTML =
    html;
}
async function loadTrailer(movieId) {

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const data = await response.json();

    const trailer = data.results.find(
        video =>
            video.type === "Trailer" &&
            video.site === "YouTube"
    );

    if (!trailer) {

        document.getElementById("trailerContainer").innerHTML =
            "<h3>No Trailer Available</h3>";

        return;
    }

    document.getElementById("trailerContainer").innerHTML = `
        <h2>🎬 Official Trailer</h2>

        <div class="trailer-wrapper">

            <iframe
                src="https://www.youtube.com/embed/${trailer.key}"
                title="Movie Trailer"
                allowfullscreen>
            </iframe>

        </div>
    `;
}
async function loadTrailer(movieId) {

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const data = await response.json();

    const trailer = data.results.find(
        video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
    );

    if (!trailer) {

        document.getElementById("trailerContainer").innerHTML =
            "<h3>Trailer Not Available</h3>";

        return;
    }

    document.getElementById("trailerContainer").innerHTML = `
        <h2>🎬 Official Trailer</h2>

        <iframe
            width="900"
            height="500"
            src="https://www.youtube.com/embed/${trailer.key}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    `;
}
loadMovie();
