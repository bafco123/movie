import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { useParams, Link } from 'react-router-dom';

export default function MovieDetails(){
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ reviewer: '', rating: 5, comment: '' });

  useEffect(()=>{ fetchMovie(); fetchReviews(); }, [id]);

  const fetchMovie = async () => {
    const r = await API.get(`/api/movie/${id}`);
    setMovie(r.data);
  };

  const fetchReviews = async () => {
    const r = await API.get(`/api/reviews/movie/${id}`);
    setReviews(r.data);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if(!form.reviewer) { alert('Give a name'); return; }
    const payload = {
      movieId: id,
      title: movie.Title,
      reviewer: form.reviewer,
      rating: form.rating,
      comment: form.comment,
      poster: movie.Poster
    };
    await API.post('/api/reviews', payload);
    setForm({ reviewer: '', rating: 5, comment: '' });
    fetchReviews();
  };

  if(!movie) return <div>Loading...</div>;

  return (
    <div className="row">
      <div className="col-md-4">
        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x420'} className="img-fluid" alt={movie.Title}/>
      </div>
      <div className="col-md-8">
        <h2>{movie.Title} ({movie.Year})</h2>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p>{movie.Plot}</p>

        <hr/>
        <h4>Add Review</h4>
        <form onSubmit={submitReview}>
          <div className="mb-2">
            <input className="form-control" placeholder="Your name" value={form.reviewer} onChange={e=>setForm({...form, reviewer: e.target.value})}/>
          </div>
          <div className="mb-2">
            <select className="form-select" value={form.rating} onChange={e=>setForm({...form, rating: e.target.value})}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
            </select>
          </div>
          <div className="mb-2">
            <textarea className="form-control" rows="3" placeholder="Comment" value={form.comment} onChange={e=>setForm({...form, comment: e.target.value})}/>
          </div>
          <button className="btn btn-success">Submit Review</button>
        </form>

        <hr/>
        <h4>Reviews</h4>
        {reviews.length === 0 ? <p>No reviews yet.</p> : (
          reviews.map(r => (
            <div key={r.id} className="card mb-2">
              <div className="card-body">
                <h6>{r.reviewer} — {r.rating}★</h6>
                <p>{r.comment}</p>
              </div>
            </div>
          )) 
        )}

        <Link to="/reviews" className="btn btn-link">See all reviews</Link>
      </div>
    </div>
  );
}
