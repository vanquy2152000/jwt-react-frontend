import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const PrivateRoute = (props) => {
  let { user } = useContext(UserContext)
  console.log("check user private :", user);

  if (user && user.isAuthenticated === true) {
    return (
      <>{props.children}</>
    )
  } else {
    return <Navigate to="/login"></Navigate>
  }

};

export default PrivateRoute;
