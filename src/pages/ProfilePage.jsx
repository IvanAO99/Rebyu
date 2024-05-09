import React, { Fragment } from "react";

import Profile from "../components/Profile.jsx";
import Lists from "../components/Lists.jsx";

const ProfilePage = () => {
  return (
    <Fragment>
      <div>
        <Profile />
        <div className="my-2 border-y"></div>
        <Lists />
      </div>
    </Fragment>
  );
};

export default ProfilePage;
