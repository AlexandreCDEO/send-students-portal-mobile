import { z } from 'zod'

export const updateProfileSchema = z.object({
  gender: z.number().optional(),
  mail: z.string().email('Email inválido').nonempty('Email é obrigatório'),
  phone: z.object({
    ddd: z.coerce
      .number()
      .int()
      .min(10, 'DDD deve ter 2 caracteres')
      .max(99, 'DDD deve ter 2 caracteres'),
    number: z.coerce
      .number()
      .int()
      .min(10000000, 'Número de telefone deve ter entre 8 e 9 caracteres')
      .max(999999999, 'Número de telefone deve ter entre 8 e 9 caracteres'),
  }),
  race: z.coerce.number().int().min(1, 'Raça é obrigatória'),
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
