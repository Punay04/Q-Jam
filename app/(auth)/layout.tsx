import { ClerkProvider } from "@clerk/nextjs";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {children}
      </div>
    </ClerkProvider>
  );
};

export default Layout;
