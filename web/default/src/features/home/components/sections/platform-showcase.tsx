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
    t('多厂商聚合'),
    t('统一认证与权限'),
    t('租户级用量控制'),
    t('实时监控与分析'),
    t('灵活的模型定价策略'),
    t('企业运营控制台'),
  ]

  const stages = [
    {
      label: t('阶段一'),
      title: t('集中管理模型接入'),
      desc: t('统一上游厂商、兼容层与端点语义，形成单一稳定的接入面。'),
    },
    {
      label: t('阶段二'),
      title: t('引入治理与变现'),
      desc: t('引入账号权限、租户配额控制、定价策略与商业工作流。'),
    },
    {
      label: t('阶段三'),
      title: t('以运营平台方式运行'),
      desc: t('从统一指挥层跟踪可靠性、消耗量、厂商健康度与业务指标。'),
    },
  ]

  return (
    <section className='relative z-10 px-4 py-24 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-3xl'>
            <p className='mb-3 text-xs font-medium tracking-[0.24em] text-slate-400 uppercase'>
              {t('平台架构')}
            </p>
            <h2 className='text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl'>
              {t('完整的大模型平台，而非又一层代理')}
            </h2>
          </div>
          <p className='max-w-2xl text-sm leading-7 text-slate-600 md:text-base'>
            {t('将产品构建为企业级平台，涵盖接入、治理、变现与运营，而不止于原始请求转发。')}
          </p>
        </AnimateInView>

        <div className='grid gap-8 lg:grid-cols-[1.02fr_0.98fr]'>
          <AnimateInView className='tech-card rounded-[30px] p-8 md:p-10' animation='fade-right'>
            <div className='grid gap-4 md:grid-cols-3'>
              {stages.map((item) => (
                <div key={item.label} className='rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm'>
                  <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
                    {item.label}
                  </div>
                  <div className='mt-2 text-base font-semibold text-slate-900'>{item.title}</div>
                  <div className='mt-2 text-sm leading-6 text-slate-600'>{item.desc}</div>
                </div>
              ))}
            </div>

            <div className='mt-8 grid gap-4 sm:grid-cols-2'>
              {capabilities.map((item) => (
                <div key={item} className='flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4'>
                  <CheckCircle2 className='mt-0.5 size-4 shrink-0 text-blue-600' strokeWidth={2.2} />
                  <span className='text-sm leading-6 text-slate-700'>{item}</span>
                </div>
              ))}
            </div>
          </AnimateInView>

          <AnimateInView className='tech-card rounded-[30px] p-6 md:p-8' animation='fade-left'>
            <div className='enterprise-terminal-shell h-full min-h-[460px] rounded-[24px] border border-slate-200 bg-slate-50 p-5'>
              <div className='mb-5 flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                  <span className='size-2.5 rounded-full bg-[#ef4444]' />
                  <span className='size-2.5 rounded-full bg-[#f59e0b]' />
                  <span className='size-2.5 rounded-full bg-[#22c55e]' />
                  <span className='ml-2 text-xs tracking-wide text-slate-400'>平台总览</span>
                </div>
                <div className='rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-emerald-600 uppercase'>
                  {t('企业模式')}
                </div>
              </div>

              <div className='mb-4 grid gap-3 md:grid-cols-3'>
                <div className='rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm'>
                  <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>{t('接入')}</div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>{t('兼容 OpenAI')}</div>
                </div>
                <div className='rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm'>
                  <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>{t('治理')}</div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>{t('配额 / 鉴权 / 计费')}</div>
                </div>
                <div className='rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm'>
                  <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>{t('运营')}</div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>{t('洞察 / 健康度 / 趋势')}</div>
                </div>
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='enterprise-node-card'>
                  <div className='enterprise-node-label'>{t('接入层')}</div>
                  <div className='enterprise-node-title'>{t('兼容 OpenAI 的 API')}</div>
                  <div className='enterprise-node-desc'>{t('统一承载模型、嵌入、图像与多模态工作负载。')}</div>
                </div>
                <div className='enterprise-node-card'>
                  <div className='enterprise-node-label'>{t('路由层')}</div>
                  <div className='enterprise-node-title'>{t('厂商与渠道调度')}</div>
                  <div className='enterprise-node-desc'>{t('灵活的模型映射、故障切换策略与配额调度。')}</div>
                </div>
                <div className='enterprise-node-card'>
                  <div className='enterprise-node-label'>{t('治理')}</div>
                  <div className='enterprise-node-title'>{t('权限、计费、配额')}</div>
                  <div className='enterprise-node-desc'>{t('为团队、租户与客户设计企业级管控体系。')}</div>
                </div>
                <div className='enterprise-node-card'>
                  <div className='enterprise-node-label'>{t('运营')}</div>
                  <div className='enterprise-node-title'>{t('可观测性与洞察')}</div>
                  <div className='enterprise-node-desc'>{t('在一处控制中心追踪成本、延迟、用量与业务增长。')}</div>
                </div>
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
