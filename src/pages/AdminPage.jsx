import React, { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import Games from "../components/Games";
import { FaPlus } from "react-icons/fa6";
import GameForm from "../components/GameForm";
import useReviews from "../hooks/useReviews";
import Reviews from "../components/Reviews";
import Users from "../components/Users";
import { validateObject } from "../libraries/validateData";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  const { isSessionUp, user, isAdmin, getAllUsers, allUsers } = useUsers();

  const [selectedOption, setSelectedOption] = useState("users");
  const { getAllReviews, reviewsWithLikes, isLoadingReviews } = useReviews();

  useEffect(() => {
    //getAllReviews();
    getAllUsers();
  }, []);

  return (
    <>
      {isSessionUp && validateObject(user) && isAdmin ? (
        <>
          <div className="container mx-auto p-5">{<Outlet />}</div>
        </>
      ) : (
        <>
          <div className="min-h-screen flex flex-col mt-10 items-center bg-gray-50 dark:bg-gray-700 text-black dark:text-white">
            <h1 className="text-6xl font-bold mb-4 dark:text-white text-black">
              Welcome, <span className="text-purple-600">{user.name}</span>
            </h1>
            <p className="dark:text-white text-black italic">
              What do you want to manage today?
            </p>
            <nav
              className="my-7"
              onClick={(e) => {
                let eventID = e.target.id;
                if (eventID === "users-menu") setSelectedOption("users");
                if (eventID === "games-menu") setSelectedOption("games");
                if (eventID === "reviews-menu") setSelectedOption("reviews");
              }}
            >
              <ul className="flex flex-col items-center space-y-5 md:space-y-0 md:flex-row md:space-x-10">
                <li>
                  <button
                    id="users-menu"
                    className="hover:font-bold hover:text-purple-700 dark:hover:text-purple-400 text-lg rounded-full px-5 py-2 bg-purple-300 dark:bg-purple-700"
                  >
                    USERS
                  </button>
                </li>
                <li>
                  <button
                    id="games-menu"
                    className="hover:font-bold hover:text-purple-700 dark:hover:text-purple-400 text-lg rounded-full px-5 py-2 bg-purple-300 dark:bg-purple-700"
                  >
                    GAMES
                  </button>
                </li>
                <li>
                  <button
                    id="reviews-menu"
                    className="hover:font-bold hover:text-purple-700 dark:hover:text-purple-400 text-lg rounded-full px-5 py-2 bg-purple-300 dark:bg-purple-700"
                  >
                    REVIEWS
                  </button>
                </li>
              </ul>
            </nav>
            <div className="w-full">
              {selectedOption === "users" && <Users users={allUsers} />}
              {selectedOption === "games" && (
                <>
                  <GameForm creationMode={true} />
                  <GameForm creationMode={false} />
                  <div className="flex items-center gap-5 justify-center">
                    <button
                      type="button"
                      className="rounded-full bg-purple-600 hover:bg-purple-400 text-gray-50 p-2"
                    >
                      <FaPlus size={24} />
                    </button>
                    <p className="text-bold text-2xl">ADD A NEW GAME</p>
                  </div>
                  <Games />
                </>
              )}
              {selectedOption === "reviews" && (
                <Reviews
                  loading={isLoadingReviews}
                  reviews={reviewsWithLikes}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminPage;
