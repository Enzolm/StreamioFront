import { useState } from "react";
import logo from "@/assets/logo.png";
import { ToggleButton } from "@components/index";
import { Link } from "react-router-dom";
import SignUp from "@pages/SignUp/SignUp";
import Connect from "@pages/Connect/Connect";
import { Toaster } from "@/components/ui/toaster";

export default function ConnectMain() {
  const [SelectedMethode, setSelectedMethode] = useState(true);

  const handleToggle = (value: boolean) => {
    console.log("Inscription activée ?", value);
    setSelectedMethode(value);
  };

  const containerClasses: string = !SelectedMethode ? "rounded-[37px] bg-main shadow-connect flex flex-col transition-all duration-700 items-center p-6 overflow-hidden h-[400px] w-[300px]" : "rounded-[37px] bg-main shadow-connect flex flex-col transition-all duration-700 items-center p-6 overflow-hidden h-[665px] w-[527px]";

  return (
    <>
      <Toaster />
      <div className={containerClasses}>
        <Link to="/">
          <img src={logo} className="animate-breathing w-32 h-auto max-w-xs mb-6 md:w-40 md:max-w-sm lg:w-48 lg:max-w-md xl:w-56 xl:max-w-lg" alt="Logo" />
        </Link>
        <ToggleButton initialState={SelectedMethode} onToggle={handleToggle} />
        <div className="h-full mt-6">{SelectedMethode ? <SignUp /> : <Connect />}</div>
      </div>
    </>
  );
}
