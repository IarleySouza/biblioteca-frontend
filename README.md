# Neo-Xandria - Biblioteca Online

Aplicação React + Vite moderna para gerenciamento de biblioteca online com autenticação JWT e controle de acesso baseado em roles.

## 🚀 Tecnologias

- React 18
- Vite
- React Router v6
- Axios
- Tailwind CSS v4
- React Toastify
- Lucide React (ícones)
- Recharts (gráficos)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:

\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

\`\`\`env
VITE_API_URL=http://localhost:8080
# ou
# VITE_API_URL=http://34.236.143.148:8080
\`\`\`

4. Inicie o servidor de desenvolvimento:

\`\`\`bash
npm run dev
\`\`\`

A aplicação estará disponível em `http://localhost:5173`

## 🏗️ Estrutura do Projeto

\`\`\`
src/
├── api/
│   └── api.js           # Configuração Axios + interceptors
├── auth/
│   ├── AuthProvider.jsx # Contexto de autenticação
│   └── PrivateRoute.jsx # Proteção de rotas por role
├── components/
│   ├── Navbar.jsx       # Barra de navegação
│   ├── BookCard.jsx     # Card de livro
│   └── ...
├── context/
│   └── CartContext.jsx  # Contexto do carrinho
├── pages/
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   ├── Home.jsx
│   ├── MeusLivros.jsx
│   ├── MeusPedidos.jsx
│   ├── CadastrarLivro.jsx
│   ├── FuncionarioLivros.jsx
│   ├── AdminDashboard.jsx
│   ├── LivroView.jsx
│   └── NotFound.jsx
├── App.jsx
├── main.jsx
└── index.css
\`\`\`

## 👥 Roles e Permissões

### ROLE_CLIENTE
- Visualizar livros disponíveis
- Adicionar livros ao carrinho
- Comprar livros
- Acessar biblioteca pessoal
- Ler PDFs dos livros comprados

### ROLE_FUNCIONARIO
- Todas as permissões de cliente
- Cadastrar novos livros
- Gerenciar livros (editar/deletar)
- Visualizar todos os livros

### ROLE_ADMIN
- Todas as permissões de funcionário
- Acessar dashboard administrativo
- Visualizar relatórios de vendas
- Gerenciar usuários e funcionários

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Token) para autenticação:

1. Token armazenado no `localStorage`
2. Interceptor Axios adiciona automaticamente o header `Authorization: Bearer <token>`
3. Token decodificado contém `sub` (email) e `roles` (array de roles)
4. Redirecionamento automático em caso de token expirado (401)

## 📡 Endpoints da API

### Autenticação
- `POST /cliente/cadastro` - Criar nova conta
- `POST /cliente/login` - Fazer login (retorna token)

### Livros
- `GET /livros/ativos` - Listar livros disponíveis (público)
- `GET /livros/meus-livros` - Livros comprados (autenticado)
- `POST /livros/cadastrar` - Cadastrar livro (funcionário/admin)
- `GET /funcionario/livros` - Listar todos os livros (funcionário)
- `DELETE /livros/deletar/{id}` - Deletar livro (funcionário/admin)
- `GET /livros/pdf/{id}` - Abrir PDF do livro (apenas comprador)

### Vendas
- `POST /venda/vender?clienteId=&livroId=` - Realizar venda
- `GET /venda/relatorio` - Relatório de vendas (admin)

## 🎨 Tema

O projeto utiliza um tema escuro com paleta de cores:
- **Background**: Cinza escuro (#0a0a0c)
- **Primary**: Âmbar (#fbbf24)
- **Accent**: Âmbar claro
- **Cards**: Cinza médio (#18181b)

## 📦 Build para Produção

\`\`\`bash
npm run build
\`\`\`

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🤝 Contribuindo

Este é um projeto educacional. Sinta-se livre para fazer fork e adaptar conforme necessário.
