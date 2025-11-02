import React, { useEffect, useState } from 'react';
import API from '../utils/api';

export default function MyReviews(){
  const [name, setName] = useState('');
  const [all, setAll] = useState([]);
  const [mine, setMine] = useState([]);

  useEffect(()=>{ if(name) filter(); }, [name]);

  const load = async () => {
    const r = await API.get('/api/reviews');
    setAll(r.data);
  };
  useEffect(()=>{ load(); }, []);

  const filter = () => {
    setMine(all.filter(a => a.reviewer && a.reviewer.toLowerCase().includes(name.toLowerCase())));
  };

  return (
    <>
      <h2>My Reviews</h2>
      <p>Type your name to filter reviews you've posted.</p>
      <input className="form-control w-50 mb-3" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
      {name === '' ? <p className="text-muted">Enter your name to see your reviews</p> :
        mine.length === 0 ? <p>No reviews found for that name.</p> :
        mine.map(m => (
          <div key={m.id} className="card mb-2">
            <div className="card-body">
              <h5>{m.title} — {m.rating}★</h5>
              <p>{m.comment}</p>
            </div>
          </div>
        ))
      }
    </>
  );
}
