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
import { useTranslation } from 'react-i18next'
import { AuthLayout } from '../auth-layout'
import { ForgotPasswordForm } from './components/forgot-password-form'

export function ForgotPassword() {
  const { t } = useTranslation()
  return (
    <AuthLayout>
      <div className='auth-form-card w-full space-y-8 rounded-[30px] p-6 sm:p-8'>
        <div className='space-y-3'>
          <div className='text-xs font-medium tracking-[0.2em] text-slate-400 uppercase'>
            {t('账号找回')}
          </div>
          <h2 className='text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-left'>
            {t('重置登录密码')}
          </h2>
          <p className='text-left text-sm text-slate-600 sm:text-base'>
            {t(
              '输入已绑定邮箱后，系统将向你发送密码重置邮件，帮助你安全恢复访问。'
            )}
          </p>
          <p className='text-left text-sm text-slate-600 sm:text-base'>
            {t('还没有账号？')}{' '}
            <Link
              to='/sign-up'
              className='font-medium text-sky-700 underline underline-offset-4 transition-colors hover:text-sky-600'
            >
              {t('立即注册')}
            </Link>
            。
          </p>
        </div>

        <ForgotPasswordForm className='space-y-0' />
      </div>
    </AuthLayout>
  )
}
