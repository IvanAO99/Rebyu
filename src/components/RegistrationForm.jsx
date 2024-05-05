import React from "react";

function RegistrationForm() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-6">REGISTER</h1>
      <h2 className="text-lg text-center mb-8">
        And contribute to the community
      </h2>
      <form
        className="flex flex-col md:flex-row justify-center px-10 md:px-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:w-1/3 md:pr-8 mb-4 md:mb-0 md:border-r">
          <div className="mb-6">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
        </div>
        <div className="md:w-1/3 md:pl-8">
          <div className="mb-6">
            <label htmlFor="nickname" className="block mb-1">
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="birthdate" className="block mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="birthdate"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="profilePic" className="block mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <button className="w-full bg-purple-500 text-white py-2 px-4 hover:bg-purple-700 mt-6">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
