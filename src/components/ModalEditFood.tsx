import React, { useState } from "react";
import { MenuItem } from "@/types/types";
import { db, storage } from "@/lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

interface EditFoodModalProps {
  item: MenuItem;
  onClose: () => void;
  onSave: (updatedItem: MenuItem) => void;
}

const EditFoodModal: React.FC<EditFoodModalProps> = ({ item, onClose, onSave }) => {
  const [editedItem, setEditedItem] = useState(item);
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setNewImage(file);
    } else {
      alert("Por favor, selecione um arquivo JPG ou PNG.");
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = editedItem.imagemUrl;

      if (newImage) {
        const oldImageRef = ref(storage, editedItem.imagemUrl);
        await deleteObject(oldImageRef);

        const newImageRef = ref(storage, `images/${newImage.name}`);
        await uploadBytes(newImageRef, newImage);
        imageUrl = await getDownloadURL(newImageRef);
      }

      const itemRef = doc(db, "menuItems", editedItem.id);
      await updateDoc(itemRef, {
        nome: editedItem.nome,
        categoria: editedItem.categoria,
        preco: editedItem.preco,
        descricao: editedItem.descricao,
        disponibilidade: editedItem.disponibilidade,
        imagemUrl: imageUrl,
      });

      onSave({ ...editedItem, imagemUrl: imageUrl });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Item</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={editedItem.nome}
            onChange={(e) => setEditedItem({ ...editedItem, nome: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Categoria</label>
          <select
            value={editedItem.categoria}
            onChange={(e) => setEditedItem({ ...editedItem, categoria: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Entrada">Entrada</option>
            <option value="Prato Principal">Prato Principal</option>
            <option value="Sobremesa">Sobremesa</option>
            <option value="Bebida">Bebida</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Preço</label>
          <input
            type="number"
            value={editedItem.preco}
            onChange={(e) => setEditedItem({ ...editedItem, preco: parseFloat(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descrição</label>
          <textarea
            value={editedItem.descricao}
            onChange={(e) => setEditedItem({ ...editedItem, descricao: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Imagem</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {newImage && <p className="text-sm text-gray-600 mt-2">Nova imagem: {newImage.name}</p>}
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFoodModal;
