import React from "react";
import { Button, Form } from "react-bootstrap";
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
      <Form>
        <Form.Group>
          <Form.Control
            as="select"
            name="genre"
            value={gameFilter.genre}
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
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            name="platform"
            value={gameFilter.platform}
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
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            name="developer"
            value={gameFilter.developer}
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
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="title"
            placeholder="Search by name..."
            value={gameFilter.title}
            onChange={(e) => {
              updateGameFilter(e.target);
            }}
          />
        </Form.Group>
        <Button variant="primary" onClick={resetGameFilter}>
          Reset
        </Button>
      </Form>
    </>
  );
};

export default GamesFilters;