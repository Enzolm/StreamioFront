import React from "react";
import { registerProps } from "./Register.types";
import { motion as m } from "framer-motion";
import { isGeneratorFunction } from "util/types";
const Register: React.FC<registerProps> = ({
  className,
  isRegister,
  setIsRegister,
}) => {
  return (
    <>
      <div className={`flex justify-center w-full relative bg ${className}`}>
        <span
          className={`absolute top-0 z-0  w-1/2 h-full transition-all bg-gray-300 pointer-events-none ${
            isRegister ? "left-0 rounded-l-lg" : "left-1/2 rounded-r-lg"
          }`}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsRegister(!isRegister);
          }}
          className={`bg-transparent border z-10 border-gray-300 rounded-l-lg w-1/2 relative ${
            isRegister ? "text-main" : ""
          }`}
        >
          Sign in
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsRegister(!isRegister);
          }}
          className={`bg-transparent border border-gray-300 rounded-r-lg w-1/2 z-10 ${
            isRegister ? "" : "text-main"
          }`}
        >
          Sign up
        </button>
      </div>
    </>
  );
};

export default Register;
