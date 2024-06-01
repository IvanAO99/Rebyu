import React, { Fragment, useEffect } from "react";

import Profile from "../components/Profile.jsx";
import Lists from "../components/Lists.jsx";
import ListForm from "../components/ListForm.jsx";
import useLists from "../hooks/useLists.js";
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

  const { refreshListsFromUser } = useLists();

  useEffect(() => {
    refreshListsFromUser();
  }, []);
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
              total_games: listToDelete.games_on_list.length,
            }}
          />
        </DeleteModal>
      </CustomModal>
    </Fragment>
  );
};

export default ProfilePage;
