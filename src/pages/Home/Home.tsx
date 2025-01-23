import React, { useState } from "react";
import verifyToken from "../../providers/VerifToken";

export default function Home() {
  const handleverify = async () => {
    const res = await verifyToken();
    console.log("res", res);
  };

  return (
    <>
      <div>
        <button onClick={handleverify}>Verify Token</button>
      </div>
    </>
  );
}
