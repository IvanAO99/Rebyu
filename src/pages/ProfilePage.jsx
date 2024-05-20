import React, { Fragment } from "react";

import Profile from "../components/Profile.jsx";
import Lists from "../components/Lists.jsx";
import ListForm from "../components/ListForm.jsx";

const ProfilePage = () => {
  return (
    <Fragment>
      <div>
        <Profile />
        <h3>CREAR LISTA</h3>
        <ListForm creationMode={true} />
        <h3>MODIFICAR LISTA</h3>
        <ListForm />
        <Lists />
      </div>
    </Fragment>
  );
};

export default ProfilePage;
