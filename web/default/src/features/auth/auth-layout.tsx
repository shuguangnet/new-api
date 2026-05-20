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
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-svh">
      {/* Left - Brand showcase (hidden on mobile) */}
      <div className="hidden md:flex md:flex-col md:items-center md:justify-center relative overflow-hidden bg-gradient-to-br from-[oklch(0.13_0.04_270)] to-[oklch(0.15_0.05_300)]">
        {/* Decorative nebula elements */}
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-[oklch(0.4_0.15_280_/_10%)] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-[oklch(0.4_0.12_300_/_8%)] blur-3xl" />
        <div className="absolute top-1/3 left-1/2 size-48 rounded-full bg-[oklch(0.5_0.18_260_/_6%)] blur-2xl" />

        {/* Brand content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            {loading ? (
              <Skeleton className="size-20 rounded-full" />
            ) : (
              <img
                src={logo}
                alt={t('Logo')}
                className="size-20 rounded-full object-cover glow-pulse"
              />
            )}
          </Link>
          {loading ? (
            <Skeleton className="h-9 w-40" />
          ) : (
            <h1 className="text-3xl font-semibold gradient-text">
              {systemName}
            </h1>
          )}
          <p className="text-lg text-white/60">Connect to the Future of AI</p>
        </div>
      </div>

      {/* Right - Login form area */}
      <div className="flex flex-col bg-background">
        {/* Mobile-only logo & name */}
        <Link
          to="/"
          className="flex items-center gap-2 p-4 transition-opacity hover:opacity-80 sm:p-8 md:hidden"
        >
          <div className="relative h-8 w-8">
            {loading ? (
              <Skeleton className="absolute inset-0 rounded-full" />
            ) : (
              <img
                src={logo}
                alt={t('Logo')}
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
          </div>
          {loading ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <h1 className="text-xl font-medium">{systemName}</h1>
          )}
        </Link>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-2 px-4 py-8 sm:w-[480px] sm:p-8">
            {children}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="p-4 text-center text-xs text-muted-foreground sm:p-6">
          © {new Date().getFullYear()} QuantumNous. All rights reserved.
        </div>
      </div>
    </div>
  )
}