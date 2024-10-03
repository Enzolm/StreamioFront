import React from "react";
import { buttonProps } from "./Button.types";

const Button: React.FC<buttonProps> = ({ label, ...props }) => {
  return (
    <>
      <button
        {...props}
        className="group flex place-items-center justify-center bg-main px-5 py-3 text-base z-10 rounded-lg border transition-all w-full h-10 outline-none hover:shadow-[inset_15rem_0_0_0] hover:shadow-gray-300 duration-[400ms]"
      >
        <label className="text-gray-300 transition-all duration-[400ms] group-hover:text-main">
          {label}
        </label>
      </button>
    </>
  );
};

export default Button;
