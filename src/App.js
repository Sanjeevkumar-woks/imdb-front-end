import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

function App() {
  const [movieslist, setMovieslist] = useState([]);
  const [producerslist, setProducerslist] = useState([]);
  const [actorslist, setActorslist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/movies")
      .then((data) => data.json())
      .then((movies) => setMovieslist(movies));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <MovieList movieslist={movieslist} />
      </header>
    </div>
  );
}

function MovieList({ movieslist }) {
  return (
    <div className="movielist-container">
      {movieslist.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

function MovieCard({ movie }) {
  const [display, setDisplay] = useState(true);
  const { name, year_of_release, plot, poster, actors, producers } = movie;

  return (
    <div className="card">
      <div style={{ display: display ? "" : "none" }} className="card-head">
        <img className="poster" src={poster} alt={name} />
        <p className="card-name">
          {name} <small>{year_of_release}</small>
        </p>
      </div>
      <div style={{ display: display ? "none" : " " }} className="card-details">
        <small>Actors in:</small>
        <br />
        {actors.map((actor) => (
          <small>{actor}</small>
        ))}
        <br />
        <small>Producers:</small>
        <br />
        {producers.map((producer) => (
          <small>{producer}</small>
        ))}
        <br />
        <br />
        <small>Plot:</small>
        <small> {plot}</small>
      </div>
      {display ? (
        <button className="card-button" onClick={() => setDisplay(!display)}>
          More info
        </button>
      ) : (
        <button className="card-button" onClick={() => setDisplay(!display)}>
          Edit
        </button>
      )}
    </div>
  );
}

export default App;
