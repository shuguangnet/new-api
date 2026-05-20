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
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function Ecosystem() {
  const { t } = useTranslation()

  const providers = ['OpenAI', 'Claude', 'Gemini', 'Qwen', 'DeepSeek', 'GLM', 'Mistral', 'Llama']

  return (
    <section className='relative z-10 px-4 py-24 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-10 text-center'>
          <p className='tech-gradient-text mb-3 text-xs font-medium tracking-[0.24em] uppercase'>
            {t('Model Ecosystem')}
          </p>
          <h2 className='text-3xl font-semibold tracking-tight text-white md:text-4xl'>
            {t('Connect the world’s major model ecosystems in one platform')}
          </h2>
        </AnimateInView>

        <AnimateInView className='tech-card rounded-[30px] p-6 md:p-8' animation='scale-in'>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
            {providers.map((item, index) => (
              <div
                key={item}
                className='enterprise-provider-chip rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-center'
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className='text-sm font-medium tracking-wide text-white/78'>{item}</div>
                <div className='mt-1 text-[11px] uppercase tracking-[0.18em] text-white/28'>
                  {t('Provider')}
                </div>
              </div>
            ))}
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
