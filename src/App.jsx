import "./App.css";
import { Movies } from "./components/Movies";
import { useSearch } from "./hooks/useSearch";
import { useCallback, useRef, useState } from "react";
import { searchMovies } from "./services/movies";

function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async () => {
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const movies = await searchMovies({ search });
      setMovies(movies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [search]);

  return { movies, loading, error, getMovies };
}

function App() {
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
  };

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
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}
      </main>
    </div>
  );
}

export default App;
