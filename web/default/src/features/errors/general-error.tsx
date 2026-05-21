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
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ErrorPage } from './error-page'
import { ServerCrash, AlertTriangle } from 'lucide-react'

const FEEDBACK_URL = 'https://github.com/QuantumNous/new-api/issues'

type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
  minimal?: boolean
  error?: unknown
}

function getHttpStatus(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null) return undefined
  const response = (error as Record<string, unknown>).response
  if (typeof response !== 'object' || response === null) return undefined
  const status = (response as Record<string, unknown>).status
  return typeof status === 'number' ? status : undefined
}

export function GeneralError({
  className,
  minimal = false,
  error,
}: GeneralErrorProps) {
  const { t } = useTranslation()
  const { history } = useRouter()
  const status = getHttpStatus(error)
  const isRateLimited = status === 429

  if (minimal) {
    return (
      <div className={cn('flex min-h-[200px] items-center justify-center p-8', className)}>
        <div className='flex flex-col items-center text-center gap-2'>
          <AlertTriangle className='h-8 w-8 text-destructive' strokeWidth={1.5} />
          <span className='text-sm font-medium text-foreground'>
            {isRateLimited ? t('请求过于频繁') : t('出了点问题')}
          </span>
          <p className='text-xs text-muted-foreground'>
            {isRateLimited ? t('请稍后再试。') : t('请稍后再试。')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <ErrorPage
      className={className}
      statusCode={status ?? 500}
      icon={isRateLimited ? AlertTriangle : ServerCrash}
      title={
        isRateLimited
          ? t('请求过于频繁')
          : t('服务暂时不可用')
      }
      description={
        isRateLimited
          ? t('您的请求频率超过了系统限制，请等待片刻后再尝试。')
          : t('服务器遇到了意外错误，我们的技术团队正在努力恢复服务。对于由此造成的不便，我们深表歉意。')
      }
      hint={
        isRateLimited
          ? undefined
          : t('如问题持续存在，请在 GitHub Issues 中提交反馈。')
      }
      actions={[
        {
          label: t('返回上页'),
          onClick: () => history.go(-1),
          variant: 'outline',
        },
        !isRateLimited
          ? {
              label: t('反馈问题'),
              onClick: () => window.open(FEEDBACK_URL, '_blank', 'noopener noreferrer'),
              variant: 'secondary',
            }
          : undefined,
      ].filter((a): a is NonNullable<typeof a> => a != null)}
    />
  )
}
