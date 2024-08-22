import React, { useState } from "react";
import { db, storage } from "@/lib/firebaseConfig"; 
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const categories = ["Entrada", "Prato Principal", "Sobremesa", "Bebida"];

const AddFoodForm: React.FC = () => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState(categories[0]);
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disponibilidade, setDisponibilidade] = useState(true);
  const [imagem, setImagem] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImagem(file);
    } else {
      alert("Por favor, selecione um arquivo JPG ou PNG.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !preco || !descricao || !imagem) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    setIsSubmitting(true); 

    try {
      const storageRef = ref(storage, `images/${imagem.name}`);
      await uploadBytes(storageRef, imagem);
      const imageUrl = await getDownloadURL(storageRef);
      const docRef = await addDoc(collection(db, "menuItems"), {
        nome,
        categoria,
        preco: parseFloat(preco),
        descricao,
        disponibilidade,
        imagemUrl: imageUrl, 
      });

      console.log("Documento adicionado com ID: ", docRef.id);


      setNome("");
      setCategoria(categories[0]);
      setPreco("");
      setDescricao("");
      setDisponibilidade(true);
      setImagem(null);

      setSuccessMessage("Comida adicionada com sucesso!"); 
      setTimeout(() => setSuccessMessage(""), 3000); 
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar a comida. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Adicionar Comida</h2>
      
      {successMessage && (
        <div className="mb-4 text-green-600 font-semibold">
          {successMessage}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={isSubmitting} 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Categoria</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          disabled={isSubmitting}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Preço</label>
        <input
          type="number"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={isSubmitting} 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={isSubmitting} 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Disponibilidade</label>
        <input
          type="checkbox"
          checked={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.checked)}
          className="mr-2"
          disabled={isSubmitting} 
        />
        Disponível
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Imagem</label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageUpload}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={isSubmitting} 
        />
        {imagem && <p className="text-sm text-gray-600 mt-2">Arquivo: {imagem.name}</p>}
      </div>
      <button
        type="submit"
        className={`w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isSubmitting} 
      >
        {isSubmitting ? "Adicionando..." : "Adicionar Comida"}
      </button>
    </form>
  );
};

export default AddFoodForm;
