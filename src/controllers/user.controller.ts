import { Request, Response } from 'express';
import * as yup from 'yup'; // Importando a biblioteca de validação Yup

import { UserRepository } from '../repositories/user.repository'; // Repositório de usuários para interagir com o banco de dados

import { CreateUserRequest } from '../interfaces/user.interface'; // Tipo de dados para criação de usuário
import { createUserValidationSchema } from '../validations/user.validation'; // Validação de dados de criação de usuário com Yup
import { userTranslation } from '../translations/user.translation'; // Traduções de mensagens

// Instancia o repositório de usuários para acessar os métodos
const userRepository = new UserRepository();

// Função responsável pela criação de um novo usuário
export const createUser = async (request: Request, response: Response) => {
  try {
    const params: CreateUserRequest = request.body; // Extrai os dados enviados na requisição

    // Validação dos dados recebidos com Yup
    await createUserValidationSchema.validate(params, { abortEarly: false });

    // Verifica se o usuário já existe no banco de dados
    const userExist = await userRepository.findByEmail(params);

    if (userExist) {
      return response.status(400).json({ error: true, message: userTranslation.errors.userExists });
    }

    // Criação do novo usuário no banco de dados
    const user = await userRepository.create(params);

    // Retorno da resposta de sucesso com os dados do usuário criado
    return response.json({
      error: false,
      message: userTranslation.success.userCreated,
      user,
    });

  } catch (error) {
    // Se ocorrer erro de validação (Yup), retorna o erro
    if (error instanceof yup.ValidationError) {
      return response.status(400).json({ error: true, message: error.errors });
    }

    // Se ocorrer erro de banco de dados ou outro erro interno, retorna erro genérico
    return response.status(500).json({ error: true, message: error.message });
  }
}

// Função responsável por buscar um usuário específico pelo ID
export const findUserById = async (request: Request, response: Response) => {
  try {
    const params = request.params; // Extrai o parâmetro id da URL

    // Busca o usuário no banco de dados pelo ID
    const user = await userRepository.findById(params);

    if (!user) {
      return response.status(404).json({
        error: true,
        message: userTranslation.errors.userNotFound, // Mensagem de erro caso o usuário não seja encontrado
      });
    }

    // Retorna o usuário encontrado com sucesso
    return response.status(200).json({
      error: false,
      message: userTranslation.success.userFetched, // Mensagem de sucesso
      user,
    });
  } catch (error) {
    // Caso ocorra algum erro, retorna uma mensagem genérica de erro no servidor
    return response.status(500).json({
      error: true,
      message: userTranslation.errors.internalError, // Mensagem de erro interna
    });
  }
};

// Função responsável por listar todos os usuários cadastrados
export const listUsers = async (request: Request, response: Response) => {
  try {
    // Busca todos os usuários cadastrados no banco de dados
    const users = await userRepository.list();

    if (users.length === 0) {
      return response.status(404).json({
        error: true,
        message: userTranslation.errors.noUsersRegistered, // Mensagem caso não haja nenhum usuário
      });
    }

    // Retorna a lista de usuários
    return response.status(200).json({
      error: false,
      message: userTranslation.success.usersFetched, // Mensagem de sucesso
      users,
    });
  } catch (error) {
    // Caso ocorra erro, retorna uma mensagem genérica de erro no servidor
    return response.status(500).json({
      error: true,
      message: userTranslation.errors.internalError, // Mensagem de erro interna
    });
  }
};

// Função responsável por atualizar os dados de um usuário existente
export const updateUsers = async (request: Request, response: Response) => {
  try {
    const params = request.body; // Extrai os dados da requisição

    // Verifica se o usuário existe no banco de dados
    const userExists = await userRepository.findById(params);

    if (!userExists) {
      return response.json({
        error: true,
        message: userTranslation.errors.userNotFound, // Mensagem caso o usuário não seja encontrado
      });
    }

    // Atualiza o usuário no banco de dados
    const user = await userRepository.update(params);

    // Retorna o usuário atualizado
    return response.json({
      error: false,
      message: userTranslation.success.userUpdated, // Mensagem de sucesso
      user,
    });

  } catch (error) {
    // Caso ocorra erro, retorna a mensagem de erro
    return response.json({ message: error.message });
  }
}

// Função responsável por remover os dados de um usuário existente
export const deleteUsers = async (request: Request, response: Response) => {
  try {
    const params = request.body; // Extrai os dados da requisição

    // Verifica se o usuário existe no banco de dados
    const userExists = await userRepository.findById(params);

    if (!userExists) {
      return response.json({
        error: true,
        message: userTranslation.errors.userNotFound, // Mensagem caso o usuário não seja encontrado
      });
    }

    // deletar o usuário no banco de dados
    const user = await userRepository.delete(params);

    // Retorna o usuário atualizado
    return response.json({
      error: false,
      message: userTranslation.success.userDeleted, // Mensagem de sucesso
      user,
    });

  } catch (error) {
    // Caso ocorra erro, retorna a mensagem de erro
    return response.json({ message: error.message });
  }
}
