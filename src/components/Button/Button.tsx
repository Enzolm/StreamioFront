import React from "react";
import { buttonProps } from "./Button.types";

const Button: React.FC<buttonProps> = ({ className, label, ...props }) => {
  return (
    <>
      <button
        {...props}
        className={`group flex place-items-center relative justify-center overflow-hidden bg-main px-5 py-3 text-base z-10 rounded-lg border transition-all w-full h-10 outline-none  duration-[400ms] after:absolute after:left-0 after:top-0 after:z-0 after:bg-gray-300 after:w-0 hover:after:w-full after:h-full  after:duration-[400ms] after:transition-all hover:text-main ${className}`}
      >
        <label className="text-gray-300 transition-all duration-[400ms] group-hover:!text-main z-10">
          {label}
        </label>
      </button>
    </>
  );
};

export default Button;
