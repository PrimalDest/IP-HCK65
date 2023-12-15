import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const RatingForm = ({ movieId }) => {
  const [userIdInput, setUserIdInput] = useState("");
  const [rating, setRating] = useState("");
  const [imdbid, setImdbid] = useState(movieId);
  const [accessToken, setAccessToken] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setAccessToken(storedToken);
    }

    const loggedInUser = JSON.parse(localStorage.getItem("logged_in_user"));
    if (loggedInUser) {
      setUserIdInput(loggedInUser.id);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "userId":
        setUserIdInput(value);
        break;
      case "rating":
        setRating(value);
        break;
      case "imdbid":
        setImdbid(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (!userIdInput || !rating || !imdbid) {
        throw new Error("All fields are required");
      }

      const response = await axios.post(
        "https://api.saviours.site/ratings",
        {
          userId: userIdInput,
          rating,
          imdbid,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("New rating created:", response.data);

      setSuccessMessage("Rating submitted successfully!");
      navigate("/rating");
    } catch (error) {
      console.error("Error creating rating:", error);
      setErrorMessage("An error occurred while creating the rating.");
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Create Rating</h2>
        <form
          style={{
            width: "300px",
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
          }}
          onSubmit={handleSubmit}
        >
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="userId" style={labelStyle}>
              UserId:
            </label>
            <input
              type="number"
              id="userId"
              value={userIdInput}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={clearMessages}
            />
            <label htmlFor="rating" style={labelStyle}>
              Rating:
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={clearMessages}
            />
            <label htmlFor="imdbid" style={labelStyle}>
              IMDb ID:
            </label>
            <input
              type="text"
              id="imdbid"
              value={imdbid}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={clearMessages}
            />
          </div>
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Submitting..." : "Submit Rating"}
          </button>
        </form>
        {successMessage && <p style={successStyle}>{successMessage}</p>}
        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
      </div>
    </>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
  marginTop: "3px",
};

const buttonStyle = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
};

const successStyle = {
  color: "green",
  marginTop: "10px",
};

const errorStyle = {
  color: "red",
  marginTop: "10px",
};

export default RatingForm;
