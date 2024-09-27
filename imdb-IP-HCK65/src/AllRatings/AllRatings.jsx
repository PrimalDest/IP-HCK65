import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get("https://api.saviours.site/ratings/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const loggedInUserId = JSON.parse(
          localStorage.getItem("logged_in_user")
        ).id;
        const userRatings = response.data.filter(
          (rating) => rating.userId === loggedInUserId
        );

        setRatings(userRatings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ratings", error);
      }
    };

    fetchRatings();
  }, []);

  const handleUpdateRating = (ratingId) => {
    navigate(`/update/${ratingId}`);
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this rating!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`https://api.saviours.site/ratings/${ratingId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRatings((prevRatings) =>
          prevRatings.filter((r) => r.id !== ratingId)
        );

        Swal.fire("Deleted!", "Your rating has been deleted.", "success");
      }
    } catch (error) {
      console.error(`Error deleting rating with ID ${ratingId}`, error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <FaStar key={i} color={i <= rating ? "#ffc107" : "#e4e5e9"} size={20} />
      );
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center mb-4">Ratings List</h2>
        <>
          {ratings.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    No
                  </th>
                  <th scope="col" className="text-center">
                    Id
                  </th>
                  <th scope="col" className="text-center">
                    User ID
                  </th>
                  <th scope="col" className="text-center">
                    IMDB ID
                  </th>
                  <th scope="col" className="text-center">
                    Rating
                  </th>
                  <th scope="col" className="text-center">
                    Rating star
                  </th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating, index) => (
                  <tr key={rating.id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{rating.id}</td>
                    <td className="text-center">{rating.userId}</td>
                    <td className="text-center">{rating.imdbid}</td>
                    <td className="text-center">{rating.rating}</td>
                    <td className="text-center">
                      {renderStars(rating.rating)}
                    </td>
                    <td className="d-flex justify-content-center">
                      <button
                        onClick={() => handleUpdateRating(rating.id)}
                        className="btn btn-success me-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteRating(rating.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No ratings available.</p>
          )}
        </>
      </div>
    </>
  );
};

export default RatingList;
