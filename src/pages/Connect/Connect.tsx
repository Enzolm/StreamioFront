import { useState } from "react";
import logo from "../../assets/logo.png";
import { AnimatePresence, motion as m } from "framer-motion";
import { LucideUser } from "lucide-react";
import { Button, Input, Register } from "@components/index";
import { Link } from "react-router-dom";
export default function Connect() {
  console.log("caca");

  const [isRegister, setIsRegister] = useState(false);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [motdepasseConfirm, setMotdepasseConfirm] = useState("");

  if (motdepasse !== motdepasseConfirm) {
    alert("Passwords do not match");
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      prenom,
      nom,
      ville,
      codePostal,
      email,
      motdepasse,
    };

    console.log(user);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert("User added successfully");
        setPrenom("");
        setNom("");
        setVille("");
        setEmail("");
        setMotdepasse("");
      });
  };

  return (
    <>
      <form
        className={`rounded-[37px] bg-main shadow-connect flex flex-col transition-all duration-700 items-center p-6 overflow-hidden ${
          isRegister ? "h-[365px] w-[287px]" : "h-[565px] w-[565px]"
        }`}
        onSubmit={handleRegister}
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
          <m.div className="transition-all duration-700">
            <div className="w-full grid-cols-2 grid gap-x-4">
              <Input
                label="Entrez votre prenom"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <Input
                label="Entrez votre nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <Input
                label="Entrez votre ville"
                type="text"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
              />
              <Input
                label="Entrez votre code postal"
                type="text"
                value={codePostal}
                onChange={(e) => setCodePostal(e.target.value)}
              />
              <Input
                label="Entrez votre e-mail"
                type="email"
                className="col-span-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Entrez votre mot de passe"
                type="password"
                className="col-span-2"
                value={motdepasse}
                onChange={(e) => setMotdepasse(e.target.value)}
              />
              <Input
                label="Confirmez votre mot de passe"
                type="password"
                className="col-span-2"
                value={motdepasseConfirm}
                onChange={(e) => setMotdepasseConfirm(e.target.value)}
              />
              <Button
                label="Se connecter"
                type="submit"
                className="col-span-2"
              />
            </div>
            <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
          </m.div>
        )}
        <Register
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          className=""
        />
      </form>
    </>
  );
}
