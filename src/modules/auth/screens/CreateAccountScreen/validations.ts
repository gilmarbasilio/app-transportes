import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório'
  }).min(3, {
    message: 'O nome tem que ter no mínimo 3 caracteres'
  }),
  email: z.string({
    required_error: 'Email é obrigatório'
  }).email({
    message: 'Email é inválido'
  }),
  password: z.string({
    required_error: 'A senha é obrigatória'
  }).min(6, {
    message: 'A senha tem que ter no mínimo 6 caracteres'
  }),
  confirmPassword: z.string({
    required_error: 'A confirmação de senha é obrigatória'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "A confirmação de senha não é igual a senha.",
  path: ["confirmPassword"]
})

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;