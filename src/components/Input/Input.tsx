import React, { useState } from "react";
import { inputProps } from "./Input.types";

const Input: React.FC<inputProps> = ({ className, value, label, ...props }) => {
  const [hasValue, setHasValue] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== "");
  };

  return (
    <label
      className={`group relative text-gray-400 transition-all duration-300 mb-4 ${className}`}
    >
      <p
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 z-20 left-3 pointer-events-none px-1 group-has-[:focus-within]:scale-75 group-has-[:focus-within]:bg-main group-has-[:focus-within]:-top-16 group-has-[:focus-within]:-left-1 group-has-[:focus-within]:px-1 ${
          hasValue ? "scale-75 bg-main -top-16 -left-1.5" : ""
        }`}
      >
        {label}
      </p>
      <input
        {...props}
        onChange={handleInputChange}
        className={`bg-main hover:scale-98 px-5 py-3 text-base z-10 rounded-lg border transition-all border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-focus w-full outline-none`}
      />
    </label>
  );
};

export default Input;
