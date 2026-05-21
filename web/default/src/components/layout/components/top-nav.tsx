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
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type TopNavLink } from '../types'

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  links: TopNavLink[]
}

/**
 * 顶部导航栏组件
 * 在大屏幕显示水平导航，在小屏幕显示下拉菜单
 */
export function TopNav({ className, links, ...props }: TopNavProps) {
  const { t } = useTranslation()
  const normalizedLinks = useMemo(
    () =>
      links.map((link) => ({
        isActive: false,
        disabled: false,
        external: false,
        ...link,
      })),
    [links]
  )

  return (
    <>
      <div className='lg:hidden'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            render={
              <Button
                size='icon'
                variant='outline'
                className='size-9 rounded-xl border-border/70 bg-background shadow-xs'
                aria-label={t('Open navigation menu')}
              />
            }
          >
            <Menu className='size-4.5' />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side='bottom'
            align='start'
            className='min-w-56 rounded-2xl border-border/70 p-2'
          >
            {normalizedLinks.map(
              ({ title, href, isActive, disabled, external }) => (
                <DropdownMenuItem
                  key={`${title}-${href}`}
                  className='rounded-xl px-3 py-2'
                  render={
                    external ? (
                      <a
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={cn(
                          'flex w-full items-center text-sm font-medium',
                          !isActive && 'text-muted-foreground'
                        )}
                      >
                        {title}
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className={cn(
                          'flex w-full items-center text-sm font-medium',
                          !isActive && 'text-muted-foreground'
                        )}
                        disabled={disabled}
                      >
                        {title}
                      </Link>
                    )
                  }
                ></DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          'hidden min-w-0 items-center gap-1 rounded-2xl border border-border/70 bg-muted/25 p-1 lg:flex',
          className
        )}
        {...props}
      >
        {normalizedLinks.map(({ title, href, isActive, disabled, external }) => {
          const linkClassName = cn(
            'inline-flex h-10 items-center justify-center rounded-xl px-3.5 text-sm font-medium transition-all duration-200',
            isActive
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:bg-background/80 hover:text-foreground',
            disabled && 'pointer-events-none opacity-45'
          )

          if (external) {
            return (
              <a
                key={`${title}-${href}`}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={linkClassName}
              >
                {title}
              </a>
            )
          }

          return (
            <Link
              key={`${title}-${href}`}
              to={href}
              disabled={disabled}
              className={linkClassName}
            >
              {title}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
