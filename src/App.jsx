import { useState, useEffect } from 'react'

import './index.css'

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;

  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => setMovies(data.results));

  // useEffect(() => {
  //   if (search) { }
  // }, []);

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
            <form className="d-flex my-2 my-lg-0" onSubmit={setSearch}>
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
          <div className="row">

          </div>
        </div>
      </div>
    </>
  )
}