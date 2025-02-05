import { Router } from 'express'; // Importa o Router do Express, que permite definir rotas para a aplicação
import * as userController from '../controllers/user.controller'; // Importa todos os métodos do controller de usuários
import { authenticateJWT } from '../middlewares/auth.middleware'; // Importa o middleware de autenticação JWT

// Criação de uma instância do Router
const router = Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Criar um novo usuário
 *     description: Recebe os dados do usuário e cria um novo usuário no banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João"
 *               surname:
 *                 type: string
 *                 example: "Silva"
 *               email:
 *                 type: string
 *                 example: "joao.silva@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               address:
 *                 type: string
 *                 example: "Rua das Flores, 123"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-10"
 *               bloodType:
 *                 type: string
 *                 example: "O+"
 *               sex:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *                 example: "MALE"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar o usuário
 */
router.post('/', userController.createUser); // Rota POST para criar um novo usuário

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Listar todos os usuários
 *     description: Retorna todos os usuários cadastrados no banco de dados.
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   email:
 *                     type: string
 *       404:
 *         description: Nenhum usuário encontrado
 */
router.get('/', userController.listUsers); // Rota GET para listar todos os usuários

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Buscar um usuário específico por ID
 *     description: Retorna os detalhes de um usuário específico pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', userController.findUserById); // Rota GET para buscar um usuário por ID

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Atualizar um usuário existente
 *     description: Atualiza os dados de um usuário no banco de dados.
 *     security:
 *       - BearerAuth: []  # Adiciona o cabeçalho de autorização JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "João Atualizado"
 *               surname:
 *                 type: string
 *                 example: "Silva Atualizado"
 *               email:
 *                 type: string
 *                 example: "joao.silva.updated@example.com"
 *               password:
 *                 type: string
 *                 example: "novaSenha123"
 *               address:
 *                 type: string
 *                 example: "Rua Atualizada, 456"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1991-06-15"
 *               bloodType:
 *                 type: string
 *                 example: "A+"
 *               sex:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *                 example: "FEMALE"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o usuário
 */
router.put('/', authenticateJWT, userController.updateUsers); // Rota PUT para atualizar um usuário existente

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Deletar um usuário
 *     description: Deleta um usuário do banco de dados com base no ID fornecido.
 *     security:
 *       - BearerAuth: []  # Adiciona o cabeçalho de autorização JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/', authenticateJWT, userController.deleteUsers); // Rota DELETE para deletar um usuário

// Exporta o router para que ele possa ser usado em outros arquivos da aplicação
export default router;
