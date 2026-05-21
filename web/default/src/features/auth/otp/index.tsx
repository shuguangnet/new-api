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
import { OtpForm } from './components/otp-form'

export function Otp() {
  const { t } = useTranslation()
  return (
    <AuthLayout>
      <div className='auth-form-card w-full space-y-8 rounded-[30px] p-6 sm:p-8'>
        <div className='space-y-3'>
          <div className='text-xs font-medium tracking-[0.2em] text-slate-400 uppercase'>
            {t('安全验证')}
          </div>
          <h2 className='text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-left'>
            {t('完成双重身份校验')}
          </h2>
          <p className='text-left text-sm text-slate-600 sm:text-base'>
            {t('请输入动态验证码或备用恢复码，以继续进入平台工作台。')}
          </p>
          <p className='text-left text-sm text-slate-600 sm:text-base'>
            {t('会话已失效？')}{' '}
            <Link
              to='/sign-in'
              className='font-medium text-sky-700 underline underline-offset-4 transition-colors hover:text-sky-600'
            >
              {t('重新登录')}
            </Link>
            。
          </p>
        </div>

        <OtpForm />
      </div>
    </AuthLayout>
  )
}
