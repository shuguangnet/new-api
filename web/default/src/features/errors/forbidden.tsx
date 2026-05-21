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
import { useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ShieldOff } from 'lucide-react'
import { ErrorPage } from './error-page'

export function ForbiddenError() {
  const { t } = useTranslation()
  const { history } = useRouter()

  return (
    <ErrorPage
      statusCode={403}
      icon={ShieldOff}
      title={t('访问被拒绝')}
      description={t('您当前的账户权限不足以访问此资源，如需提升权限请联系系统管理员。')}
      hint={t('如您认为这是一个错误，请确认您已使用正确的账户登录。')}
      actions={[
        {
          label: t('返回上页'),
          onClick: () => history.go(-1),
          variant: 'outline',
        },
      ]}
    />
  )
}
