import "./App.css";
import { Movies } from "./components/Movies";
import { useSearch } from "./hooks/useSearch";
import { useMovies } from "./hooks/useMovies";
import { useState } from "react";

function App() {
  const [sort, setSort] = useState("");
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
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
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button>Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>
      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
