import React, { useEffect, useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidRePassword: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    // axios.get("http://localhost:8080/api/test").then((data) => {
    //   console.log("check data", data);
    // });
  }, []);

  const isValidationError = () => {
    let regx =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setObjCheckInput(defaultValidInput);

    if (!email) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Email is required!");
      return false;
    }

    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!phone) {
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      toast.error("Phone is required!");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required!");
      return false;
    }
    if (password !== rePassword) {
      setObjCheckInput({ ...defaultValidInput, isValidRePassword: false });
      toast.error("Your password is not the same");
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    let check = isValidationError();

    if (check === true) {
      axios.post("http://localhost:8080/api/v1/register", {
        email,
        phone,
        password,
        rePassword,
      });
    }
  };

  return (
    <div className="register-container">
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
            <div>
              <label htmlFor="email" className="mb-1">
                Email :
              </label>
              <input
                type="text"
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email address"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1">
                Phone :
              </label>
              <input
                type="text"
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="mb-1">
                Username :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1">
                Password :
              </label>
              <input
                type="password"
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="re-password" className="mb-1">
                Re-enter Password :
              </label>
              <input
                type="password"
                className={
                  objCheckInput.isValidRePassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                id="re-password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <hr />
            <div className="text-center" onClick={() => handleLogin()}>
              <button className="btn btn-success">Already've an account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
