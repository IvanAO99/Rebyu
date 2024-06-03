import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";

import useUsers from "../hooks/useUsers.js";
import useGames from "../hooks/useGames.js";
import useReviews from "../hooks/useReviews.js";

import CustomModal from "../components/CustomModal.jsx";
import GameFormModal from "../components/GameFormModal.jsx";
import DeleteModal from "../components/DeleteModal.jsx";
import InformativeTable from "../components/InformativeTable.jsx";

import { validateObject } from "../libraries/validateData.js";

/**
 * Componente AdminPage
 *
 * Página de administración del sistema que permite a los administradores gestionar usuarios, juegos y reseñas.
 * Incluye opciones para crear, editar o eliminar juegos y reseñas, así como una lista de usuarios.
 *
 */
const AdminPage = () => {
  const { isSessionUp, user, isAdmin } = useUsers();
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
