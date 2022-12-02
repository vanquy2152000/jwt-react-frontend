import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  let navigate = useNavigate();

  const handleCreateNewAccount = () => {
    navigate("/register")
  }

  return (
    <div className="login-container">
      <div className="container">
        <div className="row no-gutters">

          <div className="content-left col-12 d-none col-sm-7 d-sm-flex ">
            <div className="brand">
              ManageUser
            </div>
            <div className="detail">
              ManageUser helps you connect and share with the people in your life.
            </div>
          </div>

          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 mt-3">
            <input type="text" className="form-control" placeholder="Email address or phone number" />
            <input type="password" className="form-control" placeholder="Password" />
            <button className="btn btn-primary">
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
                onClick={() => handleCreateNewAccount()}
              >Create New Account</button>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

export default Login  