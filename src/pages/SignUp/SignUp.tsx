import { useState } from "react";
import logo from "../../assets/logo.png";
import { motion as m } from "framer-motion";
import { Button, Input, Register } from "@components/index";
import { Link, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import CallSignUpAPI from "./SignUpAPI";

export default function SignUp() {
  const [isRegister, setIsRegister] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    if (data.motdepasse !== data.motdepasseConfirm) {
      setError("motdepasseConfirm", {
        message: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    try {
      CallSignUpAPI(data);
    } catch (error) {
      const err = error as Error;
      setError("root", {
        message: "Une erreur est survenue lors de l'inscription",
      });
    }
  };

  return (
    <>
      <form
        className={`rounded-[37px] bg-main shadow-connect flex flex-col transition-all duration-700 items-center p-6 overflow-hidden w-[287px] w-[565px]`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link to="/">
          <img
            src={logo}
            className="animate-breathing w-32 h-auto max-w-xs mb-6 md:w-40 md:max-w-sm lg:w-48 lg:max-w-md xl:w-56 xl:max-w-lg"
            alt="Logo"
          />
        </Link>

        <m.div className="transition-all duration-700">
          <div className="w-full grid-cols-2 grid gap-x-4">
            <Input
              label="Entrez votre prenom"
              {...register("prenom")}
              type="text"
            />
            <Input label="Entrez votre nom" {...register("nom")} type="text" />
            <Input
              label="Entrez votre ville"
              {...register("ville")}
              type="text"
            />
            <Input
              label="Entrez votre code postal"
              {...register("codepostal")}
              type="text"
            />
            <Input
              label="Entrez votre e-mail"
              {...register("email")}
              type="email"
              className="col-span-2"
            />
            <Input
              label="Entrez votre mot de passe"
              {...register("motdepasse")}
              type="password"
              className="col-span-2"
            />
            <Input
              label="Confirmez votre mot de passe"
              name="motdepasseConfirm"
              type="password"
              className="col-span-2"
            />
            <a
              className=" text-slate-400"
              href="/login
            "
            >
              Créer un compte
            </a>
            <Button label="Se connecter" type="submit" className="col-span-2" />
          </div>

          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        </m.div>
      </form>
    </>
  );
}
