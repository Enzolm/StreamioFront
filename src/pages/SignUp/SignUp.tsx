// import { useState } from "react";
import { motion as m } from "framer-motion";
import { Button, Input } from "@components/index";
import { useForm } from "react-hook-form";
import CallSignUpAPI from "../SignUp/SignUpAPI";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
// import { Description } from "@radix-ui/react-toast";

export default function SignUp() {
  // const [isRegister, setIsRegister] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    watch, // Utilisation de watch de react-hook-form
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("data", data);
    if (data.motdepasse !== data.motdepasseConfirm) {
      setError("motdepasseConfirm", {
        message: "Les mots de passe ne correspondent pas",
      });
      toast({
        description: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    try {
      console.log("data", data);
      CallSignUpAPI(data);
    } catch (error) {
      setError("root", {
        message: "Une erreur est survenue lors de l'inscription",
      });
      toast({
        description: "Les mots de passe ne correspondent pas",
      });
    }
  };

  return (
    <>
      <Toaster />
      <form className="flex flex-col transition-all duration-700 items-center" onSubmit={handleSubmit(onSubmit)}>
        <m.div className="transition-all duration-700">
          <div className="w-full grid-cols-2 grid gap-x-4">
            <Input label="Entrez votre prenom" {...register("prenom", { required: "Requis" })} type="text" />
            <Input label="Entrez votre nom" {...register("nom", { required: "Requis" })} type="text" />
            <Input label="Entrez votre ville" {...register("ville", { required: "Requis" })} type="text" />
            <Input label="Entrez votre code postal" {...register("codepostal", { required: "Requis" })} type="text" />
            <Input label="Entrez votre e-mail" {...register("email", { required: "Requis" })} type="email" className="col-span-2" />
            <Input label="Entrez votre mot de passe" {...register("motdepasse", { required: "Requis" })} type="password" className="col-span-2" />
            <Input
              label="Confirmez votre mot de passe"
              {...register("motdepasseConfirm", {
                required: "Requis",
                validate: (value) => {
                  const isValid = value === watch("motdepasse");
                  if (!isValid) {
                    toast({
                      description: "Les mots de passe ne correspondent pas",
                    });
                  }
                  return isValid || "Les mots de passe ne correspondent pas";
                },
              })}
              type="password"
              className="col-span-2"
            />

            {errors.motdepasseConfirm?.message && <p className="text-red-500">{String(errors.motdepasseConfirm.message)}</p>}
            <Button
              label="Se connecter"
              type="submit"
              className="col-span-2"
              // onClick={() =>
              //   toast({
              //     description: "Les mots de passe ne correspondent pas",
              //   })
              // }
            />
          </div>
          <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
        </m.div>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </>
  );
}
