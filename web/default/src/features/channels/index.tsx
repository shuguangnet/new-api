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
import { Cable, Globe, ShieldCheck } from 'lucide-react'
import { SectionPageLayout } from '@/components/layout'
import { ChannelsDialogs } from './components/channels-dialogs'
import { ChannelsPrimaryButtons } from './components/channels-primary-buttons'
import { ChannelsProvider } from './components/channels-provider'
import { ChannelsTable } from './components/channels-table'

export function Channels() {
  const { t } = useTranslation()
  return (
    <ChannelsProvider>
      <SectionPageLayout>
        <SectionPageLayout.Title>{t('渠道管理')}</SectionPageLayout.Title>
        <SectionPageLayout.Description>
          {t('配置上游供应商接入通道，管理密钥、优先级与健康策略')}
        </SectionPageLayout.Description>
        <SectionPageLayout.Actions>
          <ChannelsPrimaryButtons />
        </SectionPageLayout.Actions>
        <SectionPageLayout.Content>
          {/* Enterprise workspace header */}
          <div className='relative mb-5 overflow-hidden rounded-[28px] border border-slate-200/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_42%,rgba(240,253,244,0.78)_100%)] px-5 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6'>
            <div
              className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/60 to-transparent'
              aria-hidden='true'
            />
            <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
              <div className='max-w-3xl space-y-3'>
                <div className='inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/85 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-emerald-700 uppercase'>
                  <span className='h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.35)]' />
                  {t('上游渠道管理中心')}
                </div>
                <h2 className='text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl'>
                  {t('供应商接入与路由配置')}
                </h2>
                <p className='text-sm leading-7 text-slate-600 sm:text-[15px]'>
                  {t('在此配置 OpenAI、Claude、Gemini 等上游 AI 供应商的接入通道，管理 API 密钥、优先级权重、模型映射、健康检测与故障转移策略。每条通道代表一条可被平台路由调用的供应商链路，其稳定性直接影响模型交付质量与成本效率。')}
                </p>
              </div>
              <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px]'>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <Cable className='size-3.5 text-emerald-600' aria-hidden='true' />
                    {t('接入供应商')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('40+ 上游支持')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('覆盖主流与长尾供应商')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <Globe className='size-3.5 text-emerald-600' aria-hidden='true' />
                    {t('通道策略')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('优先级 + 故障转移')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('智能路由保障服务连续性')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <ShieldCheck className='size-3.5 text-emerald-600' aria-hidden='true' />
                    {t('健康监测')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('自动探活 + 熔断')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('异常通道自动隔离恢复')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ChannelsTable />
        </SectionPageLayout.Content>
      </SectionPageLayout>

      <ChannelsDialogs />
    </ChannelsProvider>
  )
}
