import React, { useEffect, useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../Services/userService";
import _ from 'lodash'

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [rePassword, setRePassword] = useState("");

  const defaultUserData = {
    email: '',
    phone: '',
    username: '',
    password: '',
    rePassword: '',
  }


  const defaultValidInput = {
    email: true,
    phone: true,
    password: true,
    rePassword: true,
  };

  const [userData, setUserData] = useState(defaultUserData)
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;

    setUserData(_userData);
  }

  const isValidationError = () => {
    let isValidateEmail = validateEmail(email);

    setObjCheckInput(defaultValidInput);

    // if (!email) {
    //   setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
    //   toast.error("Email is required!");
    //   return false;
    // }

    // if (!isValidateEmail) {
    //   setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
    //   toast.error("Please enter a valid email address");
    //   return false;
    // }
    // if (!phone) {
    //   setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
    //   toast.error("Phone is required!");
    //   return false;
    // }
    // if (!password) {
    //   setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
    //   toast.error("Password is required!");
    //   return false;
    // }
    // if (password !== rePassword) {
    //   setObjCheckInput({ ...defaultValidInput, isValidRePassword: false });
    //   toast.error("Your password is not the same");
    //   return false;
    // }

    let arr = ["email", "phone", "password", "rePassword"]
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(defaultValidInput)
        _validInputs[arr[i]] = false;
        setObjCheckInput(_validInputs)

        toast.error(`Empty input ${arr[i]}`)

        check = false;
        break;
      }
    }


    return false;
  };

  const handleRegister = async () => {
    let check = isValidationError();

    if (check === true) {
      let res = await registerNewUser(email, username, phone, password);
      console.log("check res", res);

      if (res && +res.EC === 0) {
        toast.success(res.EM);
        navigate("/login");
      } else {
        toast.error(res.EM);
      }
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
                value={userData.email}
                onChange={(e) => handleOnChangeInput(e.target.value, "email")}
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
                value={userData.phone}
                onChange={(e) => handleOnChangeInput(e.target.value, "phone")}
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
                value={userData.username}
                onChange={(e) => handleOnChangeInput(e.target.value, "username")}
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
                value={userData.password}
                onChange={(e) => handleOnChangeInput(e.target.value, "password")}
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
                value={userData.rePassword}
                onChange={(e) => handleOnChangeInput(e.target.value, "rePassword")}
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
