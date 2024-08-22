import React, { useState } from "react";
import Link from "next/link";
import { FaUtensils, FaPlusSquare, FaBars, FaTimes } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <button
        className="text-black bg-transparent p-2 rounded-md md:hidden fixed border border-transparent"
        onClick={handleSidebarToggle}
      >
        <FaBars size={30} />
      </button>

      <div
        className={`bg-gray-800 text-white w-64 min-h-screen p-6 fixed top-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Administração</h2>
          <button onClick={handleSidebarToggle} className="md:hidden">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="space-y-4">
          <Link href="/admin">
            <button className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded w-full text-left">
              <FaUtensils />
              <span>Gerenciar Cardápio</span>
            </button>
          </Link>
          <Link href="/admin/add-food">
            <button className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded w-full text-left">
              <FaPlusSquare />
              <span>Adicionar Novo Item</span>
            </button>
          </Link>
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleSidebarToggle}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
