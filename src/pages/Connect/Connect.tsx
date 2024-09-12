import { useState } from "react";
// import logo from "./assets/logo.png";
import { LucideUser } from "lucide-react";
export default function Connect() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // const handleEmailFocus = () => {
  //   if (emailValue === "") {
  //     setEmailValue("focused");
  //   }
  // };

  // const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   if (e.target.value === "") {
  //     setEmailValue("");
  //   }
  // };

  // const handlePasswordFocus = () => {
  //   if (passwordValue === "") {
  //     setPasswordValue("focused");
  //   }
  // };

  // const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   if (e.target.value === "") {
  //     setPasswordValue("");
  //   }
  // };

  return (
    <>
      <form className="rounded-[37px] bg-main shadow-connect flex flex-col items-center p-6 w-full max-w-lg mx-auto">
        <img
          src={logo}
          className="animate-breathing w-32 h-auto max-w-xs mb-6 md:w-40 md:max-w-sm lg:w-48 lg:max-w-md xl:w-56 xl:max-w-lg"
          alt="Logo"
        />

        {/* Email Input */}
        <div className="relative w-full max-w-xl">
          <input
            type="email"
            className="bg-main hover:scale-98 px-5 py-3 text-base rounded-lg border transition-all border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-focus outline-none w-full"
            // onFocus={handleEmailFocus}
            // onBlur={handleEmailBlur}
          />
          <label
            className={`absolute left-5 text-gray-400 transition-all duration-300 pointer-events-none ${
              emailValue ? "top-0 text-xs px-1 bg-main" : "top-3 text-base"
            }`}
          >
            Entrez votre e-mail
          </label>
        </div>
        {/* Password Input with link inside the bottom border */}
        <div className="relative w-full max-w-xl mt-5">
          <input
            type="password"
            className="bg-main hover:scale-98 px-5 py-3 text-base rounded-lg border transition-all border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-focus outline-none w-full"
            // onFocus={handlePasswordFocus}
            // onBlur={handlePasswordBlur}
          />
          <label
            className={`absolute left-5 text-gray-400 transition-all duration-300 pointer-events-none ${
              passwordValue ? "top-0 text-xs px-1 bg-main" : "top-3 text-base"
            }`}
          >
            Mot de passe
          </label>
          {!passwordValue && (
            <a
              href="#"
              className="absolute top-9 right-2 text-gray-300 text-xs md:text-sm bg-main px-1 md:px-2 py-0.5 md:py-1 transform hover:scale-98 transition-transform"
            >
              Mot de passe oublié ?
            </a>
          )}
        </div>
      </form>
    </>
  );
}
