"use strict";

/**
 * Calculates the average score for a given game based on its reviews.
 *
 * @param {Object} game - The game object with reviews.
 * @param {Array} game.reviews - An array of review objects with scores.
 *
 * @returns {number} The rounded average score for the game.
 *
 */
const calculateAverageScore = (game) => {
  const totalScore = game.reviews.reduce(
    (accumulator, review) => accumulator + review.score,
    0
  );

  const averageScore = totalScore / game.reviews.length || 0;

  const roundedAverageScore = Math.round(averageScore * 10) / 10;

  return roundedAverageScore;
};

/**
 * Calculates and returns the top 13 games with the highest average scores.
 *
 * @param {Array} games - An array of game objects with reviews.
 *
 * @returns {Array} An array of top 13 games with the highest average scores.
 *
 */
const calculateTopGames = (games) => {
  const gamesWithAverageScore = [...games].map((game) => {
    const totalScore = game.reviews.reduce(
      (accumulator, review) => accumulator + review.score,
      0
    );
    const averageScore = totalScore / game.reviews.length || 0;
    return { ...game, averageScore };
  });

  const sortedGames = gamesWithAverageScore.sort(
    (a, b) => b.averageScore - a.averageScore
  );

  const topGames = sortedGames.slice(0, 13);

  return topGames;
};

/**
 * Formats a date string to the format 'YYYY-MM-DD HH:mm'.
 *
 * @param {string} dateString - The input date string.
 *
 * @returns {string} The formatted date string.
 *
 */
const formatDateString = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${month}-${day}-${year} at ${hour}:${minute}`;
};

/**
 * Formats a given score to a string representation.
 *
 * @param {number|null|undefined} score - The score to be formatted. It can be a number, null, or undefined.
 *
 * @returns {string} The formatted score as a string followed by "/10". If the score is null or undefined, it returns "-".
 *
 */
const formatScore = (score) => {
  let formattedScore = "";

  if (score === null || score === undefined) {
    formattedScore = "-";
  } else {
    const scaledScore = score * 2;
    formattedScore = Number.isInteger(scaledScore)
      ? scaledScore.toString()
      : scaledScore.toFixed(1);
    formattedScore += "/10";
  }

  return formattedScore;
};

export {
  calculateAverageScore,
  calculateTopGames,
  formatDateString,
  formatScore,
};
