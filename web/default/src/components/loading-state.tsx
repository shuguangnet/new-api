/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS OR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface LoadingStateProps {
  className?: string
  message?: string
  size?: 'sm' | 'md' | 'lg'
  inline?: boolean
}

const sizeMap = {
  sm: 'size-8',
  md: 'size-12',
  lg: 'size-16',
} as const

const dotSizeMap = {
  sm: 1.5,
  md: 2,
  lg: 2.5,
} as const

/**
 * Orbital spinner with 3 dots orbiting a glowing core.
 * Pure CSS animation — no JS runtime cost.
 */
function OrbitalSpinner(props: { size: 'sm' | 'md' | 'lg' }) {
  const s = props.size
  const dot = dotSizeMap[s]

  return (
    <div className={cn('relative', sizeMap[s])} role='status' aria-label='Loading'>
      {/* Core glow */}
      <div
        className={cn(
          'absolute inset-0 m-auto size-3 rounded-full',
          'bg-[oklch(0.55_0.15_280)]',
          'shadow-[0_0_12px_oklch(0.55_0.2_280/60%),0_0_24px_oklch(0.55_0.15_280/30%)]',
          'animate-nebula-core-pulse',
        )}
      />

      {/* Orbit 1 */}
      <div className='animate-nebula-orbit-1 absolute inset-0'>
        <div
          className='absolute top-0 left-1/2 rounded-full bg-[oklch(0.7_0.2_330)] shadow-[0_0_6px_oklch(0.7_0.2_330/60%)]'
          style={{ width: dot, height: dot, marginLeft: -dot / 2 }}
        />
      </div>

      {/* Orbit 2 */}
      <div className='animate-nebula-orbit-2 absolute inset-0'>
        <div
          className='absolute top-0 left-1/2 rounded-full bg-[oklch(0.6_0.22_280)] shadow-[0_0_6px_oklch(0.6_0.22_280/60%)]'
          style={{ width: dot, height: dot, marginLeft: -dot / 2 }}
        />
      </div>

      {/* Orbit 3 */}
      <div className='animate-nebula-orbit-3 absolute inset-0'>
        <div
          className='absolute top-0 left-1/2 rounded-full bg-[oklch(0.65_0.18_200)] shadow-[0_0_6px_oklch(0.65_0.18_200/60%)]'
          style={{ width: dot, height: dot, marginLeft: -dot / 2 }}
        />
      </div>

      {/* Screen reader only text */}
      <span className='sr-only'>Loading…</span>
    </div>
  )
}

export function LoadingState(props: LoadingStateProps) {
  const { t } = useTranslation()
  const size = props.size ?? 'md'

  if (props.inline) {
    return (
      <span className={cn('inline-flex items-center gap-2', props.className)}>
        <OrbitalSpinner size={size} />
        {props.message != null && (
          <span className='text-muted-foreground text-sm'>{props.message}</span>
        )}
      </span>
    )
  }

  return (
    <div
      className={cn(
        'flex min-h-[200px] flex-col items-center justify-center gap-3',
        props.className
      )}
    >
      <OrbitalSpinner size={size} />
      <p className='text-muted-foreground text-sm'>
        {props.message ?? t('Loading...')}
      </p>
    </div>
  )
}