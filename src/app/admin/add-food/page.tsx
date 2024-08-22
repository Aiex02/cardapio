"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AddFoodForm from "@/components/AddFoodForm";

export default function AddFood() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="container mx-auto">
            <AddFoodForm />
          </div>
        </div>
      </div>
    </div>
  );
}
