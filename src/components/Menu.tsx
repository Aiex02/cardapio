"use client";
import React, { useState, useEffect } from "react";
import MenuItem from "./MenuFood";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { MenuItem as MenuItemType } from "@/types/types";

const categories = [
  "Todos",
  "Entrada",
  "Prato Principal",
  "Sobremesa",
  "Bebida",
];

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menuItems"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MenuItemType[];
        setMenuItems(items);
      } catch (error) {
        console.error("Erro ao buscar itens do menu:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems =
    selectedCategory === "Todos"
      ? menuItems
      : menuItems.filter((item) => item.categoria === selectedCategory);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {} as Record<string, MenuItemType[]>);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center mt-10">Cardápio</h1>

      <div className="flex mb-6 space-x-4 overflow-x-auto scrollbar-hide justify-start md:justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition-colors duration-200`}
          >
            {category}
          </button>
        ))}
      </div>

      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="mb-8 mt-20">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {category}
          </h2>
          <div className="flex justify-center flex-wrap gap-6">
            {groupedItems[category].map((item) => (
              <MenuItem
                key={item.id}
                nome={item.nome}
                categoria={item.categoria}
                preco={item.preco}
                descricao={item.descricao}
                disponibilidade={item.disponibilidade}
                imagem={item.imagemUrl}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
