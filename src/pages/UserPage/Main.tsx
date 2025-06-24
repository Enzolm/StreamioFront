import React from "react";
import UserFavoris from "./AccountManagement.tsx";
import Navbar from "@components/Navbar.tsx";

export default function UserPageMain() {
  return (
    <div className="min-h-screen bg-[#197277] text-white mt-5 w-[70vw]">
      <Navbar Titre="Mon Compte" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <UserFavoris />
        </div>
      </div>
    </div>
  );
}
