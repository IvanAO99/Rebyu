import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import useUsers from "../../hooks/useUsers.js";

import Loading from "../Loading/Loading.jsx";

import "./NavComponent.css";

/**
 * A React component for rendering the navigation bar.
 * @function NavComponent
 * @returns {JSX.Element} The rendered component.
 */
const NavComponent = () => {
  const navigate = useNavigate();
  const { isSessionUp, isLoadingUser, user, signOut } = useUsers();

  return (
    <Fragment>
      {/* Navigation Bar */}
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        className="bg-body-tertiary shadow"
      >
        {/* Container for navigation content */}
        <Container fluid className="d-flex flex-row align-items-center mx-5">
          {/* Logo and brand */}
          <Navbar.Brand
            as={Link}
            to={"/games"}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <img
              alt="Rebyu logo"
              src="./src/assets/logo.svg"
              width="50"
              height="50"
              className="d-inline-block align-center"
              loading="lazy"
            />{" "}
            <span className="nav-link">REBYU</span>
          </Navbar.Brand>
          {/* Navbar toggle button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* Navbar collapse content */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Navigation links */}
            <Nav className="me-auto flex-fill">
              <div className="flex-grow-1 d-flex flex-row justify-content-start align-items-center text-center">
                {/* Games link */}
                <Nav.Link as={Link} to={"/games"}>
                  Games
                </Nav.Link>
                {/* Sign Up link if not signed in */}
                {!isSessionUp && (
                  <Fragment>
                    <Nav.Link as={Link} to={"/sign-in"}>
                      Sign Up
                    </Nav.Link>
                  </Fragment>
                )}
              </div>
              {/* User-related content */}
              {isSessionUp ? (
                <Fragment>
                  {/* Loading spinner if user data is still loading */}
                  {isLoadingUser ? (
                    <Fragment>
                      <Loading />
                    </Fragment>
                  ) : (
                    <Fragment>
                      {/* User profile and dropdown menu */}
                      <div className="d-flex flex-row justify-content-start align-items-center">
                        <Image
                          src={
                            user.profile_photo ||
                            "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/users/default.jpg"
                          }
                          width="30"
                          height="30"
                          roundedCircle
                        />
                        <NavDropdown
                          title={user.nickname}
                          id="basic-nav-dropdown"
                          drop="down"
                        >
                          <NavDropdown.Item href="/games">
                            Profile
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/games">
                            Lists
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to={"/game"}>
                            Review form
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          {/* Sign Out button */}
                          <NavDropdown.Item
                            as={Button}
                            onClick={() => signOut()}
                          >
                            Sign Out
                          </NavDropdown.Item>
                        </NavDropdown>
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              ) : (
                // Sign In button if not signed in
                <Button variant="primary" onClick={() => navigate("/")}>
                  Sign In
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavComponent;
