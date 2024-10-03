import { useState } from "react";
import logo from "../../assets/logo.png";
import { AnimatePresence, motion as m } from "framer-motion";
import { LucideUser } from "lucide-react";
import { Button, Input, Register } from "@components/index";
import { Link } from "react-router-dom";
export default function Connect() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <>
      <form
        className={`rounded-[37px] bg-main shadow-connect flex flex-col w-full transition-all duration-700 items-center p-6 overflow-hidden ${
          isRegister ? "h-[365px] w-[287px]" : "h-[565px] w-[565px]"
        }`}
      >
        <Link to="/">
          <img
            src={logo}
            className="animate-breathing w-32 h-auto max-w-xs mb-6 md:w-40 md:max-w-sm lg:w-48 lg:max-w-md xl:w-56 xl:max-w-lg"
            alt="Logo"
          />
        </Link>

        {isRegister ? (
          <m.div className="flex flex-col ">
            <Input label="Entrez votre e-mail" type="email" />
            <Input label="Entrez votre mot de passe" type="password" />
            <Button label="Se connecter" />
            <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
          </m.div>
        ) : (
          <m.div className="">
            <div className="w-full grid-cols-2 grid gap-x-4">
              <Input label="Entrez votre prenom" type="text" />
              <Input label="Entrez votre nom" type="text" />
              <Input label="Entrez votre ville" type="text" />
              <Input label="Entrez votre code postal" type="text" />
              <Input
                label="Entrez votre e-mail"
                type="email"
                className="col-span-2"
              />
              <Input
                label="Entrez votre mot de passe"
                type="password"
                className="col-span-2"
              />
              <Input
                label="Confirmez votre mot de passe"
                type="password"
                className="col-span-2"
              />
              <Button label="Se connecter" className="col-span-2" />
            </div>
            <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
          </m.div>
        )}

        <Register isRegister={isRegister} setIsRegister={setIsRegister} />
      </form>
    </>
  );
}
