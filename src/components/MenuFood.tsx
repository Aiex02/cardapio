import { MenuItemProps } from "@/types/types";
import React from "react";

const MenuItem: React.FC<MenuItemProps> = ({ nome, categoria, preco, descricao, disponibilidade, imagem }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={imagem} alt={nome} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{nome}</h2>
        <p className="text-gray-600 mb-1"><strong>Categoria:</strong> {categoria}</p>
        <p className="text-gray-600 mb-1"><strong>Preço:</strong> R${preco.toFixed(2)}</p>
        <p className="text-gray-600 mb-3"><strong>Descrição:</strong> {descricao}</p>
        <p className={`font-semibold ${disponibilidade ? "text-green-600" : "text-red-600"}`}>
          {disponibilidade ? "Disponível" : "Indisponível"}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
