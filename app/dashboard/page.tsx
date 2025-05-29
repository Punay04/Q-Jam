"use client";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/herosection";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import React, { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  useEffect(() => {
    axios
      .post("/api/user")
      .catch((err) => console.error("User init failed", err));
  }, []);

  return (
    <ClerkProvider>
      <div className="h-full bg-gray-950 ">
        <Navbar />
        <HeroSection />
      </div>
    </ClerkProvider>
  );
};

export default Dashboard;
