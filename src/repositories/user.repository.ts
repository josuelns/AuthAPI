import { User } from '@prisma/client'; // Importa o tipo User do Prisma (representando um usuário no banco de dados)
import bcrypt from 'bcryptjs';
import { CreateUserRequest, findByEmailUserRequest, findByIdUserRequest, updateUserRequest, deleteUserRequest } from '../interfaces/user.interface'; // Importa as interfaces para os tipos de dados que são passados nas requisições
import { prisma } from '../database'; // Importa a instância do Prisma para interagir com o banco de dados


// Interface do repositório de usuários, definindo os métodos que serão utilizados para acessar os dados
export interface IUserRepository {
  create(data: CreateUserRequest): Promise<User>; // Método para criar um novo usuário
  list(data): Promise<User[]>; // Método para listar todos os usuários
  findByEmail(data: findByEmailUserRequest): Promise<User>; // Método para buscar um usuário por email
  update(params: updateUserRequest): Promise<User> // Método para editar um usuário
  delete(params: deleteUserRequest): Promise<User> // Método para deletar um usuário
}

// Implementação do repositório de usuários
class UserRepository implements IUserRepository {
  // Método para criar um novo usuário
  public async create(params: CreateUserRequest): Promise<User> {
    // Converte o campo birthday de string para objeto Date antes de salvar no banco
    const dto = {
      ...params,
      birthday: new Date(params.birthday) // A conversão é importante, pois o banco espera um tipo DateTime e não uma string
    }

    // Cria o novo usuário no banco de dados e retorna o usuário criado
    const user = await prisma.user.create({
      data: dto as never // O 'dto' é passado como dados para a criação do usuário
    });

    return user; // Retorna o usuário criado
  }

  // Método para listar todos os usuários
  public async list(): Promise<User[]> {
    // Utiliza o Prisma para buscar todos os usuários
    const users = await prisma.user.findMany();
    return users; // Retorna a lista de usuários encontrados
  }

  // Método para buscar um usuário por ID
  public async findById(params: findByIdUserRequest): Promise<User> {
    // Busca o usuário no banco de dados utilizando o ID
    const user = await prisma.user.findUnique({
      where: {
        id: Number(params.id) // Converte o ID para número, já que o banco de dados espera esse tipo
      }
    });
    return user; // Retorna o usuário encontrado, ou 'null' se não encontrado
  }

  // Método para buscar um usuário por email
  public async findByEmail(params: findByEmailUserRequest): Promise<User> {
    // Busca o usuário no banco de dados utilizando o email
    const user = await prisma.user.findUnique({
      where: {
        email: params.email // Utiliza o email passado para buscar o usuário
      }
    });
    return user; // Retorna o usuário encontrado, ou 'null' se não encontrado
  }

  // Método para atualizar um usuário
  public async update(params: updateUserRequest): Promise<User> {
    const hashedPassword = await bcrypt.hash(params.password, 10);

    const dto = {
      ...params,
      password: hashedPassword,
      id: Number(params.id),
      birthday: new Date(params.birthday) // A conversão é importante, pois o banco espera um tipo DateTime e não uma string
    }
    
    // Utiliza o Prisma para atualizar o usuário com base no ID e nos novos dados
    const user = await prisma.user.update({
      where: {
        id: params.id // Utiliza o ID do usuário para realizar a atualização
      },
      data: dto as never // Passa os dados para a atualização (assumindo que os dados estejam corretos)
    });
    return user; // Retorna o usuário atualizado
  }

  // Método para deletar um usuário
  public async delete(params: deleteUserRequest): Promise<User> {
    // Utiliza o Prisma para atualizar o usuário com base no ID e nos novos dados
    const user = await prisma.user.delete({
      where: {
        id: params.id // Utiliza o ID do usuário para realizar a deleção
      },

    });
    return user; // Retorna o usuário atualizado
  }
}

// Exporta a classe UserRepository para ser utilizada em outros lugares
export { UserRepository };
