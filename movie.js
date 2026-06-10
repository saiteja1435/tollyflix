const API_KEY = "8fa66155";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function loadMovie() {

    const response = await fetch(
        `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
    );

    const movie = await response.json();

    document.getElementById("movieDetails").innerHTML = `
        <div class="details-container">

            <img src="${movie.Poster}" alt="${movie.Title}">

            <h1>${movie.Title}</h1>

            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>IMDb:</strong> ⭐ ${movie.imdbRating}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Writer:</strong> ${movie.Writer}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Runtime:</strong> ${movie.Runtime}</p>
            <p><strong>Language:</strong> ${movie.Language}</p>
            <p><strong>Awards:</strong> ${movie.Awards}</p>

            <h2>Story</h2>
            <p>${movie.Plot}</p>

        </div>
    `;
    document.getElementById("movieDetails").innerHTML += `
    <button class="trailer-btn"onclick="window.open('https://www.youtube.com/results?search_query=${movie.Title}+official+trailer','_blank')">
        ▶ Watch Trailer
    </button>
`;
}

loadMovie();
