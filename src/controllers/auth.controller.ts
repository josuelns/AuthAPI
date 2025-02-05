import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import { UserRepository } from '../repositories/user.repository'; // Repositório de usuários para interagir com o banco de dados

dotenv.config();

// Instancia o repositório de usuários para acessar os métodos
const userRepository = new UserRepository();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 3600;

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login de um usuário
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
export const login = async (req: Request, res: Response): Promise<void> => {
    const params = req.body;

    try {
        // Verifica se o usuário existe no banco de dados pelo email
        const userExist = await userRepository.findByEmail(params);

        // Se o usuário não existir, retorna um erro de credenciais inválidas
        if (!userExist) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        // Verifica se a senha fornecida é válida, comparando com a senha no banco de dados
        const isPasswordValid = await bcrypt.compare(params.password, userExist.password);

        // Se a senha não for válida, retorna um erro de credenciais inválidas
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        // Gera um token JWT para o usuário autenticado
        const token = jwt.sign(
            { id: userExist.id, email: userExist.email }, 
            JWT_SECRET,  // Chave secreta para gerar o token
            { expiresIn: Number(JWT_EXPIRES_IN) }  // Tempo de expiração do token em segundos
        );

        // Retorna o usuário e o token JWT
        res.json({ user: userExist, token });
    } catch (error) {
        // Em caso de erro, retorna um erro genérico de falha ao realizar login
        res.status(500).json({ error: 'Erro ao realizar o login' });
    }
};
