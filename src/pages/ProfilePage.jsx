import React, { Fragment } from "react";

import Profile from "../components/Profile.jsx";
import Lists from "../components/Lists.jsx";
import ListForm from "../components/ListForm.jsx";
import useLists from "../hooks/useLists.js";
import CustomModal from "../components/CustomModal.jsx";
import ListFormModal from "../components/ListFormModal.jsx";
import DeleteModal from "../components/DeleteModal.jsx";

const ProfilePage = () => {
  const {
    listToDelete,
    isListFormModalOpen,
    isDeleteListModalOpen,
    hideListDeleteModal,
    deleteList,
  } = useLists();
  return (
    <Fragment>
      <div>
        <Profile />
        {/*         <h3>CREAR LISTA</h3>
        <ListForm creationMode={true} />
        <h3>MODIFICAR LISTA</h3>
        <ListForm /> */}
        <Lists />
      </div>
      {isListFormModalOpen && (
        <>
          <CustomModal isOpen={isListFormModalOpen}>
            <ListFormModal />
          </CustomModal>
        </>
      )}
      {isDeleteListModalOpen && (
        <CustomModal isOpen={isDeleteListModalOpen}>
          <DeleteModal
            title={"DELETE LIST"}
            hideFunction={hideListDeleteModal}
            deleteFunction={deleteList}
          >
            <h1 className="text-3xl font-bold text-center">
              ARE YOU SURE YOU WANT TO DELETE THIS LIST?
            </h1>
            <p>{listToDelete.name || ""}</p>
          </DeleteModal>
        </CustomModal>
      )}
    </Fragment>
  );
};

export default ProfilePage;
