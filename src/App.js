import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Reviews from './pages/Reviews';
import MyReviews from './pages/MyReviews';
import About from './pages/About';
import './App.css';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">bafcoflix N Chill</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/movies">Movies</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/reviews">Reviews</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/my-reviews">My Reviews</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
