# Sistema de Administração de Cardápio

Este projeto é uma aplicação de administração de cardápio, desenvolvida com Next.js e Firebase. Ele permite que administradores gerenciem os itens do cardápio, como adicionar novos pratos, editar e remover itens existentes. O sistema também implementa autenticação e controle de acesso com base em funções (roles), garantindo que apenas usuários autorizados possam acessar determinadas funcionalidades.

## Tecnologias Utilizadas
-Next.js: Framework React para desenvolvimento de aplicações web com renderização do lado do servidor (SSR).
-React: Biblioteca JavaScript para construção de interfaces de usuário.
-Firebase: Backend-as-a-Service (BaaS) que inclui autenticação, Firestore para banco de dados e Firebase Storage para armazenamento de arquivos.
-Tailwind CSS: Framework de CSS para estilização rápida e eficiente.

## Funcionalidades
- Autenticação de Usuários: Sistema de login e registro de usuários utilizando Firebase Authentication.
- Controle de Acesso: Apenas usuários com role de administrador podem acessar as páginas de administração.
- Gerenciamento de Cardápio: Administradores podem adicionar, editar, e remover itens do cardápio.
- Sidebar Responsiva: Sidebar que aparece apenas em telas maiores ou como modal em dispositivos móveis.
- Formulário de Adição de Comidas: Formulário para adicionar novos itens ao cardápio, incluindo upload de imagens para o Firebase Storage.

## Requisitos do Sistema
- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior) ou yarn (versão 1 ou superior)

## Configuração do Projeto

### 1 clone o Repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2 Instale as Dependências:
Usando npm:
```bash
npm install
```
Usando yarn
```bash
yarn install
```
### 3 Configuração do Firebase:
- Crie um projeto no Firebase.
- Habilite Firebase Authentication, Firestore Database, e Firebase Storage.
- Configure as variáveis de ambiente no arquivo .env

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4 Inicie o Servidor de Desenvolvimento:
Usando npm:
```bash
npm run dev
```

Ou usando yarn:
```bash
yarn dev
```
Acesse a aplicação no navegador em http://localhost:3000.

## Estrutura do projeto

- components/: Contém todos os componentes React, como Navbar, Sidebar, AddFoodForm, etc.
- lib/: Contém a configuração do Firebase e funções auxiliares, como auth.ts para autenticação.
- pages/: Contém as páginas do Next.js, como index.tsx, admin.tsx, add-food.tsx, etc.
- types/: Define os tipos TypeScript utilizados no projeto, como a interface User.

## Controle de Acesso
O sistema utiliza roles para controlar o acesso às páginas de administração. Somente usuários com role "administrador" podem acessar páginas de administração. Usuários com role "user" ou não autenticados são redirecionados para a página inicial ou de login.


## Funcionalidades Detalhadas
- Adicionar Item ao Cardápio: Acesse a página /admin/add-food para adicionar novos itens. Preencha os campos necessários e faça upload de uma imagem para o item.
- Editar/Remover Item: Na página de administração (/admin), é possível editar ou remover itens do cardápio.


## Estilização
O projeto utiliza Tailwind CSS para estilização, permitindo uma personalização rápida e eficiente dos componentes e páginas.






