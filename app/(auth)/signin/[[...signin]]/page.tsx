import { SignIn } from "@clerk/nextjs";
import React from "react";

const Signin = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <SignIn />
    </div>
  );
};

export default Signin;
