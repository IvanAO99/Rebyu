import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useGames from "../../hooks/useGames.js";

/**
 * A React component for displaying filters to refine game search.
 * @function GamesFilters
 * @returns {JSX.Element} The rendered component.
 */
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
    <Fragment>
      {/* Card container for the game filters */}
      <Card className="shadow">
        <Card.Body>
          {/* Form for filtering games */}
          <Form className="d-flex flex-column">
            {/* Genre filter */}
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
                {/* Mapping through genres to create options */}
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

            {/* Platform filter */}
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
                {/* Mapping through platforms to create options */}
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

            {/* Developer filter */}
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
                {/* Mapping through developers to create options */}
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

            {/* Title search filter */}
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

            {/* Reset button */}
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
    </Fragment>
  );
};

export default GamesFilters;
