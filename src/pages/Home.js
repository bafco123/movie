import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const res = await API.get('/api/search', { params: { q: 'avengers' } });
      const data = res.data.Search || [];
      setResults(data);
      setPopular(data.slice(0, 5)); // top 5 for carousel
    } catch (err) {
      console.error('Error loading popular movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const search = async (e) => {
    e.preventDefault();
    if (!q) return;
    setLoading(true);
    const res = await API.get('/api/search', { params: { q } });
    setResults(res.data.Search || []);
    setLoading(false);
  };

  return (
    <>
      {/* 🎞 Carousel for popular movies */}
      <div id="featuredCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {popular.map((movie, i) => (
            <div
              key={movie.imdbID}
              className={`carousel-item ${i === 0 ? 'active' : ''}`}
            >
              <img
                src={
                  movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/900x400'
                }
                className="d-block w-100 carousel-img"
                alt={movie.Title}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => nav(`/movie/${movie.imdbID}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#featuredCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#featuredCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* 🔍 Search section */}
      <section className="text-center search-area py-4">
        <h1 className="fw-bold mb-3">🎥 welcome to bafcoflix N Chill</h1>
        <p className="lead mb-4">Discover movies, download posters & leave reviews!</p>
        <form
          className="d-flex justify-content-center"
          onSubmit={search}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="form-control me-2"
            placeholder="Search for a movie..."
          />
          <button className="btn btn-primary fw-bold">Search</button>
        </form>
      </section>

      {/* 🎬 Movie Cards */}
      <div className="container mt-5">
        <h3 className="mb-4">{q ? 'Search Results' : '🔥 Popular Movies'}</h3>

        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <div className="row">
            {results.length === 0 ? (
              <p>No movies found.</p>
            ) : (
              results.map((m) => (
                <div className="col-md-3 mb-4" key={m.imdbID}>
                  <div className="card movie-card border-0 shadow-sm">
                    <div className="poster-container">
                      <img
                        src={
                          m.Poster !== 'N/A'
                            ? m.Poster
                            : 'https://via.placeholder.com/300x420'
                        }
                        className="card-img-top"
                        alt={m.Title}
                      />
                      <div className="overlay">
                        <button
                          className="btn btn-light btn-sm me-2"
                          onClick={() => nav(`/movie/${m.imdbID}`)}
                        >
                          View
                        </button>
                        <a
                          href={
                            m.Poster !== 'N/A'
                              ? m.Poster
                              : 'https://via.placeholder.com/300x420'
                          }
                          download={`${m.Title}.jpg`}
                          className="btn btn-warning btn-sm fw-bold"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{m.Title}</h5>
                      <p className="card-text">{m.Year}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
