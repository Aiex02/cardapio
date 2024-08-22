import React from "react";
import Sidebar from "./Sidebar";
import AdminMenu from "./AdminMenu";


const AdminPanel: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <AdminMenu /> 
      </div>
    </div>
  );
};

export default AdminPanel;
