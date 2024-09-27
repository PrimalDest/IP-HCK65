import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setMovies,
  setLoading,
  setError,
  setPage,
  setTotalPages,
  setSearchTerm,
} from "../component/movieSlice";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import Navbar from "../Navbar/Navbar";

const LoadingSpinner = () => (
  <div className="spinner-border" role="status"></div>
);

const ErrorComponent = ({ error }) => (
  <div className="alert alert-danger" role="alert">
    {error}
  </div>
);

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error, page, totalPages, maxPages, searchTerm } =
    useSelector((state) => state.movies);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        navigate("/login");
        return;
      }

      const options = {
        method: "GET",
        url: `https://api.saviours.site/movie?language=en-US&page=${page}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      try {
        dispatch(setLoading(true));

        const response = await axios.request(options);
        const movieIds = response.data.results.map((movie) => movie.id);
        localStorage.setItem("movieIds", JSON.stringify(movieIds));

        dispatch(setMovies(response.data.results));
        dispatch(setTotalPages(response.data.total_pages));
        dispatch(setLoading(false));
      } catch (error) {
        console.error(error);
        dispatch(setError("Failed to fetch data. Please try again."));
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, navigate, page, searchTerm]);

  const handleNextPage = () => {
    if (page < maxPages) {
      dispatch(setPage(Math.min(page + 1, totalPages)));
    }
  };

  const handlePrevPage = () => {
    dispatch(setPage(Math.max(page - 1, 1)));
  };
  const renderPageButtons = () => {
    const pageCount = Math.min(totalPages, maxPages);
    const buttons = [];

    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <li key={i} className={`page-item ${i === page ? "active" : ""}`}>
          <button className="page-link" onClick={() => setPage(i)}>
            {i}
          </button>
        </li>
      );
    }

    return buttons;
  };

  const handleMovieCardClick = (movieId) => {
    navigate(`/Detail/${movieId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "10px" }}>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorComponent error={error} />
        ) : (
          <div className="row">
            {movies.map((movie) => (
              <div key={movie.id} className="col-md-3">
                <MovieCard movie={movie} onCardClick={handleMovieCardClick} />
              </div>
            ))}
          </div>
        )}
        <div className="d-flex justify-content-center mt-4">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handlePrevPage}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {renderPageButtons()}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handleNextPage}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MovieList;
