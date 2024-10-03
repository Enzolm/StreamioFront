import React from "react";
import { registerProps } from "./Register.types";

const Register: React.FC<registerProps> = ({}) => {
  return (
    <>
      <div className="flex justify-center w-full">
        <button className="bg-main border border-gray-300 rounded-l-lg w-1/2">
          Sign in
        </button>
        <button className="bg-main border border-gray-300 rounded-r-lg w-1/2">
          Sign up
        </button>
      </div>
    </>
  );
};

export default Register;
