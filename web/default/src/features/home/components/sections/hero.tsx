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
import { Link } from '@tanstack/react-router'
import { ArrowRight, BarChart3, Cpu, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 overflow-hidden px-4 pt-24 pb-18 md:px-6 md:pt-28 md:pb-24'>
      <div aria-hidden className='tech-grid pointer-events-none absolute inset-0 -z-10 opacity-60' />
      <div className='mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='relative z-10'>
          <div className='enterprise-badge'>
            <span className='enterprise-badge-dot' />
            <span className='text-xs font-semibold tracking-[0.16em]'>
              {t('企业级大模型平台底座')}
            </span>
          </div>

          <h1 className='mt-7 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl'>
            <span className='tech-gradient-text'>{t('为企业构建可运营的')}</span>
            <br />
            <span className='text-slate-950'>{t('大模型接入与商业化平台')}</span>
          </h1>

          <p className='mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg'>
            {t(
              '统一模型接入、渠道路由、配额治理、计费运营与平台监控，帮助团队从演示型系统升级为真正可交付、可上线、可持续运营的企业级 AI 平台。'
            )}
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600'>
            <div className='rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm'>
              {t('统一模型路由')}
            </div>
            <div className='rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm'>
              {t('企业级权限与治理')}
            </div>
            <div className='rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm'>
              {t('支持私有化部署')}
            </div>
          </div>

          <div className='mt-8 grid max-w-3xl gap-4 sm:grid-cols-3'>
            <div className='rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm'>
              <div className='text-[11px] tracking-[0.16em] text-slate-400'>
                {t('适用形态')}
              </div>
              <div className='mt-2 text-lg font-semibold text-slate-900'>
                {t('私有化 / 托管 / 企业交付')}
              </div>
            </div>
            <div className='rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm'>
              <div className='text-[11px] tracking-[0.16em] text-slate-400'>
                {t('核心能力')}
              </div>
              <div className='mt-2 text-lg font-semibold text-slate-900'>
                {t('网关、计费、治理一体化')}
              </div>
            </div>
            <div className='rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm'>
              <div className='text-[11px] tracking-[0.16em] text-slate-400'>
                {t('接入方式')}
              </div>
              <div className='mt-2 text-lg font-semibold text-slate-900'>
                {t('兼容 OpenAI API 接口')}
              </div>
            </div>
          </div>

          <div className='mt-10 flex flex-wrap items-center gap-4'>
            {props.isAuthenticated ? (
              <Button
                className='group h-12 rounded-xl bg-blue-600 px-6 text-sm font-medium text-white shadow-lg shadow-blue-600/15 transition-all duration-300 hover:bg-blue-500'
                render={<Link to='/dashboard' />}
              >
                {t('进入控制台')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
            ) : (
              <>
                <Button
                  className='group h-12 rounded-xl bg-blue-600 px-6 text-sm font-medium text-white shadow-lg shadow-blue-600/15 transition-all duration-300 hover:bg-blue-500'
                  render={<Link to='/sign-up' />}
                >
                  {t('立即开始部署')}
                  <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Button>
                <Button
                  variant='outline'
                  className='h-12 rounded-xl border border-slate-200 bg-white px-6 text-sm text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950'
                  render={<Link to='/pricing' />}
                >
                  {t('查看方案与定价')}
                </Button>
              </>
            )}
          </div>

          <div className='mt-12 enterprise-kpi-grid'>
            <div className='enterprise-kpi-card'>
              <div className='enterprise-kpi-label'>{t('模型生态')}</div>
              <div className='enterprise-kpi-value'>40+</div>
              <div className='enterprise-kpi-desc'>
                {t('统一接入主流模型厂商，减少多套 API 和多套鉴权的集成成本。')}
              </div>
            </div>
            <div className='enterprise-kpi-card'>
              <div className='enterprise-kpi-label'>{t('渠道能力')}</div>
              <div className='enterprise-kpi-value'>100+</div>
              <div className='enterprise-kpi-desc'>
                {t('按业务线、租户与成本目标灵活设计路由、配额和价格策略。')}
              </div>
            </div>
            <div className='enterprise-kpi-card'>
              <div className='enterprise-kpi-label'>{t('运维视角')}</div>
              <div className='enterprise-kpi-value'>24/7</div>
              <div className='enterprise-kpi-desc'>
                {t('从稳定性、调用成本到增长数据，形成统一的运营监控视图。')}
              </div>
            </div>
          </div>
        </div>

        <div className='relative z-10'>
          <div className='tech-card rounded-[30px] p-5 md:p-6'>
            <div className='enterprise-terminal-shell rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:p-6'>
              <div className='mb-5 flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                  <span className='size-2.5 rounded-full bg-[#ef4444]' />
                  <span className='size-2.5 rounded-full bg-[#f59e0b]' />
                  <span className='size-2.5 rounded-full bg-[#22c55e]' />
                  <span className='ml-2 text-xs tracking-wide text-slate-400'>企业平台总览</span>
                </div>
                <div className='rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-emerald-600'>
                  {t('系统运行正常')}
                </div>
              </div>

              <div className='mb-4 grid gap-3 md:grid-cols-3'>
                <div className='rounded-2xl border border-slate-200 bg-white px-4 py-3'>
                  <div className='text-[11px] tracking-[0.16em] text-slate-400'>{t('网关')}</div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>{t('多模型接入在线')}</div>
                </div>
                <div className='rounded-2xl border border-slate-200 bg-white px-4 py-3'>
                  <div className='text-[11px] tracking-[0.16em] text-slate-400'>{t('策略')}</div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>{t('配额与路由已生效')}</div>
                </div>
                <div className='rounded-2xl border border-slate-200 bg-white px-4 py-3'>
                  <div className='text-[11px] tracking-[0.16em] text-slate-400'>{t('分析')}</div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>{t('运营数据已可视化')}</div>
                </div>
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='enterprise-node-card'>
                  <div className='tech-icon-box mb-4'>
                    <Cpu className='size-4' strokeWidth={1.8} />
                  </div>
                  <div className='enterprise-node-label'>{t('模型接入')}</div>
                  <div className='enterprise-node-title'>{t('统一聚合多家模型能力')}</div>
                  <div className='enterprise-node-desc'>
                    {t('覆盖 OpenAI、Claude、Gemini、Qwen、GLM 等模型生态，保持统一接入标准。')}
                  </div>
                </div>
                <div className='enterprise-node-card'>
                  <div className='tech-icon-box mb-4'>
                    <ShieldCheck className='size-4' strokeWidth={1.8} />
                  </div>
                  <div className='enterprise-node-label'>{t('治理能力')}</div>
                  <div className='enterprise-node-title'>{t('权限、配额与租户隔离')}</div>
                  <div className='enterprise-node-desc'>
                    {t('满足企业在账号体系、计费控制、访问安全与分租户交付上的治理诉求。')}
                  </div>
                </div>
                <div className='enterprise-node-card'>
                  <div className='tech-icon-box mb-4'>
                    <BarChart3 className='size-4' strokeWidth={1.8} />
                  </div>
                  <div className='enterprise-node-label'>{t('运营分析')}</div>
                  <div className='enterprise-node-title'>{t('调用洞察与成本可观测')}</div>
                  <div className='enterprise-node-desc'>
                    {t('实时追踪请求趋势、模型表现、渠道质量与商业化效率。')}
                  </div>
                </div>
                <div className='enterprise-node-card'>
                  <div className='enterprise-node-label'>{t('开放接口')}</div>
                  <div className='enterprise-node-title'>{t('兼容 OpenAI 的网关出口')}</div>
                  <div className='enterprise-node-desc'>
                    {t('前端应用与业务系统保持稳定接入方式，后端平台可持续演进而不破坏集成。')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
