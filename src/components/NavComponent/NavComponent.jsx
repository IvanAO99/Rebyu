import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import useUsers from "../../hooks/useUsers.js";

const NavComponent = () => {
  const { isSessionUp, user, signOut } = useUsers();
  
  return (
    <Fragment>
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        className="bg-body-tertiary shadow"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"}>
            REBYU
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!isSessionUp && (
                <Nav.Link as={Link} to={"/"}>
                  Home
                </Nav.Link>
              )}

              <Nav.Link as={Link} to={"/games"}>
                Games
              </Nav.Link>
              {isSessionUp ? (
                <Fragment>
                  <Image
                    src={
                      user.profile_photo ||
                      "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/users/default.jpg"
                    }
                    roundedCircle
                    style={{ width: "4rem" }}
                  />
                  <NavDropdown title={user.nickname} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to={"/game"}>
                      Review form
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Button} onClick={() => signOut()}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Fragment>
              ) : (
                <Nav.Link as={Link} to={"/sign-in"}>
                  Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavComponent;
