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
import { Link } from '@tanstack/react-router'
import { Building2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { AuthLayout } from '../auth-layout'
import { TermsFooter } from '../components/terms-footer'
import { SignUpForm } from './components/sign-up-form'

export function SignUp() {
  const { t } = useTranslation()
  const { status } = useStatus()

  return (
    <AuthLayout>
      <div className='tech-card w-full rounded-[32px] p-6 sm:p-8 md:p-9'>
        <div className='mb-8 flex flex-col gap-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='space-y-3'>
              <div className='text-xs font-medium tracking-[0.2em] text-white/38 uppercase'>
                {t('Enterprise Registration')}
              </div>
              <h2 className='text-3xl font-semibold tracking-tight text-white'>
                {t('Create your platform workspace')}
              </h2>
              <p className='max-w-xl text-left text-sm leading-7 text-white/45 sm:text-base'>
                {t('Set up your access credentials and enter the workspace for model operations, pricing workflows and enterprise delivery.')}
              </p>
            </div>
            <div className='hidden rounded-2xl border border-white/6 bg-white/[0.03] p-3 sm:block'>
              <Building2 className='size-5 text-blue-300' strokeWidth={1.8} />
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-[22px] border border-white/6 bg-white/[0.03] px-4 py-4'>
              <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>
                {t('Access setup')}
              </div>
              <div className='mt-2 text-sm font-semibold text-white'>
                {t('Create an enterprise-ready workspace identity')}
              </div>
            </div>
            <div className='rounded-[22px] border border-white/6 bg-white/[0.03] px-4 py-4'>
              <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>
                {t('Onboarding')}
              </div>
              <div className='mt-2 text-sm font-semibold text-white'>
                {t('Email verification, OAuth and protected registration flow')}
              </div>
            </div>
          </div>

          <p className='text-left text-sm leading-7 text-white/45 sm:text-base'>
            {t('Already have an account?')}{' '}
            <Link
              to='/sign-in'
              className='font-medium text-blue-400 underline underline-offset-4 transition-colors hover:text-blue-300'
            >
              {t('Sign in')}
            </Link>
            。
          </p>
        </div>

        <SignUpForm />

        <TermsFooter
          variant='sign-up'
          status={status}
          className='mt-7 text-center text-white/35'
        />
      </div>
    </AuthLayout>
  )
}
