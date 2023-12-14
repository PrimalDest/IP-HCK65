import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const RatingForm = ({ userId, movieId }) => {
  const [userIdInput, setUserIdInput] = useState(userId);
  const [rating, setRating] = useState("");
  const [imdbid, setImdbid] = useState(movieId);
  const [accessToken, setAccessToken] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setAccessToken(storedToken);
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

    try {
      const response = await axios.post(
        "http://localhost:3000/ratings",
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

      navigate("/rating");
    } catch (error) {
      console.error("Error creating rating:", error);
      setErrorMessage("An error occurred while creating the rating.");
    }
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
        <h2>Create Rating</h2>
        <form
          style={{
            width: "300px",
            marginTop: "20px",
          }}
          onSubmit={handleSubmit}
        >
          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <label
              htmlFor="userId"
              style={{
                display: "block",
                marginBottom: "5px",
              }}
            >
              UserId:
            </label>
            <input
              type="number"
              id="userId"
              value={userIdInput}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <label
              htmlFor="rating"
              style={{
                display: "block",
                marginBottom: "5px",
              }}
            >
              Rating:
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <label
              htmlFor="imdbid"
              style={{
                display: "block",
                marginBottom: "5px",
              }}
            >
              IMDb ID:
            </label>
            <input
              type="text"
              id="imdbid"
              value={imdbid}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle} onSubmit={handleSubmit}>
            Submit Rating
          </button>
        </form>
        {errorMessage && (
          <p
            style={{
              color: "red",
              marginTop: "10px",
            }}
          >
            {errorMessage}
          </p>
        )}
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
};

export default RatingForm;
