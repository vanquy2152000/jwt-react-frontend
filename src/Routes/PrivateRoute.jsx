import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
    }
  }, []);

  return <>{props.children}</>;
};

export default PrivateRoute;
