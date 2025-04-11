import { useState } from "react";
import logo from "../../assets/logo.png";
import { motion as m } from "framer-motion";
import { Button, Input } from "@components/index";
import { Link, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import CallSignUpAPI from "../SignUp/SignUpAPI";

export default function SignUp() {
  const [isRegister, setIsRegister] = useState(false);

  console.log("isRegister", isRegister);
  console.log("setIsRegister", setIsRegister);
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
      console.log("data", data), data.motdepasse;
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
      <form className={`flex flex-col transition-all duration-700 items-center`} onSubmit={handleSubmit(onSubmit)}>
        <m.div className="transition-all duration-700">
          <div className="w-full grid-cols-2 grid gap-x-4">
            <Input label="Entrez votre prenom" {...register("prenom")} type="text" />
            <Input label="Entrez votre nom" {...register("nom")} type="text" />
            <Input label="Entrez votre ville" {...register("ville")} type="text" />
            <Input label="Entrez votre code postal" {...register("codepostal")} type="text" />
            <Input label="Entrez votre e-mail" {...register("email")} type="email" className="col-span-2" />
            <Input label="Entrez votre mot de passe" {...register("motdepasse")} type="password" className="col-span-2" />
            <Input label="Confirmez votre mot de passe" {...register("motdepasseConfirm")} type="password" className="col-span-2" />
            <Button label="Se connecter" type="submit" className="col-span-2" />
          </div>
          <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
        </m.div>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </>
  );
}
