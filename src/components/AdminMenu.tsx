import React, { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { MenuItem } from "@/types/types"; 
import EditFoodModal from "./ModalEditFood";


const AdminMenu: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const querySnapshot = await getDocs(collection(db, "menuItems"));
      const fetchedItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      setItems(fetchedItems);
    };

    fetchMenuItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, imagemUrl: string) => {
    try {
      await deleteDoc(doc(db, "menuItems", id));
      const imageRef = ref(storage, imagemUrl);
      await deleteObject(imageRef);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  };

  const handleToggleAvailability = async (id: string, disponibilidade: boolean) => {
    try {
      const itemRef = doc(db, "menuItems", id);
      await updateDoc(itemRef, { disponibilidade: !disponibilidade });
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, disponibilidade: !disponibilidade } : item
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar a disponibilidade:", error);
    }
  };

  const handleSaveEdit = (updatedItem: MenuItem) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gerenciar Cardápio</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img src={item.imagemUrl} alt={item.nome} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{item.nome}</h2>
              <p className="text-gray-600 mb-1"><strong>Categoria:</strong> {item.categoria}</p>
              <p className="text-gray-600 mb-1"><strong>Preço:</strong> R${item.preco.toFixed(2)}</p>
              <p className="text-gray-600 mb-3"><strong>Descrição:</strong> {item.descricao}</p>
              <p className={`font-semibold ${item.disponibilidade ? "text-green-600" : "text-red-600"}`}>
                {item.disponibilidade ? "Disponível" : "Indisponível"}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleToggleAvailability(item.id, item.disponibilidade)}
                  className={`px-4 py-2 rounded ${
                    item.disponibilidade ? "bg-yellow-500" : "bg-green-500"
                  } text-white hover:bg-opacity-75`}
                >
                  {item.disponibilidade ? "Indisponibilizar" : "Disponibilizar"}
                </button>
                <div>
                    <button
                      onClick={() => setSelectedItem(item)} 
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.imagemUrl)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                      Excluir
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <EditFoodModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)} 
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default AdminMenu;
