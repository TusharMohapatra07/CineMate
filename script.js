const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const input = document.querySelector(".header__input");
const search = document.querySelector(".header__search");
const main = document.querySelector(".main");
getMovies(API_URL);

input.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    searchMovies(input);
  }
});

search.addEventListener("click", () => {
  searchMovies(input);
});

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  main.innerHTML = "";
  if (!data.results[0]) {
    main.innerHTML = `<p class="main__warn">No movies found...</p>`;
    return;
  }

  showMovies(data.results);
}

function searchMovies(input) {
  const searchTerm = input.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    input.value = "";
  } else {
    window.location.reload();
  }
}

function showMovies(movies) {
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("main__movie");

    div.innerHTML = `<img src="${IMG_PATH + movie.poster_path}" alt="${
      movie.title
    }" />
    <div class="movie__info">
      <h3>${movie.title}</h3>
      <span class="${getClass(movie.vote_average)}">${movie.vote_average}</span>
    </div>
    <div class="movie__overview">
      <h3>Overview</h3>
      ${movie.overview}
    </div>`;

    main.appendChild(div);
  });
}

function getClass(vote) {
  if (vote >= 8) return "green";
  if (vote < 8) return "yellow";
  if (vote < 6) return "red";
}
