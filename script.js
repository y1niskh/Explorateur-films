const apiKey = '8a705b118b52bd5478d94dae5fcd7845'; // Ta clé TMDb
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';
const totalPages = 50;

let currentPage = 1;
let currentQuery = ''; // Pour la recherche

const container = document.getElementById('movies-container');
const nextPageBtn = document.getElementById('nextPage');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Charger les films (populaires ou recherche)
async function fetchMovies(page = 1, query = '') {
  let apiUrl = '';
  if (query) {
    apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr-FR&query=${encodeURIComponent(query)}&page=${page}`;
  } else {
    apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=${page}`;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    container.innerHTML = '<p>Impossible de charger les films.</p>';
  }
}

// Affichage des films avec adaptation mobile
function displayMovies(movies) {
  container.innerHTML = ''; // vide le container

  // Détection mobile
  const isMobile = window.innerWidth <= 600;
  const maxMovies = isMobile ? 6 : 16;

  movies.slice(0, maxMovies).forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${movie.poster_path ? imgBaseUrl + movie.poster_path : 'default.jpg'}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p><span>Note :</span> ${movie.vote_average} / 10</p>
        <p><span>Sortie :</span> ${movie.release_date || 'N/A'}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Bouton “Charger plus”
nextPageBtn.addEventListener('click', () => {
  currentPage++;
  fetchMovies(currentPage, currentQuery);
});

// Barre de recherche
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  currentQuery = query;
  currentPage = 1;
  fetchMovies(currentPage, currentQuery);
});

// Au chargement, films aléatoires
const randomPage = Math.floor(Math.random() * totalPages) + 1;
fetchMovies(randomPage);
