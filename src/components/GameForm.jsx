import React from "react";
import useGames from "../hooks/useGames";

function GameForm({ creationMode }) {
  const {
    developers,
    platforms,
    genres,
    gameRegister,
    updateGameForm,
    handleCheckboxChange,
    handleGameForm,
    gameRegisterErrors,
    selectedGame,
  } = useGames();

  let actualGame = creationMode ? gameRegister : selectedGame;

  return (
    <div>
      <div className="my-5">
        <h1 className="text-6xl font-bold text-center">{creationMode ? "GAME CREATION" : "GAME UPDATE"}</h1>
        <h2 className="text-2xl text-center italic">
        {creationMode ? "Share your games with the community" : "Update a game for the community"}
        </h2>
      </div>
      {/* <pre>{JSON.stringify(actualGame.title)}</pre>
      <pre>{JSON.stringify(selectedGame.title)}</pre> */}
      <form
        className="md:w-full flex flex-col justify-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:w-full flex flex-col gap-5 md:pr-5 items-center">
          <div className="flex flex-col gap-1 w-full max-w-md">
            <label
              htmlFor="title"
              className="block text-xl font-bold text-purple-600"
            >
              Title
            </label>
            <input
              autoFocus
              type="text"
              id="title"
              name="title"
              placeholder="Enter game title..."
              className={`w-full border-none focus:outline-none ${
                gameRegisterErrors.title
                  ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                  : "focus:ring-2 focus:ring-purple-600"
              } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
              value={actualGame.title || ""}
              onChange={(e) => {
                updateGameForm(e.target, creationMode);
              }}
            />

            {gameRegisterErrors.title && (<p className="text-red-400">{gameRegisterErrors.title}</p>)}
          </div>
          <div className="flex flex-col gap-1 w-full max-w-md">
            <label
              htmlFor="release_date"
              className="block text-xl font-bold text-purple-600"
            >
              Release Date
            </label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              className={`w-full border-none focus:outline-none ${
                gameRegisterErrors.release_date
                  ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                  : "focus:ring-2 focus:ring-purple-600"
              } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
              value={actualGame.release_date || ""}
              onChange={(event) => {
                updateGameForm(event.target, creationMode);
              }}
            />
            {gameRegisterErrors.release_date && (<p className="text-red-400">{gameRegisterErrors.release_date}</p>)}
          </div>
          <div className="flex flex-col gap-1 w-full max-w-md">
            <label
              htmlFor="cover_pic"
              className="block text-xl font-bold text-purple-600"
            >
              Cover Picture URL
            </label>
            <input
              type="url"
              id="cover_pic"
              name="cover_pic"
              placeholder="Enter cover picture URL..."
              className={`w-full border-none focus:outline-none ${
                gameRegisterErrors.cover_pic
                  ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                  : "focus:ring-2 focus:ring-purple-600"
              } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
              value={actualGame.cover_pic || ""}
              onChange={(event) => {
                updateGameForm(event.target, creationMode);
              }}
            />
            {gameRegisterErrors.cover_pic && (<p className="text-red-400">{gameRegisterErrors.cover_pic}</p>)}
          </div>
          <div className="flex flex-col gap-1 w-full max-w-md">
            <label
              htmlFor="trailer"
              className="block text-xl font-bold text-purple-600"
            >
              Trailer URL
            </label>
            <input
              type="url"
              id="trailer"
              name="trailer"
              placeholder="Enter trailer URL..."
              className={`w-full border-none focus:outline-none ${
                gameRegisterErrors.trailer
                  ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                  : "focus:ring-2 focus:ring-purple-600"
              } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
              value={actualGame.trailer || ""}
              onChange={(event) => {
                updateGameForm(event.target, creationMode);
              }}
            />
            {gameRegisterErrors.trailer && (<p className="text-red-400">{gameRegisterErrors.trailer}</p>)}
          </div>
          <div className="flex flex-col gap-1 w-full max-w-md">
            <label
              htmlFor="synopsis"
              className="block text-xl font-bold text-purple-600"
            >
              Synopsis
            </label>
            <textarea
              id="synopsis"
              name="synopsis"
              placeholder="Enter game synopsis..."
              className={`w-full border-none focus:outline-none resize-none ${
                gameRegisterErrors.synopsis
                  ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                  : "focus:ring-2 focus:ring-purple-600"
              } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow h-32`}
              value={actualGame.synopsis || ""}
              onChange={(event) => {
                updateGameForm(event.target, creationMode);
              }}
            />
            {gameRegisterErrors.synopsis && (<p className="text-red-400">{gameRegisterErrors.synopsis}</p>)}
          </div>
        </div>
        <div className="md:w-full flex flex-col md:flex-row md:pl-5 items-center justify-center gap-24 my-10">
          <div className="flex flex-col gap-1 w-fit">
            <label
              htmlFor="genre"
              className="block text-xl font-bold text-purple-600"
            >
              Genre
            </label>
            {gameRegisterErrors.game_genre && (<p className="text-red-400">{gameRegisterErrors.game_genre}</p>)}
            {genres ? (
              genres.map((genre) => (
                <div key={genre.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`game-register-genre-${genre.id}`}
                    name="game_genre"
                    value={genre.id}
                    checked={actualGame.game_genre.includes(genre.id)}
                    onChange={(e) => handleCheckboxChange(e, creationMode)}
                    className="mr-2"
                  />
                  <label htmlFor={`game-register-genre-${genre.id}`}>
                    {genre.name}
                  </label>
                </div>
              ))
            ) : (
              <div>Error. Reload the page</div>
            )}
          </div>
          <div className="flex flex-col gap-1 w-fit">
            <label
              htmlFor="developer"
              className="block text-xl font-bold text-purple-600"
            >
              Developer
            </label>
            {gameRegisterErrors.game_developer && (<p className="text-red-400">{gameRegisterErrors.game_developer}</p>)}
            {developers ? (
              developers.map((developer) => (
                <div key={developer.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`game-register-developer-${developer.id}`}
                    name="game_developer"
                    value={developer.id}
                    checked={actualGame.game_developer.includes(developer.id)}
                    onChange={(e) => handleCheckboxChange(e, creationMode)}
                    className="mr-2"
                  />
                  <label htmlFor={`game-register-developer-${developer.id}`}>
                    {developer.name}
                  </label>
                </div>
              ))
            ) : (
              <div>Error. Reload the page</div>
            )}
          </div>
          <div className=" flex flex-col gap-1 w-fit">
            <label
              htmlFor="platform"
              className="block text-xl font-bold text-purple-600"
            >
              Platform
            </label>
            {gameRegisterErrors.game_platform && (<p className="text-red-400">{gameRegisterErrors.game_platform}</p>)}
            {platforms ? (
              platforms.map((platform) => (
                <div key={platform.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`game-register-platform-${platform.id}`}
                    name="game_platform"
                    value={platform.id}
                    checked={actualGame.game_platform.includes(platform.id)}
                    onChange={(e) => handleCheckboxChange(e, creationMode)}
                    className="mr-2"
                  />
                  <label htmlFor={`game-register-platform-${platform.id}`}>
                    {platform.name}
                  </label>
                </div>
              ))
            ) : (
              <div>Error. Reload the page</div>
            )}
          </div>
        </div>
        <div className="self-center">
          <button
            className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-4 py-2 text-gray-50"
            onClick={() => handleGameForm(creationMode)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default GameForm;
