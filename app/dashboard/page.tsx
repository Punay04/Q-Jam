"use client";
import Navbar from "@/components/navbar";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import React from "react";

const Dashboard = () => {
  return (
    <ClerkProvider>
      <div className="h-screen bg-black ">
        <Navbar />
      </div>
    </ClerkProvider>
  );
};

export default Dashboard;
