import React from "react";
import { inputProps } from "./Input.types";

const Input: React.FC<inputProps> = ({ label, ...props }) => {
  return (
    <label
      className={
        "group relative text-gray-400 transition-all duration-300 mb-4"
      }
    >
      <p className="absolute top-1/2 -translate-y-1/2 group-has-[:focus-within]:scale-75 z-20 group-has-[:focus-within]:bg-main  group-has-[:focus-within]:-top-16 group-has-[:focus-within]:-left-1 group-has-[:focus-within]:px-1 left-3 pointer-events-none transition-all duration-300">
        {label}
      </p>
      <input
        {...props}
        className="bg-main hover:scale-98 px-5 py-3 text-base z-10 rounded-lg border transition-all border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-focus w-full outline-none"
      />
    </label>
  );
};

export default Input;
