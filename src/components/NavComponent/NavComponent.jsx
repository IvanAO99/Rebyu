import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import useUsers from "../../hooks/useUsers.js";
import { Placeholder } from "react-bootstrap";

import "./NavComponent.css";

const NavComponent = () => {
  const navigate = useNavigate();
  const { isSessionUp, isLoadingUser, user, signOut } = useUsers();

  return (
    <Fragment>
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        className="bg-body-tertiary shadow"
      >
        <Container fluid className="d-flex flex-row align-items-center mx-5">
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-fill">
              <div className="flex-grow-1 d-flex flex-row justify-content-start align-items-center text-center">
                <Nav.Link as={Link} to={"/games"}>
                  Games
                </Nav.Link>
                {!isSessionUp && (
                  <Fragment>
                    <Nav.Link as={Link} to={"/sign-in"}>
                      Sign Up
                    </Nav.Link>
                  </Fragment>
                )}
              </div>
              {isSessionUp ? (
                <Fragment>
                  {isLoadingUser ? (
                    <Fragment>
                      <Placeholder as={img}></Placeholder>
                      <Placeholder></Placeholder>
                    </Fragment>
                  ) : (
                    <Fragment>
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
