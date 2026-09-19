import { zodResolver } from '@hookform/resolvers/zod'
import { TriangleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { loginSchema, type LoginFormValues } from '../model/loginSchema'

/**
 * Presentational capability for the Figma invalid-credentials state
 * (node 7:21). Not rendered by `LoginPage` in this task — no backend
 * credential-error source exists yet. A later task wires this in once
 * Better Auth submit integration is confirmed.
 */
function CredentialsError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 rounded-sm bg-bg-danger-subtle px-3 py-2.5">
      <TriangleAlert
        className="mt-0.5 size-4 shrink-0 text-text-danger"
        aria-hidden
      />
      <p className="text-body-compact text-text-danger">{message}</p>
    </div>
  )
}

type LoginPageProps = {
  credentialsError?: string
}

/**
 * A1 Admin Login (Figma node 7:3). Standalone public page — no
 * Sidebar/AdminLayout. Better Auth email/password sign-in is
 * intentionally NOT called here: the backend auth contract (login
 * method availability, credential-error mapping, post-login
 * destination) is still undocumented — see the final report. Submit
 * only runs RHF/Zod validation; there is no authentication side effect.
 */
export function LoginPage({ credentialsError }: LoginPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit() {
    // Deferred: no Better Auth call yet, see file-level note above.
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-app">
      <div className="flex w-[400px] flex-col gap-5 rounded-md bg-bg-surface px-8 pt-8 pb-7 shadow-[0px_1px_2px_0px_rgba(17,20,24,0.2),0px_0px_0px_1px_rgba(17,20,24,0.1)]">
        <div className="flex flex-col gap-0.5">
          <p className="text-heading-lg text-text-primary">Кумася Kids</p>
          <p className="text-body-compact text-text-muted">
            Адмін-панель · вхід для персоналу
          </p>
        </div>

        {credentialsError ? (
          <CredentialsError message={credentialsError} />
        ) : null}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-label text-text-muted">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-label font-normal text-text-danger"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-label text-text-muted">
              Пароль
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-label font-normal text-text-danger"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            intent="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            Увійти
          </Button>
        </form>

        <p className="text-label font-normal text-text-subtle">
          Доступ лише для облікових записів з роллю admin. Одночасно активними
          можуть бути не більше 3 акаунтів (ФВ-42).
        </p>
      </div>
    </div>
  )
}
