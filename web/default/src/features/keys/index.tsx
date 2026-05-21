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
import { KeyRound, ShieldCheck, Users } from 'lucide-react'
import { SectionPageLayout } from '@/components/layout'
import { ApiKeysDialogs } from './components/api-keys-dialogs'
import { ApiKeysPrimaryButtons } from './components/api-keys-primary-buttons'
import { ApiKeysProvider } from './components/api-keys-provider'
import { ApiKeysTable } from './components/api-keys-table'

export function ApiKeys() {
  const { t } = useTranslation()
  return (
    <ApiKeysProvider>
      <SectionPageLayout>
        <SectionPageLayout.Title>{t('密钥管理')}</SectionPageLayout.Title>
        <SectionPageLayout.Description>
          {t('创建与维护 API 访问密钥，设置配额、分组与安全策略')}
        </SectionPageLayout.Description>
        <SectionPageLayout.Actions>
          <ApiKeysPrimaryButtons />
        </SectionPageLayout.Actions>
        <SectionPageLayout.Content>
          {/* Enterprise workspace header */}
          <div className='relative mb-5 overflow-hidden rounded-[28px] border border-slate-200/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_42%,rgba(239,246,255,0.78)_100%)] px-5 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6'>
            <div
              className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
              aria-hidden='true'
            />
            <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
              <div className='max-w-3xl space-y-3'>
                <div className='inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/85 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-sky-700 uppercase'>
                  <span className='h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.35)]' />
                  {t('API 密钥管理中心')}
                </div>
                <h2 className='text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl'>
                  {t('访问凭证与安全分发')}
                </h2>
                <p className='text-sm leading-7 text-slate-600 sm:text-[15px]'>
                  {t('在此创建和管理 API 密钥（sk- 开头），作为外部应用、SDK 与平台客户端接入的统一凭证。每条密钥可配置调用配额、模型分组、IP 白名单、过期策略与调用频控，保障平台 API 的安全、合规与精细化运营。')}
                </p>
              </div>
              <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px]'>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <KeyRound className='size-3.5 text-sky-600' aria-hidden='true' />
                    {t('密钥格式')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('sk- 统一前缀')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('兼容 OpenAI SDK 生态')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <ShieldCheck className='size-3.5 text-sky-600' aria-hidden='true' />
                    {t('安全管控')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('IP 白名单 + 频控')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('精细化访问防护策略')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <Users className='size-3.5 text-sky-600' aria-hidden='true' />
                    {t('配额分组')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('按组分配额度')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('多租户运营与成本隔离')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ApiKeysTable />
        </SectionPageLayout.Content>
      </SectionPageLayout>

      <ApiKeysDialogs />
    </ApiKeysProvider>
  )
}
