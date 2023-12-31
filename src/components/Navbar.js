import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/Auth";
import { useSelector } from "react-redux";
import classes from "./Navbar.module.css";

const NavbarDetails = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logout = () => {
    alert("logged out succesfull");
    dispatch(authActions.logout());
  };

  return (
    <Navbar bg="white" expand="lg">
      <Navbar.Brand className={classes.head}> MailBox</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!isAuthenticated && (
            <NavLink
              to="/login"
              className={classes.style}
              style={{ color: "DarkBlue" }}
            >
              Login
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink
              to="/signup"
              className={classes.style}
              style={{ color: "green" }}
            >
              Signup
            </NavLink>
          )}

          {isAuthenticated && (
            <NavLink
              to="/composemail"
              className={classes.style}
              style={{ color: "purple" }}
            >
              Compose
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink
              to="/inbox"
              className={classes.style}
              style={{ color: "SaddleBrown" }}
            >
              Inbox
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink
              to="/sent"
              className={classes.style}
              style={{ color: "black" }}
            >
              Sent box
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink
              to="/login"
              className={classes.style}
              style={{ color: "red" }}
              onClick={logout}
            >
              Logout
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarDetails;
