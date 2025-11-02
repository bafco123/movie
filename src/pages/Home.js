import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  // 🔥 Fetch some popular movies automatically on load
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      // You can change this query to something broader like "popular" or "top"
      const res = await API.get('/api/search', { params: { q: 'avengers' } });
      setResults(res.data.Search || []);
    } catch (err) {
      console.error('Error loading popular movies:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search movies manually
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
      <div className="text-center py-5 bg-light rounded">
        <h1>MovieBox</h1>
        <p className="lead">Discover popular movies and write reviews</p>
        <form className="d-flex justify-content-center" onSubmit={search}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="form-control w-50 me-2"
            placeholder="Search movies..."
          />
          <button className="btn btn-primary">Search</button>
        </form>
      </div>

      <div className="mt-4">
        <h3 className="mb-3">
          {q ? `Search Results` : `🔥 Popular Movies`}
        </h3>

        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <div className="row">
            {results.length === 0 ? (
              <p>No movies found.</p>
            ) : (
              results.map((m) => (
                <div className="col-md-3 mb-3" key={m.imdbID}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={
                        m.Poster !== 'N/A'
                          ? m.Poster
                          : 'https://via.placeholder.com/300x420'
                      }
                      className="card-img-top"
                      alt={m.Title}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{m.Title}</h5>
                      <p className="card-text">{m.Year}</p>
                      <button
                        className="btn btn-outline-primary mt-auto"
                        onClick={() => nav(`/movie/${m.imdbID}`)}
                      >
                        View
                      </button>
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
