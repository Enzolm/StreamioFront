// import { useState } from "react";
// import logo from "../../assets/logo.png";
// import { motion as m } from "framer-motion";
// import { Button, Input, Register } from "@components/index";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import CallSignUpAPI from "@pages/SignUp/SignUpAPI";
// import CallLoginAPI from "@pages/Connect/ConnectAPI";

// export default function Connect() {
//   const [isRegister, setIsRegister] = useState(false);
//   // const navigate = useNavigate(); // Hook pour la navigation

//   // const redirigerVersNouvelleURL = () => {
//   //   navigate("/"); // Redirection vers la nouvelle page
//   // };

//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data: any) => {
//     if (isRegister === false) {
//       if (data.motdepasse !== data.motdepasseConfirm) {
//         setError("motdepasseConfirm", {
//           message: "Les mots de passe ne correspondent pas",
//         });
//         return;
//       }

//       try {
//         console.log("data", data), data.motdepasse;
//         CallSignUpAPI(data);
//         setIsRegister(true);
//       } catch (error) {
//         const err = error as Error;
//         setError("root", {
//           message: "",
//         });
//       }
//     } else {
//       try {
//         console.log("data", data);
//         console.log("data.email", data.email);
//         console.log("data.motdepasse", data.motdepasse);
//         const result = await CallLoginAPI(data.email, data.motdepasse);
//         console.log("Login successful:", result);

//         localStorage.setItem("token", result.token);
//       } catch (error) {
//         setError("root", {
//           message: "Erreur lors de la connexion",
//         });
//       }
//     }
//   };

//   return (
//     <>
//       <form
//         className={`rounded-[37px] bg-main shadow-connect flex flex-col transition-all duration-700 items-center p-6 overflow-hidden ${
//           isRegister ? "h-[365px] w-[287px]" : "h-[565px] w-[565px]"
//         }`}
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <Link to="/">
//           <img
//             src={logo}
//             className="animate-breathing w-32 h-auto max-w-xs mb-6 md:w-40 md:max-w-sm lg:w-48 lg:max-w-md xl:w-56 xl:max-w-lg"
//             alt="Logo"
//           />
//         </Link>

//         {isRegister ? (
//           <m.div className="flex flex-col ">
//             <Input
//               label="Entrez votre e-mail"
//               {...register("email")}
//               type="email"
//             />
//             <Input
//               label="Entrez votre mot de passe"
//               {...register("motdepasse")}
//               type="password"
//             />
//             <Button label="Se connecter" />
//             <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
//           </m.div>
//         ) : (
//           <m.div className="transition-all duration-700">
//             <div className="w-full grid-cols-2 grid gap-x-4">
//               <Input
//                 label="Entrez votre prenom"
//                 {...register("prenom")}
//                 type="text"
//               />
//               <Input
//                 label="Entrez votre nom"
//                 {...register("nom")}
//                 type="text"
//               />
//               <Input
//                 label="Entrez votre ville"
//                 {...register("ville")}
//                 type="text"
//               />
//               <Input
//                 label="Entrez votre code postal"
//                 {...register("codepostal")}
//                 type="text"
//               />
//               <Input
//                 label="Entrez votre e-mail"
//                 {...register("email")}
//                 type="email"
//                 className="col-span-2"
//               />
//               <Input
//                 label="Entrez votre mot de passe"
//                 {...register("motdepasse")}
//                 type="password"
//                 className="col-span-2"
//               />
//               <Input
//                 label="Confirmez votre mot de passe"
//                 {...register("motdepasseConfirm")}
//                 type="password"
//                 className="col-span-2"
//               />
//               {errors.motdepasseConfirm && (
//                 <p className="text-red-500">
//                   {"Mot les mot de passe ne corresponde pas"}
//                 </p>
//               )}
//               <Button
//                 label="Se connecter"
//                 type="submit"
//                 className="col-span-2"
//               />
//             </div>
//             <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
//           </m.div>
//         )}

//         <Register
//           isRegister={isRegister}
//           setIsRegister={setIsRegister}
//           className=""
//         />
//         {errors.root && <p className="text-red-500">{errors.root.message}</p>}
//       </form>
//     </>
//   );
// }

//Version à jour

import { useState } from "react";
import logo from "../../assets/logo.png";
import { motion as m } from "framer-motion";
import { Button, Input, ToggleButton } from "@components/index";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    if (true) {
      try {
        CallLoginApi(data);
        navigate("/service");
      } catch (error) {
        const err = error as Error;
        setError("root", { message: "erreur", type: "custom" });
      }
    }
  };
  return (
    <>
      <form className={`flex flex-col transition-all duration-700 items-center overflow-hidden`} onSubmit={handleSubmit(onSubmit)}>
        <m.div className="flex flex-col ">
          <Input {...register("email")} label="Entrez votre e-mail" type="email" />
          <Input {...register("motdepasse")} label="Entrez votre mot de passe" type="password" />
          <Button label="Se connecter" />
          <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
        </m.div>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </>
  );
}
