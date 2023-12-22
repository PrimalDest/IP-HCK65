import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";
import "./login.css";
import Navbar from "../Navbar/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = localStorage.getItem("access_token") !== null;

      if (isLoggedIn) {
        try {
          const response = await axios.get(
            "https://api.saviours.site/user/all",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          const allUsers = response.data;
          const userInLocalStorage = JSON.parse(
            localStorage.getItem("logged_in_user")
          );
          const foundUser = allUsers.find(
            (user) => user.email === userInLocalStorage.email
          );

          if (foundUser) {
            setLoggedInUser(foundUser);
            navigate("/movie");
          } else {
            localStorage.removeItem("access_token");
            localStorage.removeItem("logged_in_user");
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleLoginSuccessWithRedirect = (user) => {
    MySwal.fire({
      icon: "success",
      title: "Login Successful!",
      text: `Welcome, ${user.username}! You will be redirected based on your role.`,
      timer: 3000,
      showConfirmButton: false,
    }).then(() => {
      setLoggedInUser(user);
      navigate("/movie");
    });
  };

  const handleLoginError = () => {
    MySwal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Email or password is incorrect. Please try again.",
    });
  };

  const handleCredentialResponse = async (response) => {
    const google_token = response.credential;

    try {
      const { data } = await axios.post(
        "https://api.saviours.site/user/login",
        {
          google_token,
        }
      );

      const { message, access_token } = data;

      const emailMatch = message.match(
        /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
      );

      if (emailMatch) {
        const email = emailMatch[0];

        const loggedInUserResponse = await axios.get(
          "https://api.saviours.site/user/all"
        );

        const loggedInUser = loggedInUserResponse.data.find(
          (user) => user.email === email
        );

        if (loggedInUser) {
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("logged_in_user", JSON.stringify(loggedInUser));

          handleLoginSuccessWithRedirect(loggedInUser);
        } else {
          console.error("Logged-in user not found in the login response.");
        }
      } else {
        console.error("Email not found in the login response.");
      }
    } catch (error) {
      handleLoginError();
      console.error("Error during Google Sign-In", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <Navbar loggedInUser={loggedInUser} />
        <div className="form-container">
          <h1>Login</h1>

          <GoogleLogin
            onSuccess={handleCredentialResponse}
            onFailure={handleLoginError}
            buttonText="Login with Google"
          />
        </div>
      </div>
    </>
  );
};

export default Login;