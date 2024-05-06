import React, { Fragment } from "react";

const Profile = () => {
  const user = {
    photo:
      "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/users/annamartinez.jpg",
    nickname: "annamartinez",
    name: "Anna",
    email: "annamartinez@gmail.com",
    password: "annamartinez",
    birth_date: "99/99/9999",
  };

  return (
    <Fragment>
      <div>
        <div className="flex flex-col md:flex-row justify-start items-stretch gap-5">
          <img
            src={user.photo}
            alt="User Profile Photo"
            className="border-2 border-purple-800 rounded-full w-96 h-96 object-cover"
          />
          <table className="flex-grow mx-5 my-2">
            <tbody>
              <tr className="border-b-2">
                <td className="font-bold text-purple-800">NICKNAME</td>
                <td className="pl-4">{user.nickname}</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-bold text-purple-800">NAME</td>
                <td className="pl-4">{user.name}</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-bold text-purple-800">EMAIL</td>
                <td className="pl-4">{user.email}</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-bold text-purple-800">PASSWORD</td>
                <td className="pl-4">{user.password}</td>
              </tr>
              <tr>
                <td className="font-bold text-purple-800">BIRTH DATE</td>
                <td className="pl-4">{user.birth_date}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between items-start mt-5">
          <table>
            <tbody>
              <tr>
                <td className="font-bold text-purple-800">USER SINCE</td>
                <td className="pl-4">99/99/9999</td>
              </tr>
              <tr>
                <td>
                  <button
                    type="button"
                    className="border-none rounded-3xl bg-purple-800 text-white px-5 py-2"
                  >
                    Become affiliate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="border-none rounded-3xl bg-red-600 text-white px-5 py-2"
          >
            Delete account
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
