import { z } from 'zod'

/**
 * Client-side validation only — email required + valid format, password
 * required. No password complexity/length rules: none are documented by
 * the backend/product contract, so none are invented.
 */
export const loginSchema = z.object({
  email: z.string().min(1, 'Обовʼязкове поле').email('Невірний формат email'),
  password: z.string().min(1, 'Обовʼязкове поле'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
