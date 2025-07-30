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
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${search}`;

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
          console.log(data.results);
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

  const ratingStars = (vote) => {
    const stars = Math.ceil(vote / 2);
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starIcons.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else {
        starIcons.push(<i key={i} className="bi bi-star text-secondary"></i>);
      }
    }
    return <div>{starIcons}</div>;
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
              placeholder="Search movies, series, actors..."
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
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'}
                    className="card-img-top"
                    alt={movie.title || movie.name}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{movie.title || movie.name}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">({movie.original_title || movie.original_name})</h6>
                    <p>
                      Lingua: <ReactCountryFlag countryCode={movie.original_language} />
                    </p>
                    <p>Rating: {ratingStars(movie.vote_average)}</p>
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
