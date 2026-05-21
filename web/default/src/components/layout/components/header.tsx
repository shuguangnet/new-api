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
import { cn } from '@/lib/utils'
import { SidebarTrigger } from '@/components/ui/sidebar'

type HeaderProps = React.HTMLAttributes<HTMLElement>

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 h-[var(--app-header-height,4.75rem)] w-full shrink-0 border-b border-border/70 bg-background/96 shadow-[0_14px_36px_rgba(15,23,42,0.06)] backdrop-blur supports-[backdrop-filter]:bg-background/80',
        className
      )}
      {...props}
    >
      <div className='mx-auto flex h-full max-w-[1600px] items-center gap-3 px-3 sm:gap-4 sm:px-4 lg:px-6'>
        <SidebarTrigger variant='ghost' className='size-9 rounded-xl border border-border/70 bg-background shadow-xs hover:bg-accent/60' />
        {children}
      </div>
    </header>
  )
}
