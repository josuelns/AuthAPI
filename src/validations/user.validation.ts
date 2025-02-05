import * as yup from 'yup';
import { userTranslation } from '../translations/user.translation'; // Importando as traduções

export const createUserValidationSchema = yup.object().shape({
  name: yup.string().required(userTranslation.errors.validation.name),
  email: yup
    .string()
    .email(userTranslation.errors.validation.email)
    .required(userTranslation.errors.validation.email),
  address: yup.string().required(userTranslation.errors.validation.address),
  birthday: yup.date().required(userTranslation.errors.validation.birthday),
  bloodType: yup.string().required(userTranslation.errors.validation.bloodType),
  sex: yup
    .string()
    .oneOf(['MALE', 'FEMALE', 'OTHER'], userTranslation.errors.validation.sex)
    .required(userTranslation.errors.validation.sex),
  surname: yup.string().required(userTranslation.errors.validation.surname),
  
  // Validação do campo password
  password: yup
    .string()
    .min(6, userTranslation.errors.validation.passwordMin) // Mínimo de 6 caracteres
    .max(20, userTranslation.errors.validation.passwordMax) // Máximo de 20 caracteres (opcional)
    .matches(/[a-z]/, userTranslation.errors.validation.passwordLowerCase) // Pelo menos uma letra minúscula
    .matches(/[A-Z]/, userTranslation.errors.validation.passwordUpperCase) // Pelo menos uma letra maiúscula
    .matches(/[0-9]/, userTranslation.errors.validation.passwordNumber) // Pelo menos um número
    .matches(/[\W_]/, userTranslation.errors.validation.passwordSpecial) // Pelo menos um caractere especial
    .required(userTranslation.errors.validation.password), // Torna o campo obrigatório
});
