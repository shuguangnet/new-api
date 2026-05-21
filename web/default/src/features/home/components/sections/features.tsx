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
      title: t('企业级模型路由'),
      desc: t('统一模型映射、流量分发、多渠道故障切换与服务连续性策略的一体化配置。'),
    },
    {
      icon: <DollarSign className='size-5' strokeWidth={1.8} />,
      title: t('业务化计费系统'),
      desc: t('支持账户余额、用量计量、模型定价与面向客户的商业化变现策略。'),
    },
    {
      icon: <Shield className='size-5' strokeWidth={1.8} />,
      title: t('安全治理能力'),
      desc: t('构建权限边界、配额规则与运营管控体系，满足企业级部署要求。'),
    },
    {
      icon: <BarChart3 className='size-5' strokeWidth={1.8} />,
      title: t('运营可观测性'),
      desc: t('通过统一的可视化面板追踪成本、用量、延迟、趋势与业务增长指标。'),
    },
    {
      icon: <Code className='size-5' strokeWidth={1.8} />,
      title: t('开发者兼容性'),
      desc: t('通过标准化 API 接口与主流应用开发工作流保持兼容。'),
    },
    {
      icon: <Globe className='size-5' strokeWidth={1.8} />,
      title: t('全球化交付'),
      desc: t('组合多个厂商渠道，提升稳定性、容灾能力与区域级访问性能。'),
    },
  ]

  const highlights = [
    {
      icon: <Zap className='size-4' strokeWidth={1.8} />,
      title: t('快速接入'),
      desc: t('通过统一接入层降低应用迁移成本。'),
    },
    {
      icon: <Users className='size-4' strokeWidth={1.8} />,
      title: t('团队协作'),
      desc: t('支持多用户、多客户账号与企业运营流程。'),
    },
  ]

  return (
    <section className='relative z-10 px-4 py-24 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-14 max-w-3xl'>
          <p className='mb-3 text-xs font-medium tracking-[0.16em] text-slate-400'>
            {t('平台能力')}
          </p>
          <h2 className='text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl'>
            {t('构建企业级 AI 模型平台所需的全部能力')}
          </h2>
          <p className='mt-4 text-sm leading-7 text-slate-500 md:text-base'>
            {t('将原始模型网关升级为具备运营、治理和增长能力的产品化企业平台。')}
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
                <h3 className='text-lg font-semibold text-slate-900'>{item.title}</h3>
                <p className='mt-3 text-sm leading-7 text-slate-500'>{item.desc}</p>
              </AnimateInView>
            ))}
          </div>

          <div className='grid gap-4'>
            <AnimateInView className='tech-card rounded-[28px] p-7 md:p-8' animation='fade-left'>
              <p className='enterprise-kpi-label'>{t('平台价值')}</p>
              <h3 className='mt-3 text-2xl font-semibold tracking-tight text-slate-950'>
                {t('从技术网关到企业产品能力')}
              </h3>
              <p className='mt-4 text-sm leading-7 text-slate-500'>
                {t('首页现在突出企业场景、方案包装与商业价值表达，使产品看起来更像严肃的大模型平台而非普通管理面板。')}
              </p>

              <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                <div className='rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-4'>
                  <div className='text-[11px] tracking-[0.14em] text-slate-400'>{t('运营者')}</div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>{t('模型服务提供商')}</div>
                </div>
                <div className='rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-4'>
                  <div className='text-[11px] tracking-[0.14em] text-slate-400'>{t('场景')}</div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>{t('B2B 平台、内部 AI 中枢、API 服务')}</div>
                </div>
              </div>

              <div className='mt-8 space-y-4'>
                {highlights.map((item) => (
                  <div key={item.title} className='rounded-2xl border border-slate-200 bg-slate-50/50 p-4'>
                    <div className='flex items-center gap-3'>
                      <span className='tech-icon-box size-10'>{item.icon}</span>
                      <div>
                        <div className='text-sm font-medium text-slate-900'>{item.title}</div>
                        <div className='mt-1 text-sm leading-6 text-slate-500'>{item.desc}</div>
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
