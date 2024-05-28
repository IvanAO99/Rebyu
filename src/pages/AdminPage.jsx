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
import CustomModal from "../components/CustomModal";
import GameFormModal from "../components/GameFormModal";
import useGames from "../hooks/useGames";
import DeleteModal from "../components/DeleteModal";
import InformativeTable from "../components/InformativeTable";

const AdminPage = () => {
  const { isSessionUp, user, isAdmin, getAllUsers, allUsers } = useUsers();
  const {
    isGameFormModalOpen,
    creationMode,
    isGameDeleteModalOpen,
    hideGameDeleteModal,
    deleteGame,
    selectedGame,
  } = useGames();

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
          <div className="container min-h-screen flex flex-col mx-auto p-5">
            {<Outlet />}
          </div>
        </>
      ) : (
        <>
          <div>
            <p>ERROR</p>
          </div>
        </>
      )}
      {isGameFormModalOpen && (
        <>
          <CustomModal isOpen={isGameFormModalOpen}>
            <GameFormModal creationMode={creationMode} />
          </CustomModal>
        </>
      )}
      {isGameDeleteModalOpen && (
        <>
          <CustomModal isOpen={isGameDeleteModalOpen}>
            <DeleteModal
              title={"DELETE GAME"}
              hideFunction={hideGameDeleteModal}
              deleteFunction={deleteGame}
            >
              <h1 className="text-xl font-bold text-center">
                ARE YOU SURE YOU WANT TO{" "}
                <span className="text-red-600">DELETE</span> THIS GAME?
              </h1>
              <InformativeTable
                object={{
                  name: selectedGame.title,
                }}
              />
            </DeleteModal>
          </CustomModal>
        </>
      )}
    </>
  );
};

export default AdminPage;
