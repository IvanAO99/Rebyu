"use strict";

const calculateAverageScore = (game) => {
  const totalScore = game.reviews.reduce(
    (accumulator, review) => accumulator + review.score,
    0
  );

  const averageScore = totalScore / game.reviews.length || 0; // Avoid division by zero

  // Round the average score to one decimal place
  const roundedAverageScore = Math.round(averageScore * 10) / 10;

  return roundedAverageScore;
};

const calculateTopGames = (games) => {
  // Calculate the average score for each game
  const gamesWithAverageScore = [...games].map((game) => {
    const totalScore = game.reviews.reduce(
      (accumulator, review) => accumulator + review.score,
      0
    );
    const averageScore = totalScore / game.reviews.length || 0; // Avoid division by zero
    return { ...game, averageScore };
  });

  console.log(gamesWithAverageScore);

  // Sort the games by average score in descending order
  const sortedGames = gamesWithAverageScore.sort(
    (a, b) => b.averageScore - a.averageScore
  );

  // Get the top 13 games with the highest average score
  const topGames = sortedGames.slice(0, 13);

  return topGames;
};

const formatDateString = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export { calculateAverageScore, calculateTopGames, formatDateString };
