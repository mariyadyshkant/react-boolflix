import { useState } from 'react'
import ReactCountryFlag from './data/ReactCountryFlag';
import './index.css'

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const fetchMovies = (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;

    if (!search.trim()) {
      setError('Please enter a title');
      setMovies([]);
      return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
          setError('');
        } else {
          setMovies([]);
          setError('No movies found');
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again.');
        setMovies([]);
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Boolflix</a>
          <form className="d-flex my-2 my-lg-0" onSubmit={fetchMovies}>
            <input
              className="form-control me-sm-2"
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="main">
        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row">
            {movies.map((movie) => (
              <div className="col-md-4" key={movie.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title">{movie.title}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">({movie.original_title})</h6>
                    <p>
                      Lingua: <ReactCountryFlag countryCode={movie.original_language} />
                    </p>
                    <p>Rating: {movie.vote_average}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
