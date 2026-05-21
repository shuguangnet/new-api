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
      <div className='auth-form-card w-full rounded-[32px] p-6 sm:p-8 md:p-9'>
        <div className='mb-8 flex flex-col gap-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='space-y-3'>
              <div className='text-xs font-medium tracking-[0.2em] text-slate-400 uppercase'>
                {t('企业账号注册')}
              </div>
              <h2 className='text-3xl font-semibold tracking-tight text-slate-900'>
                {t('创建你的平台工作空间')}
              </h2>
              <p className='max-w-xl text-left text-sm leading-7 text-slate-600 sm:text-base'>
                {t('完成访问凭证初始化后，即可进入平台开展模型运营、定价流程与企业交付管理。')}
              </p>
            </div>
            <div className='hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:block'>
              <Building2 className='size-5 text-sky-600' strokeWidth={1.8} />
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='auth-highlight-card px-4 py-4'>
              <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
                {t('接入准备')}
              </div>
              <div className='mt-2 text-sm font-semibold text-slate-900'>
                {t('创建可交付的企业级工作空间身份')}
              </div>
            </div>
            <div className='auth-highlight-card px-4 py-4'>
              <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
                {t('开通流程')}
              </div>
              <div className='mt-2 text-sm font-semibold text-slate-900'>
                {t('支持邮箱验证、OAuth 与受保护注册流程')}
              </div>
            </div>
          </div>

          <p className='text-left text-sm leading-7 text-slate-600 sm:text-base'>
            {t('已有账号？')}{' '}
            <Link
              to='/sign-in'
              className='font-medium text-sky-700 underline underline-offset-4 transition-colors hover:text-sky-600'
            >
              {t('直接登录')}
            </Link>
            。
          </p>
        </div>

        <SignUpForm />

        <TermsFooter
          variant='sign-up'
          status={status}
          className='mt-7 text-center text-slate-500'
        />
      </div>
    </AuthLayout>
  )
}
