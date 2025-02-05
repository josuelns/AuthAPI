export enum EUserSex {
    Male = 'MALE',
    Female = 'FEMALE',
    Other = 'OTHER',
}

export interface IUser {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password?: string;
    phone?: string;
    address: string;
    img?: string;
    bloodType: string;
    sex: EUserSex;
    birthday: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// A interface de requisição de criação de usuário
export interface CreateUserRequest extends Pick<IUser, 'name' | 'email' | 'address' | 'birthday' | 'bloodType' | 'sex' | 'surname'> { }

// A interface de requisição de listagem de usuário por email
export interface findByEmailUserRequest extends Pick<IUser, 'email'> { }

// A interface de requisição de listagem de usuário por id
export interface findByIdUserRequest extends Pick<IUser, 'id'> { }

// A interface de requisição de criação de usuário
export interface updateUserRequest extends Partial<IUser> { }

// A interface de requisição de deleção de usuário por id
export interface deleteUserRequest extends Pick<IUser, 'id'> { }
