import "./App.css";
import responseMovies from "./mocks/results.json";

function App() {
  const movies = responseMovies.Search;
  const hasMovies = movies?.length > 0;

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form">
          <input
            type="text"
            placeholder="Introduce el nombre de una película"
          />
          <button>Buscar</button>
        </form>
      </header>
      <main>
        {hasMovies ? (
          <ul className="movies">
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.Title} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay películas</p>
        )}
      </main>
    </div>
  );
}

export default App;
