import React, { useState } from "react";
import { inputProps } from "./Input.types";

const Input = React.forwardRef<HTMLInputElement, inputProps>(
  ({ className, value, label, ...props }, ref) => {
    const [hasValue, setHasValue] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 0) {
        setHasValue(true);
      } else {
        setHasValue(false);
      }
      props.onChange && props.onChange(e);
    };
    return (
      <label
        className={`group relative text-gray-400 transition-all duration-300 mb-4 ${className}`}
      >
        <p
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 z-20 left-3 pointer-events-none px-1 group-has-[:focus-within]:scale-75 group-has-[:focus-within]:bg-main group-has-[:focus-within]:-top-16 group-has-[:focus-within]:-left-1 group-has-[:focus-within]:px-1 ${
            hasValue ? "scale-75 bg-main top-16 -left-1" : ""
          }`}
        >
          {label}
        </p>
        <input
          {...props}
          ref={ref}
          onChange={handleChange}
          className={`bg-main hover:scale-98 px-5 py-3 text-base z-10 rounded-lg border transition-all border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-focus w-full outline-none`}
        />
      </label>
    );
  }
);
export default Input;
