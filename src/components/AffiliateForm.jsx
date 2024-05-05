import React from "react";

function AffiliateForm() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-6">
        BECOME AN AFFILIATE
      </h1>
      <h2 className="text-lg text-center mb-8">
        And help us continue growing together
      </h2>
      <div className="flex flex-col md:flex-row justify-evenly px-10 md:px-0">
        <form
          className="md:w-1/3 md:pr-8 mb-4 md:mb-0 md:border-r"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-6">
            <label htmlFor="account" className="block mb-1">
              Account
            </label>
            <input
              type="text"
              id="account"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="expiration" className="block mb-1">
              Expiration
            </label>
            <input
              type="text"
              id="expiration"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cvc" className="block mb-1">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="billingAddress" className="block mb-1">
              Billing Address
            </label>
            <input
              type="text"
              id="billingAddress"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the terms and conditions
            </label>
          </div>
          <div className="mb-6">
            <button className="w-full bg-purple-500 text-white py-2 px-4 hover:bg-purple-700">
              Accept
            </button>
          </div>
        </form>
        {/* Right Column */}
        <div className="md:w-fit self-center text-center">
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-2">Discover Our Advantages</h3>
            <ul className="list-disc list-inside mb-2 text-2xl">
              <li className="my-6">Create more lists</li>
              <li className="my-6">Ad-free experience</li>
              <li className="my-6">Support creators</li>
            </ul>
            <p className="text-lg font-bold">
              <span className="font-bold text-8xl text-purple-700">7</span>
              €/month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AffiliateForm;
