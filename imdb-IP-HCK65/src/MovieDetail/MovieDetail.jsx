import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieDetail, setMovieDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!movieId) {
        setError("Movie ID not provided.");
        return;
      }

      const options = {
        method: "GET",
        url: `https://api.saviours.site/movie/${movieId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };

      try {
        const response = await axios.request(options);
        setMovieDetail(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch movie details. Please try again.");
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  const handleRate = () => {
    navigate(`/Create`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center mt-4">
        <div
          className="card mb-4"
          style={{ width: "24rem", cursor: "pointer" }}
        >
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
              alt={movieDetail.title}
              style={{ objectFit: "cover", height: "400px", width: "100%" }}
            />
          </div>
          <div
            className="card-body d-flex flex-column justify-content-between"
            style={{ minHeight: "200px", width: "100%" }}
          >
            <div>
              <h5 className="card-title">{movieDetail.title}</h5>
              <p className="card-text">
                id: {movieDetail.id}
              </p>
              <p className="card-text">
                Release Date: {movieDetail.release_date}
              </p>
              <p className="card-text">Overview: {movieDetail.overview}</p>
              <p className="card-text">Rating: {movieDetail.vote_average}</p>
              <p className="card-text">
                Genres:{" "}
                {movieDetail.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <p className="card-text">
                  Runtime: {movieDetail.runtime} minutes
                </p>
                <p className="card-text">
                  Production Companies:{" "}
                  {movieDetail.production_companies
                    .map((company) => company.name)
                    .join(", ")}
                </p>
                <button onClick={handleRate} className="btn btn-primary">
                  Rate
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
