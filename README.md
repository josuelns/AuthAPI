# API Project

Este é um projeto de API desenvolvido com Node.js, TypeScript, Prisma e outras bibliotecas populares.

## 🚀 Funcionalidades

- Estruturação e organização do código em TypeScript.
- Uso do Prisma ORM para gerenciar o banco de dados.
- Autenticação com JWT.
- Documentação da API com Swagger.
- Suporte a variáveis de ambiente com dotenv.
- Validação de dados com Yup.

## 🛠 Pré-requisitos

Certifique-se de ter instalado as seguintes ferramentas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior recomendada)
- [Docker](https://www.docker.com/) (opcional para rodar o banco de dados)

Além disso, é bom ter um editor de código, como o [VSCode](https://code.visualstudio.com/).

## ⚙️ Configuração do Ambiente

1. Clone este repositório:

   ```bash
   git clone https://github.com/josuelns/AuthAPI.git

  Acesse o diretório do projeto:
cd api
Instale as dependências:

npm install
Crie um arquivo .env baseado no .env.example e configure suas variáveis de ambiente.

(Opcional) Configure o banco de dados usando o Docker:

docker-compose up -d
Gere o cliente do Prisma:

npx prisma generate
Realize as migrações no banco de dados:

npx prisma migrate dev

🚀 Rodando o Projeto
Para iniciar o servidor em modo de desenvolvimento:

npm run dev

O servidor estará disponível em http://localhost:3000.

🧰 Endpoints da API
A documentação da API está disponível em:

http://localhost:3000/api-docs
Gerado com Swagger.

📂 Estrutura do Projeto
plaintext
Copiar
Editar
api/
├── prisma/              # Arquivos relacionados ao Prisma (schema e migrações)
├── src/
│   ├── controllers/     # Lógica dos controladores
│   ├── middlewares/     # Middlewares da aplicação
│   ├── repositories/    # Manipulação de dados
│   ├── routes/          # Configuração de rotas
│   ├── validations/     # Validações com Yup
|   ├── translations/    # Textos retornados ao usuario
│   ├── server.ts        # Arquivo principal do servidor
├── .env                 # Configurações de ambiente
├── docker-compose.yml   # Configuração para o Docker
├── package.json         # Gerenciamento de dependências e scripts
└── README.md            # Documentação do projeto
📦 Dependências Principais
express: Framework web para Node.js.
@prisma/client: Cliente para interagir com o banco de dados.
swagger-jsdoc e swagger-ui-express: Para gerar e servir a documentação da API.
bcryptjs: Para hashing de senhas.
jsonwebtoken: Para autenticação JWT.
yup: Para validação de dados.
🛠 Ferramentas de Desenvolvimento
typescript: Superset do JavaScript.
eslint e typescript-eslint: Para manter o código limpo e padronizado.
ts-node-dev: Para executar o projeto em modo desenvolvimento com suporte a TypeScript.
📝 Licença
Este projeto está licenciado sob a Licença ISC.

Feito com ❤️ por Seu Nome.
