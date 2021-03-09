import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Menubar from "./components/Menubar";
import Navbar from "./components/Navbar";
import { login } from "./urls";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <>
    <Navbar />
    <ToastContainer />
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <>
            <Menubar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to={login()} />
        )
      }
    />
  </>
);
