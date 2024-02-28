import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import useGames from "../../hooks/useGames";

const GamesFilters = () => {
  const {
    genres,
    developers,
    platforms,
    updateGameFilter,
    resetGameFilter,
    gameFilter,
  } = useGames();
  return (
    <>
      <Card className="shadow">
        <Card.Body>
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                aria-label="Genre select"
                name="genre"
                value={gameFilter.genre || "*"}
                onChange={(e) => {
                  updateGameFilter(e.target);
                }}
              >
                <option value="*">All</option>
                {genres ? (
                  genres.map((genre) => {
                    return (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    );
                  })
                ) : (
                  <div>Error. Reload the page</div>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Platform</Form.Label>
              <Form.Select
                aria-label="Platform select"
                name="platform"
                value={gameFilter.platform || "*"}
                onChange={(e) => {
                  updateGameFilter(e.target);
                }}
              >
                <option value="*">All</option>
                {platforms ? (
                  platforms.map((platform) => {
                    return (
                      <option key={platform.id} value={platform.id}>
                        {platform.name}
                      </option>
                    );
                  })
                ) : (
                  <div>Error. Reload the page</div>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Developer</Form.Label>
              <Form.Select
                aria-label="Developer select"
                name="developer"
                value={gameFilter.developer || "*"}
                onChange={(e) => {
                  updateGameFilter(e.target);
                }}
              >
                <option value="*">All</option>
                {developers ? (
                  developers.map((developer) => {
                    return (
                      <option key={developer.id} value={developer.id}>
                        {developer.name}
                      </option>
                    );
                  })
                ) : (
                  <div>Error. Reload the page</div>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="search"
                name="title"
                placeholder="Search by name..."
                value={gameFilter.title}
                onChange={(e) => {
                  updateGameFilter(e.target);
                }}
              />
            </Form.Group>
            <Button
              className="align-self-center"
              variant="primary"
              onClick={resetGameFilter}
            >
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default GamesFilters;
