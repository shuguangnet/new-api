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
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LockKeyhole } from 'lucide-react'
import { ErrorPage } from './error-page'

export function UnauthorisedError() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { history } = useRouter()

  return (
    <ErrorPage
      statusCode={401}
      icon={LockKeyhole}
      title={t('需要身份认证')}
      description={t('此页面需要登录后才能访问，请使用您的账户凭据进行身份验证。')}
      hint={t('如您尚未注册，请联系管理员获取访问权限。')}
      actions={[
        {
          label: t('前往登录'),
          onClick: () => navigate({ to: '/sign-in' }),
        },
        {
          label: t('返回上页'),
          onClick: () => history.go(-1),
          variant: 'outline',
        },
      ]}
    />
  )
}
