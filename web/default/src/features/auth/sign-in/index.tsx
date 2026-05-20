/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Link, useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { AuthLayout } from '../auth-layout'
import { TermsFooter } from '../components/terms-footer'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { t } = useTranslation()
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const { status } = useStatus()

  return (
    <AuthLayout>
      <div className='tech-card rounded-[30px] w-full space-y-8 p-6 sm:p-8 md:p-9'>
        <div className='space-y-3'>
          <div className='text-xs font-medium tracking-[0.2em] text-white/38 uppercase'>
            {t('Enterprise Sign In')}
          </div>
          <h2 className='text-3xl font-semibold tracking-tight text-white'>
            {t('Access your control center')}
          </h2>
          {!status?.self_use_mode_enabled && status?.register_enabled !== false && (
            <p className='text-left text-sm leading-7 text-white/45 sm:text-base'>
              {t("Don't have an account?")}{' '}
              <Link
                to='/sign-up'
                className='font-medium text-blue-400 underline underline-offset-4 transition-colors hover:text-blue-300'
              >
                {t('Sign up')}
              </Link>
              。
            </p>
          )}
        </div>

        <UserAuthForm redirectTo={redirect} />

        <TermsFooter
          variant='sign-in'
          status={status}
          className='text-center text-white/35'
        />
      </div>
    </AuthLayout>
  )
}
