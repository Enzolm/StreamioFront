import logo from "@/assets/favicon.png";
import { accountService } from "@/providers/VerifToken";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ Titre }: { Titre: string }) {
  const [TokenTest, setTokenTest] = React.useState<boolean>(false);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  useEffect(() => {
    accountService.verifyToken().then((isValid) => {
      setTokenTest(isValid);
      console.log("Token is valid:", isValid);
    });
    accountService.isAdmin().then((TestisAdmin) => {
      setIsAdmin(TestisAdmin);
      console.log("User is admin:", TestisAdmin);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <nav className="bg-[#197277] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-12 h-12" />

          <a onClick={() => navigate("/")} className="text-white text-lg font-bold hover:text-gray-200 hover:cursor-pointer">
            {Titre}
          </a>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a onClick={() => navigate("/")} className="text-white hover:text-gray-200 hover:cursor-pointer">
              Accueil
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/service")} className="text-white hover:text-gray-200 hover:cursor-pointer">
              Services
            </a>
          </li>
          {TokenTest && (
            <li>
              <a onClick={() => navigate("/account")} className="text-white hover:text-gray-200 hover:cursor-pointer">
                Mon Compte
              </a>
            </li>
          )}
          {isAdmin && (
            <li>
              <a onClick={() => navigate("/admin")} className="text-white hover:text-gray-200 hover:cursor-pointer">
                Administration
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
