import React from "react";

function AffiliateForm() {
  const errors = false;

  return (
    <>
      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-6xl font-bold text-center">
            BECOME AN AFFILIATE
          </h1>
          <h2 className="text-xl md:text-3xl text-center">
            And help us continue growing together
          </h2>
        </div>
        <div className="md:w-full flex flex-col justify-center md:flex-row">
          <div className="md:w-1/3 md:border-r md:pr-5">
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="account"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Account
                </label>
                <input
                  type="text"
                  id="account"
                  placeholder="Enter nickname..."
                  className={`w-full border-none focus:outline-none ${
                    errors
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="expiration"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Expiration
                </label>
                <input
                  type="text"
                  placeholder="Enter nickname..."
                  className={`w-full border-none focus:outline-none ${
                    errors
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="cvc"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  placeholder="Enter nickname..."
                  className={`w-full border-none focus:outline-none ${
                    errors
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="billingAddress"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Billing Address
                </label>
                <input
                  type="text"
                  id="billingAddress"
                  placeholder="Enter nickname..."
                  className={`w-full border-none focus:outline-none ${
                    errors
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms_services"
                  className={`border-none focus:outline-none ${
                    errors
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 accent-purple-600 hover:accent-purple-400 shadow`}
                  value={"accepted"}
                  checked={errors ? true : false}
                  readOnly
                />
                <label
                  htmlFor="terms"
                  className={`ml-1 text-sm ${errors && "text-red-600"}`}
                >
                  I accept the terms and conditions
                </label>
              </div>
              <div className="self-center">
                <button className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-4 py-2 text-gray-50 transition-all duration-300">
                  Accept
                </button>
              </div>
            </form>
          </div>
          <div className="md:w-1/3 self-center md:pl-5 text-center">
            <div className="flex flex-col gap-5">
              <h3 className="text-xl md:text-3xl font-bold text-purple-600">
                Discover Our Advantages
              </h3>
              <ul className="self-center list-disc list-inside flex flex-col gap-5 text-lg md:text-xl text-justify">
                <li>Create more lists</li>
                <li>Ad-free experience</li>
                <li>Support creators</li>
              </ul>
              <p className="text-lg md:text-xl font-bold">
                <span className="text-9xl font-bold text-purple-600">7</span>
                €/month
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AffiliateForm;
