import express from 'express'; // Importa o Express, o framework web para Node.js
import fs from 'fs'; // Importa o módulo fs (filesystem) para ler arquivos no sistema de arquivos
import path from 'path'; // Importa o módulo path para trabalhar com caminhos de diretórios e arquivos
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express(); // Cria uma instância do aplicativo Express
const cors = require('cors'); // Importa o pacote CORS para habilitar compartilhamento de recursos entre origens (cross-origin)
const PORT = process.env.PORT || 3000; // Define a porta do servidor, utilizando uma variável de ambiente ou 3000 por padrão

// Configuração do CORS para permitir requisições apenas da origem 'http://localhost:5173'
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json()); // Configura o Express para analisar corpos de requisições em formato JSON

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versão da especificação OpenAPI
    info: {
      title: 'API ',
      version: '1.0.0',
      description: 'Documentação da API ',
    },
  },
  // Caminho para os arquivos de rotas que contêm as anotações do Swagger
  apis: ['./src/routes/*.route.ts'], // Caminho do arquivo gerado
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve a documentação do Swagger em '/api-docs'
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Função para carregar as rotas dinamicamente
const loadRoutes = (app: express.Application): void => {
  const routesPath = path.join(__dirname, 'routes'); // Define o caminho para a pasta de rotas

  // Lê todos os arquivos dentro da pasta 'routes'
  fs.readdirSync(routesPath).forEach((file) => {
    // Verifica se o arquivo é um arquivo de rota (.route.ts ou .route.js)
    if (file.endsWith('.route.ts') || file.endsWith('.route.js')) {
      // Importa a rota dinamicamente com base no nome do arquivo
      import(path.join(routesPath, file)).then((routeModule) => {
        // Define a URL da rota com base no nome do arquivo (sem a extensão)
        const routeName = `/api/${file.split('.')[0]}`;

        // Usa a rota carregada, vinculando-a ao aplicativo Express
        app.use(routeName, routeModule.default || routeModule);  
        
        // Exibe no console a confirmação de que a rota foi carregada
        console.log(`Rota carregada: ${routeName}`);
      }).catch((err) => {
        // Caso ocorra erro ao carregar a rota, exibe o erro no console
        console.error(`Erro ao carregar a rota: ${file}`, err);
      });
    }
  });
};

// Carrega as rotas ao iniciar o servidor
loadRoutes(app);

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`); // Exibe no console que o servidor está rodando
});
