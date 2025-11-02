import React, { useEffect, useState } from 'react';
import API from '../utils/api'; // using the axios instance you defined

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await API.get('/api/reviews'); // ✅ include /api since backend routes have it
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.error('Failed to delete review:', err);
    }
  };

  const handleEdit = (review) => {
    setEditId(review.id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/api/reviews/${id}`, {
        comment: editComment,
        rating: editRating,
      });
      setEditId(null);
      fetchReviews();
    } catch (err) {
      console.error('Failed to update review:', err);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading reviews...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold text-warning">🎬 Movie Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-light">No reviews yet. Go add one from a movie page!</p>
      ) : (
        <div className="row">
          {reviews.map((review) => (
            <div key={review.id} className="col-md-6 mb-4">
              <div className="card bg-dark text-light shadow-lg border-warning">
                <div className="card-body">
                  {editId === review.id ? (
                    <>
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
                        className="form-control mb-3"
                      />
                      <button
                        onClick={() => handleUpdate(review.id)}
                        className="btn btn-success me-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="d-flex align-items-center mb-2">
                        <img
                          src={
                            review.poster ||
                            'https://via.placeholder.com/80x120?text=Poster'
                          }
                          alt={review.title}
                          className="me-3 rounded"
                          style={{ width: '60px', height: '90px', objectFit: 'cover' }}
                        />
                        <div>
                          <h5 className="mb-0 text-warning">{review.title}</h5>
                          <small className="text-light">
                            By <strong>{review.reviewer}</strong>
                          </small>
                        </div>
                      </div>
                      <p className="mt-2">
                        <strong className="text-warning">{review.rating}/5 ⭐</strong>
                      </p>
                      <p className="fst-italic">“{review.comment}”</p>
                      <div className="d-flex justify-content-end">
                        <button
                          onClick={() => handleEdit(review)}
                          className="btn btn-outline-light btn-sm me-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
