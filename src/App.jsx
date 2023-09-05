import { useEffect } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import responseMovies from "./mocks/results.json";
import { useState } from "react";
import { useId } from "react";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(false);
  const isFirstInput = useId(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("La búsqueda no puede estar vacía");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(false);
  }, [search, isFirstInput]);

  return { search, updateSearch, error };
}

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
        <form className="form">
          <input
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
