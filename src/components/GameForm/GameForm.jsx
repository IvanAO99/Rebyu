import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useGames from "../../hooks/useGames.js";
import ShowObject from "../ShowObject/ShowObject.jsx";
import { Row, Col } from "react-bootstrap";

const GameForm = () => {
  const {
    developers,
    platforms,
    genres,
    gameRegister,
    updateGameRegister,
    handleCheckboxChange,
    handleGameRegister,
    gameRegisterErrors
  } = useGames();

  return (
    <>
      <ShowObject games={gameRegister} />
      <Card className="p-0">
        <Card.Header className="text-center">GAME REGISTER</Card.Header>
        <Card.Body className="p-4">
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="game-register-name">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                name="title"
                placeholder="Enter title"
                value={gameRegister.title || ""}
                onChange={(e) => {
                  updateGameRegister(e.target);
                }}
              />
              <Form.Text className="text-muted">
                Enter a valid title for the game.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {gameRegisterErrors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="game-register-synopsis">
              <Form.Label>Synopsis</Form.Label>
              <Form.Control
                type="synopsis"
                name="synopsis"
                placeholder="Enter a synopsis"
                value={gameRegister.synopsis || ""}
                onChange={(e) => {
                  updateGameRegister(e.target);
                }}
              />
              <Form.Text className="text-muted">
                The synopsis must contain between 500 and 700 characters and
                cannot contain special characters.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="game-register-price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter price"
                value={gameRegister.price || ""}
                onChange={(e) => {
                  updateGameRegister(e.target);
                }}
              />
              <Form.Text className="text-muted">
                Enter the price of the game.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="game-register-release-date">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="release_date"
                value={gameRegister.release_date || ""}
                onChange={(e) => {
                  updateGameRegister(e.target);
                }}
              />
              <Form.Text className="text-muted">
                Select the release date of the game.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="game-register-cover">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="cover_pic"
                name="cover_pic"
                placeholder="Enter a cover link"
                value={gameRegister.cover_pic || ""}
                onChange={(e) => {
                  updateGameRegister(e.target);
                }}
              />
              <Form.Text className="text-muted">
                Upload a cover image for the game.
              </Form.Text>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="game-register-cover">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control type="file" name="cover" accept="image/*" />
              <Form.Text className="text-muted">
                Upload a cover image for the game.
              </Form.Text>
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="game-register-trailer">
              <Form.Label>Trailer Link</Form.Label>
              <Form.Control
                type="url"
                name="trailer"
                placeholder="Enter trailer link"
                value={gameRegister.trailer || ""}
                onChange={(e) => {
                  updateGameRegister(e.target);
                }}
              />
              <Form.Text className="text-muted">
                Enter a link to the game's trailer.
              </Form.Text>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="game-register-developer"
                >
                  <Form.Label>Developer</Form.Label>
                  {developers ? (
                    developers.map((developer) => {
                      return (
                        <Form.Check
                          key={developer.id}
                          id={`game-register-developer-${developer.id}`}
                          type="checkbox"
                          label={developer.name}
                          name="developer"
                          value={developer.name}
                          onChange={handleCheckboxChange}
                        />
                      );
                    })
                  ) : (
                    <div>Error. Reload the page</div>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="game-register-platform">
                  <Form.Label>Platform</Form.Label>
                  {platforms ? (
                    platforms.map((platform) => {
                      return (
                        <Form.Check
                          key={platform.id}
                          id={`game-register-platform-${platform.id}`}
                          type="checkbox"
                          label={platform.name}
                          name="platform"
                          value={platform.name}
                          onChange={handleCheckboxChange}
                        />
                      );
                    })
                  ) : (
                    <div>Error. Reload the page</div>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="game-register-genre">
                  <Form.Label>Genre</Form.Label>
                  {genres ? (
                    genres.map((genre) => {
                      return (
                        <Form.Check
                          key={genre.id}
                          id={`game-register-genre-${genre.id}`}
                          type="checkbox"
                          label={genre.name}
                          name="genre"
                          value={genre.name}
                          onChange={handleCheckboxChange}
                        />
                      );
                    })
                  ) : (
                    <div>Error. Reload the page</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="button"
              onClick={() => {
                handleGameRegister();
              }}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default GameForm;
