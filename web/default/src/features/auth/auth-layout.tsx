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
import { BarChart3, Building2, Cpu, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout(props: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='relative min-h-svh overflow-hidden bg-[#05070c]'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(37,99,235,0.14),transparent_30%),radial-gradient(circle_at_18%_24%,rgba(59,130,246,0.10),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(14,165,233,0.08),transparent_24%)]' />
      <div className='pointer-events-none absolute inset-0 opacity-[0.16]' style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

      <div className='relative z-10 grid min-h-svh grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='hidden lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-white/8 lg:px-12 lg:py-10'>
          <div className='space-y-8'>
            <Link to='/' className='inline-flex items-center gap-3 transition-opacity hover:opacity-85'>
              {loading ? (
                <Skeleton className='size-12 rounded-2xl' />
              ) : (
                <img src={logo} alt={t('Logo')} className='size-12 rounded-2xl border border-white/10 object-cover shadow-[0_0_28px_rgba(37,99,235,0.18)]' />
              )}
              <div>
                <div className='text-xs tracking-[0.22em] text-white/40 uppercase'>
                  {t('Enterprise AI Platform')}
                </div>
                {loading ? (
                  <Skeleton className='mt-2 h-7 w-36' />
                ) : (
                  <div className='mt-1 text-xl font-semibold text-white'>{systemName}</div>
                )}
              </div>
            </Link>

            <div className='max-w-xl'>
              <div className='enterprise-badge'>
                <span className='enterprise-badge-dot' />
                <span className='text-xs font-medium tracking-[0.18em] uppercase'>
                  {t('Secure Access Portal')}
                </span>
              </div>
              <h1 className='mt-8 text-5xl leading-[1.08] font-semibold tracking-tight text-white'>
                <span className='tech-gradient-text'>{t('Operate your')}</span>
                <br />
                <span>{t('Big Model Platform')}</span>
              </h1>
              <p className='mt-6 max-w-lg text-base leading-8 text-white/46'>
                {t('Access the enterprise console for model routing, quota governance, billing operations and production analytics.')}
              </p>
            </div>
          </div>

          <div className='grid gap-4 xl:grid-cols-2'>
            <div className='tech-card rounded-[24px] p-5'>
              <div className='tech-icon-box mb-4'>
                <Cpu className='size-4' strokeWidth={1.8} />
              </div>
              <div className='text-sm font-medium text-white'>{t('Unified model access')}</div>
              <div className='mt-2 text-sm leading-7 text-white/45'>
                {t('Aggregate multiple providers with one enterprise gateway and consistent integration surface.')}
              </div>
            </div>
            <div className='tech-card rounded-[24px] p-5'>
              <div className='tech-icon-box mb-4'>
                <ShieldCheck className='size-4' strokeWidth={1.8} />
              </div>
              <div className='text-sm font-medium text-white'>{t('Governance by design')}</div>
              <div className='mt-2 text-sm leading-7 text-white/45'>
                {t('Role-based permissions, key isolation and policy controls for secure enterprise operations.')}
              </div>
            </div>
            <div className='tech-card rounded-[24px] p-5'>
              <div className='tech-icon-box mb-4'>
                <BarChart3 className='size-4' strokeWidth={1.8} />
              </div>
              <div className='text-sm font-medium text-white'>{t('Operational analytics')}</div>
              <div className='mt-2 text-sm leading-7 text-white/45'>
                {t('Track usage, performance and commercial growth from a single operations center.')}
              </div>
            </div>
            <div className='tech-card rounded-[24px] p-5'>
              <div className='tech-icon-box mb-4'>
                <Building2 className='size-4' strokeWidth={1.8} />
              </div>
              <div className='text-sm font-medium text-white'>{t('Production-ready deployment')}</div>
              <div className='mt-2 text-sm leading-7 text-white/45'>
                {t('Support self-hosted and enterprise delivery scenarios with a platform-grade experience.')}
              </div>
            </div>
          </div>
        </div>

        <div className='flex min-h-svh flex-col'>
          <div className='flex items-center justify-between px-4 py-4 sm:px-6 lg:hidden'>
            <Link to='/' className='flex items-center gap-3 transition-opacity hover:opacity-85'>
              {loading ? (
                <Skeleton className='size-9 rounded-xl' />
              ) : (
                <img src={logo} alt={t('Logo')} className='size-9 rounded-xl border border-white/10 object-cover' />
              )}
              {loading ? (
                <Skeleton className='h-6 w-28' />
              ) : (
                <div className='text-base font-medium text-white'>{systemName}</div>
              )}
            </Link>
          </div>

          <div className='flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10'>
            <div className='w-full max-w-[520px]'>
              {props.children}
            </div>
          </div>

          <div className='px-4 pb-6 text-center text-xs text-white/28 sm:px-6'>
            © {new Date().getFullYear()} QuantumNous. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
