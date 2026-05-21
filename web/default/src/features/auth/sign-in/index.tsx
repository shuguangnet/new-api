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
import { ShieldCheck } from 'lucide-react'
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
      <div className='auth-form-card w-full rounded-[32px] p-6 sm:p-8 md:p-9'>
        <div className='mb-8 flex flex-col gap-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='space-y-3'>
              <div className='text-xs font-medium tracking-[0.2em] text-slate-400 uppercase'>
                {t('企业账号登录')}
              </div>
              <h2 className='text-3xl font-semibold tracking-tight text-slate-900'>
                {t('进入你的平台控制中心')}
              </h2>
              <p className='max-w-xl text-left text-sm leading-7 text-slate-600 sm:text-base'>
                {t('继续进入企业工作台，处理模型路由、计费运营、权限协同与生产可视化管理。')}
              </p>
            </div>
            <div className='hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:block'>
              <ShieldCheck className='size-5 text-sky-600' strokeWidth={1.8} />
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='auth-highlight-card px-4 py-4'>
              <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
                {t('工作台')}
              </div>
              <div className='mt-2 text-sm font-semibold text-slate-900'>
                {t('企业控制台与账号统一入口')}
              </div>
            </div>
            <div className='auth-highlight-card px-4 py-4'>
              <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
                {t('安全机制')}
              </div>
              <div className='mt-2 text-sm font-semibold text-slate-900'>
                {t('支持 Passkey、OAuth 与受保护会话流程')}
              </div>
            </div>
          </div>

          {!status?.self_use_mode_enabled && status?.register_enabled !== false && (
            <p className='text-left text-sm leading-7 text-slate-600 sm:text-base'>
              {t('还没有账号？')}{' '}
              <Link
                to='/sign-up'
                className='font-medium text-sky-700 underline underline-offset-4 transition-colors hover:text-sky-600'
              >
                {t('立即注册')}
              </Link>
              。
            </p>
          )}
        </div>

        <UserAuthForm redirectTo={redirect} />

        <TermsFooter
          variant='sign-in'
          status={status}
          className='mt-7 text-center text-slate-500'
        />
      </div>
    </AuthLayout>
  )
}
