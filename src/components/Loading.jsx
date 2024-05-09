import React from "react";

const Loading = () => {
  return (
    <>
      <div>
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-800 border-e-transparent align-[-0.125em] text-purple-800 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        {/*         <div
          class="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-surface opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div> */}
      </div>
    </>
  );
};

export default Loading;
