import React, { Fragment } from "react";

import Profile from "../components/Profile.jsx";
import Lists from "../components/Lists.jsx";

const ProfilePage = () => {
  return (
    <Fragment>
      <main className="container mx-auto px-5 py-2">
        <Profile />
        <div className="my-2 border-y"></div>
        <Lists />
      </main>
    </Fragment>
  );
};

export default ProfilePage;
