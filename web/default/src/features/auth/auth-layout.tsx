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
import {
  ArrowRight,
  BarChart3,
  Building2,
  Cpu,
  ShieldCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout(props: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  const platformStats = [
    {
      label: t('接入能力'),
      value: t('多模型统一接入网关'),
    },
    {
      label: t('治理能力'),
      value: t('额度 / 认证 / 计费一体化'),
    },
    {
      label: t('运营能力'),
      value: t('监控洞察 / 健康状态 / 数据分析'),
    },
  ]

  const featureCards = [
    {
      icon: <Cpu className='size-4' strokeWidth={1.8} />,
      title: t('统一模型接入'),
      desc: t('通过一个企业级网关聚合多个上游模型服务，统一接口、鉴权与调用规范。'),
    },
    {
      icon: <ShieldCheck className='size-4' strokeWidth={1.8} />,
      title: t('内建治理机制'),
      desc: t('支持角色权限、密钥隔离与策略控制，满足企业级安全与合规要求。'),
    },
    {
      icon: <BarChart3 className='size-4' strokeWidth={1.8} />,
      title: t('运营分析中枢'),
      desc: t('在统一工作台中追踪调用量、性能表现与业务增长趋势。'),
    },
    {
      icon: <Building2 className='size-4' strokeWidth={1.8} />,
      title: t('可交付部署'),
      desc: t('兼顾自部署与企业交付场景，让平台上线、运维与扩展更从容。'),
    },
  ]

  return (
    <div className='auth-shell'>
      <div className='auth-shell__grid' />
      <div className='auth-shell__glow auth-shell__glow--left' />
      <div className='auth-shell__glow auth-shell__glow--right' />

      <div className='relative z-10 grid min-h-svh grid-cols-1 lg:grid-cols-[1.06fr_0.94fr]'>
        <div className='hidden lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-slate-200/80 lg:px-12 lg:py-10'>
          <div className='space-y-8'>
            <Link to='/' className='inline-flex items-center gap-3 transition-opacity hover:opacity-85'>
              {loading ? (
                <Skeleton className='size-12 rounded-2xl' />
              ) : (
                <img
                  src={logo}
                  alt={t('Logo')}
                  className='size-12 rounded-2xl border border-slate-200 bg-white object-cover shadow-[0_18px_50px_rgba(15,23,42,0.08)]'
                />
              )}
              <div>
                <div className='text-xs tracking-[0.22em] text-slate-400 uppercase'>
                  {t('企业级大模型平台')}
                </div>
                {loading ? (
                  <Skeleton className='mt-2 h-7 w-36' />
                ) : (
                  <div className='mt-1 text-xl font-semibold text-slate-900'>
                    {systemName}
                  </div>
                )}
              </div>
            </Link>

            <div className='max-w-xl'>
              <div className='auth-badge'>
                <span className='auth-badge__dot' />
                <span className='text-xs font-medium tracking-[0.18em] uppercase'>
                  {t('平台安全接入门户')}
                </span>
              </div>
              <h1 className='mt-8 text-5xl leading-[1.04] font-semibold tracking-tight text-slate-900'>
                <span>{t('登录并进入')}</span>
                <br />
                <span className='auth-gradient-text'>{t('平台运营控制台')}</span>
              </h1>
              <p className='mt-6 max-w-lg text-base leading-8 text-slate-600'>
                {t('在统一企业工作台中管理模型路由、额度治理、计费运营、渠道交付与生产分析，让平台接入与商业化协同推进。')}
              </p>
            </div>

            <div className='grid gap-3 md:grid-cols-3'>
              {platformStats.map((item) => (
                <div key={item.label} className='auth-metric-card'>
                  <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
                    {item.label}
                  </div>
                  <div className='mt-2 text-sm font-semibold leading-6 text-slate-900'>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='grid gap-4 xl:grid-cols-2'>
            {featureCards.map((item) => (
              <div key={item.title} className='auth-feature-card rounded-[24px] p-5'>
                <div className='auth-feature-card__icon mb-4'>
                  {item.icon}
                </div>
                <div className='text-sm font-medium text-slate-900'>{item.title}</div>
                <div className='mt-2 text-sm leading-7 text-slate-600'>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex min-h-svh flex-col'>
          <div className='flex items-center justify-between px-4 py-4 sm:px-6 lg:hidden'>
            <Link to='/' className='flex items-center gap-3 transition-opacity hover:opacity-85'>
              {loading ? (
                <Skeleton className='size-9 rounded-xl' />
              ) : (
                <img
                  src={logo}
                  alt={t('Logo')}
                  className='size-9 rounded-xl border border-slate-200 bg-white object-cover'
                />
              )}
              {loading ? (
                <Skeleton className='h-6 w-28' />
              ) : (
                <div className='text-base font-medium text-slate-900'>{systemName}</div>
              )}
            </Link>
            <Link
              to='/'
              className='inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900'
            >
              {t('返回官网')}
              <ArrowRight className='size-3.5' />
            </Link>
          </div>

          <div className='flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10'>
            <div className='w-full max-w-[560px]'>
              {props.children}
            </div>
          </div>

          <div className='px-4 pb-6 text-center text-xs text-slate-400 sm:px-6'>
            © {new Date().getFullYear()} QuantumNous. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
