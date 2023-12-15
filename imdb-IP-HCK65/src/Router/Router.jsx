import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../login/Login";
import MovieList from "../MovieList/MovieList";
import MovieDetail from "../MovieDetail/MovieDetail";
import AllRating from "../AllRatings/AllRatings";
import CreateRatings from "../Create-Ratings/CreateRatings";
import UpdateRating from "../Update-Ratings/UpdateRatings";
import Home from "../Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Movie",
    element: <MovieList />,
  },
  {
    path: "/Detail/:movieId",
    element: <MovieDetail />,
  },
  {
    path: "/Rating",
    element: <AllRating />,
  },
  {
    path: "/Create",
    element: <CreateRatings />,
  },
  {
    path: "/Update/:id",
    element: <UpdateRating />,
  },
]);
export default router;
