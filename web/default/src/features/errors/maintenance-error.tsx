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
import { useTranslation } from 'react-i18next'
import { Construction } from 'lucide-react'
import { ErrorPage } from './error-page'

export function MaintenanceError() {
  const { t } = useTranslation()

  return (
    <ErrorPage
      statusCode={503}
      icon={Construction}
      title={t('系统维护中')}
      description={t('我们正在进行系统升级与维护工作，暂时无法提供服务。预计很快恢复正常访问。')}
      hint={t('维护期间所有 API 调用将被暂停，请耐心等待。')}
      actions={[]}
    />
  )
}
