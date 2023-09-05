import "./App.css";
import { Movies } from "./components/Movies";
import responseMovies from "./mocks/results.json";
import { useSearch } from "./hooks/useSearch";



function App() {
  const { search, updateSearch, error } = useSearch();
  const movies = responseMovies.Search;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
  };

  const mappedMovies = movies.map((movie) => {
    return {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    };
  });

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            value={search}
            onChange={handleChange}
            type="text"
            placeholder="Introduce el nombre de una película"
          />
          <button>Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>
      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  );
}

export default App;
