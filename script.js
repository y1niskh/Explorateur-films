const apiKey = 'TA_CLE_API_ICI'; // Remplace par ta clé TMDb
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`;
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

const container = document.getElementById('movies-container');

async function fetchMovies() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    container.innerHTML = '<p>Impossible de charger les films.</p>';
  }
}

function displayMovies(movies) {
  container.innerHTML = ''; // Vide le container avant d’ajouter les cartes
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${imgBaseUrl + movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p><span>Note :</span> ${movie.vote_average} / 10</p>
        <p><span>Sortie :</span> ${movie.release_date}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

fetchMovies();
