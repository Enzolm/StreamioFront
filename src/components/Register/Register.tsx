import React, { useEffect, useState } from "react";
import { registerProps } from "./Register.types";
import { motion } from "motion/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isGeneratorFunction } from "util/types";
import "./register.css";

const Register: React.FC<registerProps> = ({
  className,
  isRegister,
  setIsRegister,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const RedirectSignUp = () => {
    navigate("/signup");
  };
  const RedirectLogin = () => {
    navigate("/login");
  };
  const [isSignup, setisSignup] = useState(location.pathname === "/login");
  console.log("issignup", isSignup);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
    className: "left-0 rounded-l-lg",
  };

  return (
    <>
      <div className="loginsignup">
        {/* <span
          className={`absolute top-0 z-0  w-1/2 h-full transition-all bg-gray-300 pointer-events-none ${
            isRegister ? "left-0 rounded-l-lg" : "left-1/2 rounded-r-lg"
          }`} 
        />*/}
        <motion.span
          className={`absolute top-0 z-0  w-1/2 h-full bg-gray-300 pointer-events-none rounded-lg`}
          layout
          transition={spring}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            RedirectLogin();
          }}
          className={`bg-transparent border z-10 border-gray-300 rounded-l-lg w-1/2 relative ${
            isSignup ? "text-main" : "text-gray-300"
          }`}
        >
          Sign in
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            RedirectSignUp();
          }}
          className={`bg-transparent border border-gray-300 rounded-r-lg w-1/2 z-10 ${
            isSignup ? "text-gray-300" : "text-main"
          }`}
        >
          Sign up
        </button>
      </div>
    </>
  );
};

export default Register;
