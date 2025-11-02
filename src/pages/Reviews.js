import React, { useEffect, useState } from 'react';
import axios from '../utils/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await axios.get('/reviews');
    setReviews(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/reviews/${id}`);
    fetchReviews();
  };

  const handleEdit = (review) => {
    setEditId(review.id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleUpdate = async (id) => {
    await axios.put(`/reviews/${id}`, { comment: editComment, rating: editRating });
    setEditId(null);
    fetchReviews();
  };

  return (
    <div className="container mt-4">
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="card my-2 p-2">
          {editId === review.id ? (
            <div>
              <input
                type="text"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="form-control mb-2"
              />
              <input
                type="number"
                value={editRating}
                min={1}
                max={5}
                onChange={(e) => setEditRating(e.target.value)}
                className="form-control mb-2"
              />
              <button onClick={() => handleUpdate(review.id)} className="btn btn-success me-2">
                Save
              </button>
              <button onClick={() => setEditId(null)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p><strong>{review.reviewer}</strong> rated {review.rating}/5</p>
              <p>{review.comment}</p>
              <button onClick={() => handleEdit(review)} className="btn btn-primary me-2">Edit</button>
              <button onClick={() => handleDelete(review.id)} className="btn btn-danger">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
