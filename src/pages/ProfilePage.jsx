import React, { Fragment } from "react";

import Profile from "../components/Profile.jsx";

const ProfilePage = () => {
  return (
    <Fragment>
      <main className="container mx-auto">
        <Profile />
        <div></div>
      </main>
    </Fragment>
  );
};

export default ProfilePage;
