import { useState } from "react";
import logo from "../../assets/logo.png";
import { motion as m } from "framer-motion";
import { Button, Input, Register } from "@components/index";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CallLoginApi from "./ConnectAPI";

export default function Connect() {
  const [isRegister, setIsRegister] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    if (true) {
      try {
        CallLoginApi(data);
      } catch (error) {
        const err = error as Error;
        setError("root", { message: "erreur", type: "custom" });
      }
    }
  };

  return (
    <>
      <form
        className={`rounded-[37px] bg-main shadow-connect flex flex-col transition-all duration-700 items-center p-6 overflow-hidden h-[365px] w-[287px]`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link to="/">
          <img
            src={logo}
            className="animate-breathing w-32 h-auto max-w-xs mb-6 md:w-40 md:max-w-sm lg:w-48 lg:max-w-md xl:w-56 xl:max-w-lg"
            alt="Logo"
          />
        </Link>
        <m.div className="flex flex-col ">
          <Input label="Entrez votre e-mail" type="email" />
          <Input label="Entrez votre mot de passe" type="password" />
          <Button label="Se connecter" />
          <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
        </m.div>

        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </>
  );
}
