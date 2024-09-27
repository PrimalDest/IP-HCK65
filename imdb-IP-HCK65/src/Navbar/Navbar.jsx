import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("logged_in_user") !== null
  );
  const [isUpgraded, setIsUpgraded] = useState(
    localStorage.getItem("is_upgraded") === "true"
  );
  const [isPremium, setIsPremium] = useState(
    localStorage.getItem("is_premium") === "true"
  );
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const currentUser =
    JSON.parse(localStorage.getItem("logged_in_user")) || null;

  useEffect(() => {
    const upgraded = localStorage.getItem("is_upgraded") === "true";
    setIsUpgraded(upgraded);
    setIsPremium(upgraded ? true : false);
  }, [isLoggedIn]);

  const handleLogin = () => {
    const user = { id: 1, username: "John", email: "john@example.com" };

    localStorage.setItem("logged_in_user", JSON.stringify(user));
    setIsLoggedIn(true);
    setIsUpgraded(false);
    setIsPremium(false);

    const isPremiumFromServer = false;
    if (isPremiumFromServer) {
      setIsPremium(true);
      localStorage.setItem("is_premium", "true");
    }
  };

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
        setIsUpgraded(false);
        setIsPremium(false);
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

  const handlePayNow = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const generateRandomPhoneNumber = () => {
        const randomNumber =
          Math.floor(Math.random() * 9000000000) + 1000000000;
        return `08${randomNumber}`;
      };

      const orderData = {
        orderId: currentUser.id,
        grossAmount: 50000,
        itemName: "Movie Upgrade",
        userId: currentUser.id,
        customerDetails: {
          email: currentUser.email,
          firstName: currentUser.username,
          lastName: currentUser.username,
          phone: generateRandomPhoneNumber(),
        },
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      console.log("Request Data:", orderData);

      const response = await axios.post(
        "http://localhost:3000/midtrans/create-transaction",
        orderData,
        config
      );

      const { token } = response.data;
      console.log("Transaction Token:", token);

      window.snap.pay(token.token);

      setIsUpgraded(true);
      setIsPremium(true);
      localStorage.setItem("is_upgraded", "true");
      localStorage.setItem("is_premium", "true");
    } catch (error) {
      console.error("Error during payment", error);

      MySwal.fire({
        icon: "error",
        title: "Payment Error",
        text: "An unexpected error occurred during payment. Please try again later.",
      });
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="me-5">
          <h3 style={{ color: "white", marginBottom: "0" }}>
            Top 100 Movies{" "}
            {isPremium && <span style={{ color: "gold" }}> Premium</span>}
          </h3>
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

        <div className="d-flex align-items-center ms-3">
          {isLoggedIn ? (
            <>
              {!isUpgraded && (
                <button onClick={handlePayNow} className="btn btn-warning me-2">
                  Upgrade
                </button>
              )}
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="btn btn-success"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
