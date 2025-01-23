import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import verifyToken from "../providers/VerifToken";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [res, setRes] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await verifyToken();
      setRes(result);
    };

    fetchData();
  }, []);

  if (!res) {
    console.log("User is not logged in");
    return <Navigate to="/hh" />;
  } else {
    return <>{children}</>;
  }
};

export default AuthGuard;
