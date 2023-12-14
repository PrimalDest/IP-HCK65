import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Navbar = ({}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("logged_in_user") !== null
  );
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const currentUser =
    JSON.parse(localStorage.getItem("logged_in_user")) || null;

  const handleLogout = async () => {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You will be logged out",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out!",
      });

      if (result.isConfirmed) {
        MySwal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have been logged out.",
        });

        localStorage.removeItem("access_token");
        localStorage.removeItem("movieIds");
        localStorage.removeItem("logged_in_user");
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout", error);

      MySwal.fire({
        icon: "error",
        title: "Logout Error",
        text: "An unexpected error occurred during logout. Please try again later.",
      });
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="me-5">
          <h3 style={{ color: "white", marginBottom: "0" }}>Top 100 Movies</h3>
        </div>
        <div className="collapse navbar-collapse show" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/Movie"
                style={{ textDecoration: "none", color: "white" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/Rating"
                style={{ textDecoration: "none", color: "white" }}
              >
                Rating
              </Link>
            </li>
            {isLoggedIn && <></>}
          </ul>
        </div>

        <div className="d-flex align-items-center ms-auto me-2">
          {isLoggedIn && (
            <span style={{ color: "white", marginRight: "20px" }}>
              Welcome, {currentUser.username}
            </span>
          )}
        </div>

        {isLoggedIn ? (
          <div className="d-flex align-items-center ms-3">
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-success"
            style={{ textDecoration: "none", color: "white" }}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
