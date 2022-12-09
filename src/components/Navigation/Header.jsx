import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoReact from "../../assets/images/logoReact.png";
import "./Header.scss";
import _ from "lodash";
import { UserContext } from "../../context/UserContext";
import { logoutUser } from "../../Services/userService";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logoutContext } = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate();
  console.log("user", user)

  const handleLogout = async () => {
    let res = await logoutUser(); // Clear cookies
    localStorage.removeItem('jwt') // Clear localStorage
    logoutContext() // Clear user and set isloading === false

    if (res && +res.EC === 0) {
      toast.success("Log out success")
      navigate('/login')
    } else {
      toast.error("Logout error")
    }
  }


  if (user && user.isAuthenticated === true || location.pathname === "/") {
    return (
      <>
        <Navbar className="header-container" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src={logoReact}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
              <span className="m-2">Tobi</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  Manage Users
                </NavLink>
                {/* <NavLink to="/role" className="nav-link">Role</NavLink> */}
              </Nav>
              <Nav className="d-flex gap-5">
                {
                  user?.account?.email &&
                  <span className="nav-link">Welcome <b className="text-email">{user?.account?.email}</b></span>
                }

                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {
                    user && !_.isEmpty(user) && user.isAuthenticated === true ?
                      (
                        <div className="nav-setting">
                          <NavDropdown.Item>
                            Change Password
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={() => handleLogout()}>
                            Log Out
                          </NavDropdown.Item>
                        </div>
                      ) : (
                        <NavLink to="/login" className="dropdown-item">Log in</NavLink>
                      )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return <></>
  }
};

export default Header;
