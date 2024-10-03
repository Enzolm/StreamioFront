import { useState } from "react";
import logo from "../../assets/logo.png";
import { LucideUser } from "lucide-react";
import { Button, Input, Register } from "@components/index";
import { Link } from "react-router-dom";
export default function Connect() {
  return (
    <>
      <form className="rounded-[37px] bg-main shadow-connect flex flex-col items-center p-6 w-full max-w-lg mx-auto">
        <Link to="/">
          <img
            src={logo}
            className="animate-breathing w-32 h-auto max-w-xs mb-6 md:w-40 md:max-w-sm lg:w-48 lg:max-w-md xl:w-56 xl:max-w-lg"
            alt="Logo"
          />
        </Link>
        <Input label="Entrez votre e-mail" type="email" />
        <Input label="Entrez votre mot de passe" type="password" />
        <Button label="Se connecter" />
        <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
        <Register />
      </form>
    </>
  );
}
