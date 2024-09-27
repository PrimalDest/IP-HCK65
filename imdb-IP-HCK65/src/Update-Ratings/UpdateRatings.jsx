import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRating = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ratingData, setRatingData] = useState({
    userId: "",
    rating: "",
    imdbid: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const response = await axios.get(
          `https://api.saviours.site/ratings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setRatingData(response.data);
      } catch (error) {
        console.error("Error fetching rating data:", error);
        setErrorMessage("Failed to fetch rating data");
      }
    };

    fetchRatingData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://api.saviours.site/ratings/${id}`, ratingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      navigate("/rating");
    } catch (error) {
      console.error("Error updating rating:", error);
      setErrorMessage("Failed to update rating");
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
        <h2>Update Rating</h2>
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
              name="userId"
              value={ratingData.userId}
              onChange={handleChange}
              required
              disabled
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
              name="rating"
              value={ratingData.rating}
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
              name="imdbid"
              value={ratingData.imdbid}
              onChange={handleChange}
              required
              disabled
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Update Rating
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

export default UpdateRating;
