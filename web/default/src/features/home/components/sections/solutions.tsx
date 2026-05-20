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
import {
  BriefcaseBusiness,
  Building2,
  Cpu,
  Globe2,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function Solutions() {
  const { t } = useTranslation()

  const items = [
    {
      icon: <Cpu className='size-5' strokeWidth={1.8} />,
      title: t('Model Gateway'),
      desc: t('Unified routing across OpenAI, Claude, Gemini, Qwen and more with one platform entry.'),
      tag: t('Core infrastructure'),
    },
    {
      icon: <Workflow className='size-5' strokeWidth={1.8} />,
      title: t('Enterprise Orchestration'),
      desc: t('Centralized model distribution, channel governance and cost-aware traffic scheduling.'),
      tag: t('Operational control'),
    },
    {
      icon: <ShieldCheck className='size-5' strokeWidth={1.8} />,
      title: t('Security & Compliance'),
      desc: t('Permission control, quota policies, API isolation and operational governance for teams.'),
      tag: t('Risk governance'),
    },
    {
      icon: <Globe2 className='size-5' strokeWidth={1.8} />,
      title: t('Global Availability'),
      desc: t('Build a resilient large-model access layer with multi-provider fallback and stable delivery.'),
      tag: t('Service resilience'),
    },
    {
      icon: <BriefcaseBusiness className='size-5' strokeWidth={1.8} />,
      title: t('Business-ready Billing'),
      desc: t('Usage metering, recharge workflows, model-level pricing and customer account operations.'),
      tag: t('Commercialization'),
    },
    {
      icon: <Building2 className='size-5' strokeWidth={1.8} />,
      title: t('Private Deployment'),
      desc: t('Deploy your own enterprise-grade big model platform in internal or dedicated environments.'),
      tag: t('Enterprise delivery'),
    },
  ]

  return (
    <section className='relative z-10 px-4 py-24 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-14 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end'>
          <div className='max-w-3xl'>
            <p className='mb-3 text-xs font-medium tracking-[0.24em] text-white/38 uppercase'>
              {t('Platform Solutions')}
            </p>
            <h2 className='text-3xl font-semibold tracking-tight text-white md:text-4xl'>
              {t('Built for the next generation of enterprise AI infrastructure')}
            </h2>
            <p className='mt-4 max-w-2xl text-sm leading-7 text-white/45 md:text-base'>
              {t('From model access and governance to billing and team collaboration, create a unified platform experience for every large-model application scenario.')}
            </p>
          </div>
          <div className='rounded-[24px] border border-white/6 bg-white/[0.03] px-5 py-4 lg:w-[320px]'>
            <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>
              {t('Best fit')}
            </div>
            <div className='mt-2 text-sm font-semibold text-white'>
              {t('API service platform / internal AI hub / enterprise model marketplace')}
            </div>
          </div>
        </AnimateInView>

        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {items.map((item, index) => (
            <AnimateInView
              key={item.title}
              delay={index * 80}
              animation='fade-up'
              className='tech-card rounded-3xl p-6'
            >
              <div className='mb-4 inline-flex rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-white/42 uppercase'>
                {item.tag}
              </div>
              <div className='tech-icon-box mb-5'>{item.icon}</div>
              <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
              <p className='mt-3 text-sm leading-7 text-white/45'>{item.desc}</p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
