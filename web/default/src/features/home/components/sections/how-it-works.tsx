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
import { Settings, Zap, BarChart3 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      num: '1',
      title: t('配置接入'),
      desc: t('添加 API 密钥、设置渠道并配置访问权限'),
      icon: <Settings className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '2',
      title: t('建立连接'),
      desc: t('通过兼容 OpenAI 等接口格式的统一路由进行连接'),
      icon: <Zap className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '3',
      title: t('监控运营'),
      desc: t('通过实时分析追踪用量、成本与性能表现'),
      icon: <BarChart3 className='size-6' strokeWidth={1.5} />,
    },
  ]

  return (
    <section className='relative z-10 px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 text-center md:mb-20'>
          <p className='mb-3 text-xs font-medium tracking-[0.16em] text-slate-400'>
            {t('快速上手')}
          </p>
          <h2 className='text-2xl font-bold tracking-tight text-slate-950 md:text-3xl'>
            {t('三步即可启动')}
          </h2>
        </AnimateInView>

        <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
          {steps.map((step, i) => (
            <AnimateInView
              key={step.num}
              delay={i * 150}
              animation='fade-up'
              className='tech-card group relative flex flex-col items-center text-center p-6 rounded-2xl'
            >
              <div className='relative mb-6'>
                <div className='flex size-16 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-600 transition-all duration-300 group-hover:border-blue-300 group-hover:bg-blue-100 group-hover:shadow-md group-hover:shadow-blue-200/50'>
                  {step.icon}
                </div>
                <div className='flex size-8 items-center justify-center rounded-full bg-blue-600 shadow-md shadow-blue-300/40 text-white text-xs font-bold absolute -top-1 -right-1'>
                  {step.num}
                </div>
              </div>
              <h3 className='mb-2 text-base font-semibold text-slate-900'>{step.title}</h3>
              <p className='max-w-[240px] text-sm leading-relaxed text-slate-500'>
                {step.desc}
              </p>
              {i < steps.length - 1 && (
                <div className='hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-12 h-px bg-gradient-to-r from-blue-300/40 to-transparent' />
              )}
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
