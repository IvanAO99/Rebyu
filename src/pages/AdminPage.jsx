import React, { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import GameForm from "../components/GameForm";
import useReviews from "../hooks/useReviews";
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

  const {
    getAllReviews,
    isLoadingReviews,
    deletingReview,
    hideReviewDeleteModal,
    handleReviewSubmit,
    reviewForm,
  } = useReviews();

  const informativeTableUser = reviewForm?.users?.nickname
    ? reviewForm.users.nickname
    : "";
  const informativeTableMessage = reviewForm?.reviews?.message
    ? reviewForm.reviews.message
    : "";

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <>
      {isSessionUp && validateObject(user) && isAdmin ? (
        <>
          <div className="container min-h-full flex flex-col mx-auto p-5">
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
      <CustomModal isOpen={isGameFormModalOpen}>
        <GameFormModal creationMode={creationMode} />
      </CustomModal>
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
      <CustomModal isOpen={deletingReview}>
        <DeleteModal
          title={"DELETE REVIEW"}
          hideFunction={hideReviewDeleteModal}
          deleteFunction={handleReviewSubmit}
        >
          <h1 className="text-xl font-bold text-center">
            ARE YOU SURE YOU WANT TO{" "}
            <span className="text-red-600">DELETE</span> THIS REVIEW?
          </h1>
          <InformativeTable
            object={{
              user: informativeTableUser,
              message: informativeTableMessage,
            }}
          />
        </DeleteModal>
      </CustomModal>
    </>
  );
};

export default AdminPage;
