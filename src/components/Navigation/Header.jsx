import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import logoReact from "../../assets/images/logoReact.png";
import "./Header.scss";
import _ from "lodash";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext)

  const location = useLocation()

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
              <Nav>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user &&
                    !_.isEmpty(user) &&
                    user.isAuthenticated === true ? (
                    <NavDropdown.Item onClick={() => handleLogOut()}>
                      Log Out
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
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
