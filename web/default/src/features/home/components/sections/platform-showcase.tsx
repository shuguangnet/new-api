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
import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function PlatformShowcase() {
  const { t } = useTranslation()

  const capabilities = [
    t('Multi-provider aggregation'),
    t('Unified authentication and permissions'),
    t('Tenant-level usage control'),
    t('Real-time monitoring and analytics'),
    t('Flexible model pricing strategies'),
    t('Enterprise operations console'),
  ]

  return (
    <section className='relative z-10 px-4 py-24 md:py-28'>
      <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]'>
        <AnimateInView className='tech-card rounded-[28px] p-8 md:p-10' animation='fade-right'>
          <p className='tech-gradient-text mb-3 text-xs font-medium tracking-[0.24em] uppercase'>
            {t('Platform Architecture')}
          </p>
          <h2 className='text-3xl font-semibold tracking-tight text-white md:text-4xl'>
            {t('A complete Big Model Platform, not just another proxy layer')}
          </h2>
          <p className='mt-4 max-w-xl text-sm leading-7 text-white/45 md:text-base'>
            {t('Create a control plane for model access, routing, billing, operations and team collaboration. Deliver a productized experience for internal teams and external customers alike.')}
          </p>

          <div className='mt-8 grid gap-4 sm:grid-cols-2'>
            {capabilities.map((item) => (
              <div key={item} className='flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4'>
                <CheckCircle2 className='mt-0.5 size-4 shrink-0 text-blue-400' strokeWidth={2.2} />
                <span className='text-sm leading-6 text-white/68'>{item}</span>
              </div>
            ))}
          </div>
        </AnimateInView>

        <AnimateInView className='tech-card rounded-[28px] p-6 md:p-8' animation='fade-left'>
          <div className='enterprise-terminal-shell h-full min-h-[420px] rounded-[24px] border border-white/6 bg-[#080b12] p-5'>
            <div className='mb-5 flex items-center gap-2'>
              <span className='size-2.5 rounded-full bg-[#ff5f57]' />
              <span className='size-2.5 rounded-full bg-[#febc2e]' />
              <span className='size-2.5 rounded-full bg-[#28c840]' />
              <span className='ml-2 text-xs tracking-wide text-white/35'>platform.overview</span>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='enterprise-node-card'>
                <div className='enterprise-node-label'>{t('Access Layer')}</div>
                <div className='enterprise-node-title'>{t('OpenAI-compatible API')}</div>
                <div className='enterprise-node-desc'>{t('One endpoint for models, embeddings, images and multimodal workloads.')}</div>
              </div>
              <div className='enterprise-node-card'>
                <div className='enterprise-node-label'>{t('Routing Layer')}</div>
                <div className='enterprise-node-title'>{t('Provider & Channel Dispatch')}</div>
                <div className='enterprise-node-desc'>{t('Flexible model mapping, fallback policy and quota scheduling.')}</div>
              </div>
              <div className='enterprise-node-card'>
                <div className='enterprise-node-label'>{t('Governance')}</div>
                <div className='enterprise-node-title'>{t('Permissions, Billing, Quotas')}</div>
                <div className='enterprise-node-desc'>{t('Design enterprise-ready controls for teams, tenants and customers.')}</div>
              </div>
              <div className='enterprise-node-card'>
                <div className='enterprise-node-label'>{t('Operations')}</div>
                <div className='enterprise-node-title'>{t('Observability & Insights')}</div>
                <div className='enterprise-node-desc'>{t('Track cost, latency, usage and business growth in one control center.')}</div>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
