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
    is_affiliate: true, // Cambiar valor para ver el layout de un usuario no afiliado
    affiliate_date: "99/99/9999",
  };

  return (
    <Fragment>
      <div>
        <div className="flex flex-col md:flex-row justify-stretch items-stretch gap-5">
          <img
            src={user.photo}
            alt="User Profile Photo"
            className="self-center md:self-stretch border-2 border-purple-800 rounded-full w-96 h-96 object-cover"
          />
          <table className="flex-grow mx-5 my-2">
            <tbody>
              <tr className="border-b-2">
                <td className="font-bold text-purple-800">NICKNAME</td>
                <td className="p-5">{user.nickname}</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-bold text-purple-800">NAME</td>
                <td className="p-5">{user.name}</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-bold text-purple-800">EMAIL</td>
                <td className="p-5">{user.email}</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-bold text-purple-800">PASSWORD</td>
                <td className="p-5">{user.password}</td>
              </tr>
              <tr>
                <td className="font-bold text-purple-800">BIRTH DATE</td>
                <td className="p-5">{user.birth_date}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between items-start mt-5">
          <div>
            <table>
              <tbody>
                <tr>
                  <td className="p-5 font-bold text-purple-800">USER SINCE</td>
                  <td className="p-5">99/99/9999</td>
                </tr>
                {user.is_affiliate && (
                  <tr>
                    <td className="p-5 font-bold text-purple-800">
                      AFFILIATE SINCE
                    </td>
                    <td className="p-5">99/99/9999</td>
                  </tr>
                )}
              </tbody>
            </table>
            {!user.is_affiliate && (
              <button
                type="button"
                className="border-none rounded-3xl bg-purple-800 text-white px-5 py-2"
              >
                Become affiliate
              </button>
            )}
          </div>
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