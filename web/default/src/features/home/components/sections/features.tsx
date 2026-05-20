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
import { BarChart3, Code, DollarSign, Globe, Shield, Users, Workflow, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function Features() {
  const { t } = useTranslation()

  const features = [
    {
      icon: <Workflow className='size-5' strokeWidth={1.8} />,
      title: t('Enterprise model routing'),
      desc: t('Configure unified model mapping, traffic dispatch, multi-channel fallback and service continuity policies.'),
    },
    {
      icon: <DollarSign className='size-5' strokeWidth={1.8} />,
      title: t('Business-ready billing'),
      desc: t('Support account balance, usage metering, model pricing and customer-facing monetization strategies.'),
    },
    {
      icon: <Shield className='size-5' strokeWidth={1.8} />,
      title: t('Secure governance'),
      desc: t('Build permission boundaries, quota rules and operational controls for enterprise deployment.'),
    },
    {
      icon: <BarChart3 className='size-5' strokeWidth={1.8} />,
      title: t('Operational visibility'),
      desc: t('Track cost, usage, latency, trends and business growth through unified observability panels.'),
    },
    {
      icon: <Code className='size-5' strokeWidth={1.8} />,
      title: t('Developer compatibility'),
      desc: t('Stay compatible with mainstream application workflows through standardized API interfaces.'),
    },
    {
      icon: <Globe className='size-5' strokeWidth={1.8} />,
      title: t('Global delivery'),
      desc: t('Combine multiple provider channels to improve stability, resilience and region-level access performance.'),
    },
  ]

  const highlights = [
    {
      icon: <Zap className='size-4' strokeWidth={1.8} />,
      title: t('Fast integration'),
      desc: t('Reduce application migration cost with a single unified access layer.'),
    },
    {
      icon: <Users className='size-4' strokeWidth={1.8} />,
      title: t('Team collaboration'),
      desc: t('Support multiple users, customer accounts and enterprise operational workflows.'),
    },
  ]

  return (
    <section className='relative z-10 px-4 py-24 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-14 max-w-3xl'>
          <p className='mb-3 text-xs font-medium tracking-[0.24em] text-white/38 uppercase'>
            {t('Capabilities')}
          </p>
          <h2 className='text-3xl font-semibold tracking-tight text-white md:text-4xl'>
            {t('Everything you need to operate an enterprise AI model platform')}
          </h2>
          <p className='mt-4 text-sm leading-7 text-white/45 md:text-base'>
            {t('Transform a raw model gateway into a productized enterprise platform with operations, governance and growth capabilities.')}
          </p>
        </AnimateInView>

        <div className='grid gap-4 lg:grid-cols-[1.1fr_0.9fr]'>
          <div className='grid gap-4 md:grid-cols-2'>
            {features.map((item, index) => (
              <AnimateInView
                key={item.title}
                delay={index * 60}
                animation='fade-up'
                className='tech-card rounded-[26px] p-6'
              >
                <div className='tech-icon-box mb-5'>{item.icon}</div>
                <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
                <p className='mt-3 text-sm leading-7 text-white/45'>{item.desc}</p>
              </AnimateInView>
            ))}
          </div>

          <div className='grid gap-4'>
            <AnimateInView className='tech-card rounded-[28px] p-7 md:p-8' animation='fade-left'>
              <p className='enterprise-kpi-label'>{t('Platform Value')}</p>
              <h3 className='mt-3 text-2xl font-semibold tracking-tight text-white'>
                {t('From technical gateway to enterprise product capability')}
              </h3>
              <p className='mt-4 text-sm leading-7 text-white/45'>
                {t('The homepage now emphasizes enterprise scenarios, solution packaging and business value, making the product feel like a serious large-model platform instead of a generic admin panel.')}
              </p>

              <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                <div className='rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-4'>
                  <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>{t('Operators')}</div>
                  <div className='mt-2 text-sm font-semibold text-white'>{t('Model service providers')}</div>
                </div>
                <div className='rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-4'>
                  <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>{t('Scenarios')}</div>
                  <div className='mt-2 text-sm font-semibold text-white'>{t('B2B platform, internal AI hub, API service')}</div>
                </div>
              </div>

              <div className='mt-8 space-y-4'>
                {highlights.map((item) => (
                  <div key={item.title} className='rounded-2xl border border-white/6 bg-white/[0.02] p-4'>
                    <div className='flex items-center gap-3'>
                      <span className='tech-icon-box size-10'>{item.icon}</span>
                      <div>
                        <div className='text-sm font-medium text-white'>{item.title}</div>
                        <div className='mt-1 text-sm leading-6 text-white/45'>{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  )
}
