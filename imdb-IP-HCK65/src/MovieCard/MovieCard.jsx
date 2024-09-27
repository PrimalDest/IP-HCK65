import React from "react";

const MovieCard = ({ movie, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick(movie.id);
  };

  return (
    <div
      className="card mb-4"
      style={{ width: "18rem", cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <div
        className="bg-image hover-overlay"
        data-mdb-ripple-init
        data-mdb-ripple-color="light"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="img-fluid"
          alt={movie.title}
          style={{ objectFit: "cover", height: "470px" }}
        />
      </div>
      <div className="card-body" style={{ height: "200px", width: "100%" }}>
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">Release Date: {movie.release_date}</p>
        <p className="card-text">Rating: {movie.vote_average}</p>
        <p className="card-text">Popularity: {movie.popularity}</p>
      </div>
    </div>
  );
};

export default MovieCard;
