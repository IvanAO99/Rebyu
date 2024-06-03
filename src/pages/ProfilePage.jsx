import React, { Fragment } from "react";

import useLists from "../hooks/useLists.js";

import Profile from "../components/Profile.jsx";
import Lists from "../components/Lists.jsx";
import CustomModal from "../components/CustomModal.jsx";
import ListFormModal from "../components/ListFormModal.jsx";
import DeleteModal from "../components/DeleteModal.jsx";
import InformativeTable from "../components/InformativeTable.jsx";

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
      <div className="flex flex-col gap-5">
        <Profile />
        <Lists />
      </div>
      <CustomModal isOpen={isListFormModalOpen}>
        <ListFormModal />
      </CustomModal>
      <CustomModal isOpen={isDeleteListModalOpen}>
        <DeleteModal
          title={"DELETE LIST"}
          hideFunction={hideListDeleteModal}
          deleteFunction={deleteList}
        >
          <h1 className="text-xl font-bold text-center">
            ARE YOU SURE YOU WANT TO{" "}
            <span className="text-red-600">DELETE</span> THIS LIST?
          </h1>
          <InformativeTable
            object={{
              name: listToDelete.name,
              type: listToDelete.type,
              total_games: listToDelete?.games_on_list?.length,
            }}
          />
        </DeleteModal>
      </CustomModal>
    </Fragment>
  );
};

export default ProfilePage;
