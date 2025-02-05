import { Router } from 'express'; // Importa o Router do Express, que permite definir rotas para a aplicação
import * as authController from '../controllers/auth.controller'; // Importa todos os métodos do controller de autenticação

// Criação de uma instância do Router
const router = Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Autenticar um usuário
 *     description: Recebe as credenciais de login (email e senha) e retorna um token JWT se as credenciais forem válidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O email do usuário
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: A senha do usuário
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna um token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: O usuário autenticado
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "usuario@example.com"
 *                 token:
 *                   type: string
 *                   description: O token JWT gerado para o usuário autenticado
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas, email ou senha incorretos
 *       500:
 *         description: Erro interno ao tentar realizar o login
 */

// Rota POST para autenticar um usuário
// Quando a requisição for feita para '/auth', o controller 'login' será chamado
router.post('/', authController.login); // Chama a função login do controller de autenticação

// Exporta o router para que ele possa ser usado em outros arquivos da aplicação
export default router;
