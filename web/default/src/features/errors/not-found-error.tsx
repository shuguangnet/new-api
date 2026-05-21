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
import { FileSearch } from 'lucide-react'
import { ErrorPage } from './error-page'

export function NotFoundError() {
  const { t } = useTranslation()
  const { history } = useRouter()

  return (
    <ErrorPage
      statusCode={404}
      icon={FileSearch}
      title={t('页面未找到')}
      description={t('您访问的页面不存在或已被移除，请检查链接地址是否正确。')}
      hint={t('如您从其他页面点击链接到达此处，该链接可能已过期。')}
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
