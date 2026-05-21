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
import { cn } from '@/lib/utils'
import { useStatus } from '@/hooks/use-status'
import { useSystemConfig } from '@/hooks/use-system-config'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type SystemBrandProps = {
  defaultName?: string
  defaultVersion?: string
  /**
   * Visual layout:
   * - 'sidebar': stacked card style (used inside the sidebar header).
   * - 'inline': compact horizontal pill (used inside the top app bar).
   */
  variant?: 'sidebar' | 'inline'
}

/**
 * System brand component
 * Displays current system logo + name.
 * - inline: compact pill in the top app bar; clicking navigates to home (/)
 * - sidebar: stacked card in the sidebar header (display only)
 */
export function SystemBrand(props: SystemBrandProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const { logo } = useSystemConfig()

  const variant = props.variant ?? 'sidebar'
  const name = status?.system_name || props.defaultName || 'New API'
  const version =
    status?.version || props.defaultVersion || t('Unknown version')

  if (variant === 'inline') {
    return (
      <Link
        to='/'
        aria-label={t('返回首页')}
        className={cn(
          'app-header-brand-link text-foreground inline-flex min-w-0 items-center gap-3 rounded-[1.45rem] border border-border/60 bg-white/92 px-3 py-2 shadow-[0_18px_36px_rgba(15,23,42,0.08)] transition-all outline-none select-none hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(15,23,42,0.1)] focus-visible:ring-ring/40 focus-visible:ring-2'
        )}
      >
        <div className='app-header-brand-mark'>
          <img
            src={logo}
            alt={t('Logo')}
            className='size-full rounded-[1.05rem] object-cover'
          />
        </div>
        <div className='hidden min-w-0 md:block'>
          <div className='text-muted-foreground text-[0.68rem] font-semibold tracking-[0.2em] uppercase'>
            {t('企业级 AI 平台')}
          </div>
          <div className='mt-0.5 flex min-w-0 items-center gap-2'>
            <span className='max-w-[11rem] truncate text-sm font-semibold tracking-tight'>
              {name}
            </span>
            <span className='rounded-full border border-border/60 bg-muted/50 px-2 py-0.5 text-[0.68rem] text-muted-foreground'>
              v{version}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='hover:text-sidebar-foreground active:text-sidebar-foreground cursor-default hover:bg-transparent active:bg-transparent'
          render={<div />}
        >
          <div className='flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg'>
            <img
              src={logo}
              alt={t('Logo')}
              className='size-full rounded-lg object-cover'
            />
          </div>
          <div className='grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden'>
            <span className='truncate font-semibold'>{name}</span>
            <span className='truncate text-xs'>{version}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
