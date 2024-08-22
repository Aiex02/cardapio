export interface User {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  role: string;
  createdAt: Date;
}

export interface MenuItemProps {
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
  disponibilidade: boolean;
  imagem: string;
}

export interface MenuItem {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
  disponibilidade: boolean;
  imagemUrl: string;
}
