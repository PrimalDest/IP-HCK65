import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./component/store";
import AppRouter from "./Router/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="859033787775-g1fa3estv4es67g2u0iqnsis0l9e2nrc.apps.googleusercontent.com">
        <RouterProvider router={AppRouter} />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);