import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/userService";
import "./Login.scss";
import { toast } from "react-toastify";

const Login = () => {
  let navigate = useNavigate();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!valueLogin) {
      toast.error("Please enter a email or phone number");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    let res = await loginUser(valueLogin, password);
    console.log("check data : ", res.data);

    if (res && res.data && +res.data.EC === 0) {
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };

      sessionStorage.setItem("account", JSON.stringify(data));

      toast.success(res.data.EM);

      navigate("/users");
      
      window.location.reload();
    }
    if (res && +res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };

  const handleKeyDown = (e) => {
    if (e && e.key === "Enter") {
      console.log("check enter", e.key);
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row no-gutters">
          <div className="content-left col-12 d-none col-sm-7 d-sm-flex ">
            <div className="brand">ManageUser</div>
            <div className="detail">
              ManageUser helps you connect and share with the people in your
              life.
            </div>
          </div>

          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Log in
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgotten password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => navigate("/register")}
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
