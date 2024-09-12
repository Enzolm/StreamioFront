import React from "react";
import { inputProps } from "./Input.types";

const Input: React.FC<inputProps> = ({ ...props }) => {
  return (
    <label
      className={`absolute left-5 text-gray-400 transition-all duration-300 pointer-events-none  has-[:focus-visible]:text-xs has-[:focus-visible]:bg-main has-[:focus-visible]:px-1 has-[:focus-visible]:top-3`}
    >
      <p>{props.label}</p>
      <input
        className="bg-main hover:scale-98 px-5 py-3 text-base rounded-lg border transition-all border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-focus outline-none w-full"
        type="text"
      />
    </label>
  );
};

export default Input;
