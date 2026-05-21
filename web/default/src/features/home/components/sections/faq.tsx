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
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function Faq() {
  const { t } = useTranslation()

  const items = [
    {
      q: t('本平台适合什么产品形态？'),
      a: t('适用于企业 AI 门户、SaaS 产品、内部 AI 平台、API 转售平台及统一大模型运营系统。'),
    },
    {
      q: t('是否能同时管理多个厂商并采用不同计费策略？'),
      a: t('可以。平台支持多厂商路由、多渠道、模型级定价与配额管理，适合企业级场景。'),
    },
    {
      q: t('支持私有化部署吗？'),
      a: t('支持。可部署在私有云、专有服务器或内网环境，打造自有企业级大模型平台。'),
    },
  ]

  return (
    <section className='relative z-10 px-4 py-24 md:py-28'>
      <div className='mx-auto max-w-4xl'>
        <AnimateInView className='mb-10 text-center'>
          <p className='mb-3 text-xs font-medium tracking-[0.24em] text-slate-400 uppercase'>
            {t('常见问题')}
          </p>
          <h2 className='text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl'>
            {t('企业部署常见问题')}
          </h2>
        </AnimateInView>

        <div className='space-y-4'>
          {items.map((item, index) => (
            <AnimateInView
              key={item.q}
              delay={index * 80}
              animation='fade-up'
              className='tech-card rounded-3xl px-5 py-5 md:px-6'
            >
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <h3 className='text-base font-medium text-slate-900'>{item.q}</h3>
                  <p className='mt-3 text-sm leading-7 text-slate-600'>{item.a}</p>
                </div>
                <ChevronDown className='mt-1 size-4 shrink-0 text-slate-300' />
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
