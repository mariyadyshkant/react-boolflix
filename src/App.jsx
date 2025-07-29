import { useState } from 'react'

import './index.css'

export default function App() {
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
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light"
      >
        <div className="container">
          <a className="navbar-brand" href="#">Navbar</a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <form className="d-flex my-2 my-lg-0" onSubmit={fetchMovies}>
              <input
                className="form-control me-sm-2"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="main">
        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row">
            {movies.map((movie) => (
              <div className="col-md-4" key={movie.id}>
                <div className="card h-100">
                  <div className="card-title">
                    <h3>{movie.title}</h3>
                    <h4>{movie.original_title}</h4>
                  </div>
                  <div className="card-body">
                    <p>Lingua: {movie.original_language}</p>
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
