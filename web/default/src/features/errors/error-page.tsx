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
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { LucideIcon } from 'lucide-react'

type ErrorPageAction = {
  label: string
  onClick: () => void
  variant?: 'default' | 'outline' | 'secondary'
}

type ErrorPageProps = {
  /** HTTP status code displayed as a badge (e.g. 404) */
  statusCode: number
  /** Lucide icon component */
  icon: LucideIcon
  /** Primary heading */
  title: string
  /** Secondary description */
  description: string
  /** Optional hint below description */
  hint?: string
  /** Action buttons */
  actions: ErrorPageAction[]
  /** Additional class name */
  className?: string
}

export function ErrorPage(props: ErrorPageProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const Icon = props.icon

  return (
    <div className={cn('flex min-h-svh items-center justify-center bg-white px-4 py-16', props.className)}>
      <div className='relative mx-auto w-full max-w-lg'>
        {/* Subtle background decoration */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-x-0 -top-12 h-48 rounded-3xl opacity-[0.04]'
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.62 0.19 260), transparent)',
          }}
        />

        <div className='relative flex flex-col items-center text-center'>
          {/* Status badge */}
          <div className='mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground'>
            <span className='flex h-1.5 w-1.5 rounded-full bg-destructive' />
            <span>{t('状态码')} {props.statusCode}</span>
          </div>

          {/* Icon */}
          <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border bg-white shadow-sm'>
            <Icon className='h-9 w-9 text-muted-foreground' strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h1 className='mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl'>
            {props.title}
          </h1>

          {/* Description */}
          <p className='mb-2 max-w-sm text-sm leading-relaxed text-muted-foreground'>
            {props.description}
          </p>

          {/* Hint */}
          {props.hint && (
            <p className='mb-8 text-xs leading-relaxed text-muted-foreground/70'>
              {props.hint}
            </p>
          )}

          {/* Actions */}
          <div className='flex flex-wrap items-center justify-center gap-3'>
            {props.actions.map((action, i) => (
              <Button
                key={i}
                variant={action.variant ?? (i === 0 ? 'default' : 'outline')}
                onClick={action.onClick}
                size='sm'
              >
                {action.label}
              </Button>
            ))}
            {!props.actions.some(a => a.label === t('返回主页')) && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigate({ to: '/' })}
              >
                {t('返回主页')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

ErrorPage.displayName = 'ErrorPage'
