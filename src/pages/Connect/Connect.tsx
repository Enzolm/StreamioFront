import { useState } from "react";
import logo from "../../assets/logo.png";
import { LucideUser } from "lucide-react";
import { Input } from "@components/index";
export default function Connect() {
  return (
    <>
      <form className="rounded-[37px] bg-main shadow-connect flex flex-col items-center p-6 w-full max-w-lg mx-auto">
        <img
          src={logo}
          className="animate-breathing w-32 h-auto max-w-xs mb-6 md:w-40 md:max-w-sm lg:w-48 lg:max-w-md xl:w-56 xl:max-w-lg"
          alt="Logo"
        />
        <Input label="Entrez votre e-mail" type="email" />

        <Input label="Entrez votre mot de passe" type="password" />
      </form>
    </>
  );
}
