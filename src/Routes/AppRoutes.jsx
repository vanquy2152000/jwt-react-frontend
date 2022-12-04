import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Project from "../components/Project";
import Home from "./../components/Home";
import User from "./../components/ManageUser/User";
import Register from "./../components/Register/Register";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Project />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
