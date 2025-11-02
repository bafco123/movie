import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Home(){
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const nav = useNavigate();

  const search = async (e) => {
    e.preventDefault();
    if(!q) return;
    const res = await API.get('/api/search', { params: { q } });
    setResults(res.data.Search || []);
  };

  return (
    <>
      <div className="text-center py-5 bg-light rounded">
        <h1>MovieBox</h1>
        <p className="lead">Search movies and write reviews</p>
        <form className="d-flex justify-content-center" onSubmit={search}>
          <input value={q} onChange={e=>setQ(e.target.value)} className="form-control w-50 me-2" placeholder="Search movies..." />
          <button className="btn btn-primary">Search</button>
        </form>
      </div>

      <div className="row mt-4">
        {results.map(m => (
          <div className="col-md-3 mb-3" key={m.imdbID}>
            <div className="card h-100">
              <img src={m.Poster !== 'N/A' ? m.Poster : 'https://via.placeholder.com/300x420'} className="card-img-top" alt={m.Title}/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{m.Title}</h5>
                <p className="card-text">{m.Year}</p>
                <button className="btn btn-outline-primary mt-auto" onClick={()=>nav(`/movie/${m.imdbID}`)}>View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
