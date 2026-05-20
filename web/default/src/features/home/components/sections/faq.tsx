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
      q: t('What kind of product is this platform suitable for?'),
      a: t('It is suitable for enterprise AI portals, SaaS products, internal AI platforms, API resale platforms and unified LLM operations systems.'),
    },
    {
      q: t('Can I manage multiple providers with different billing strategies?'),
      a: t('Yes. The platform supports multi-provider routing, different channels, model-level pricing and quota management for enterprise scenarios.'),
    },
    {
      q: t('Can it be deployed privately?'),
      a: t('Yes. You can deploy it in private cloud, dedicated servers or internal environments to create your own enterprise big model platform.'),
    },
  ]

  return (
    <section className='relative z-10 px-4 py-24 md:py-28'>
      <div className='mx-auto max-w-4xl'>
        <AnimateInView className='mb-10 text-center'>
          <p className='tech-gradient-text mb-3 text-xs font-medium tracking-[0.24em] uppercase'>
            {t('FAQ')}
          </p>
          <h2 className='text-3xl font-semibold tracking-tight text-white md:text-4xl'>
            {t('Frequently asked questions for enterprise deployment')}
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
                  <h3 className='text-base font-medium text-white'>{item.q}</h3>
                  <p className='mt-3 text-sm leading-7 text-white/45'>{item.a}</p>
                </div>
                <ChevronDown className='mt-1 size-4 shrink-0 text-white/28' />
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
