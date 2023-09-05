import "./App.css";

function App() {
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
      <main>Movies</main>
    </div>
  );
}

export default App;
