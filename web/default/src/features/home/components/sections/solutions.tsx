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
import {
  BriefcaseBusiness,
  Building2,
  Cpu,
  Globe2,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function Solutions() {
  const { t } = useTranslation()

  const items = [
    {
      icon: <Cpu className='size-5' strokeWidth={1.8} />,
      title: t('模型网关'),
      desc: t('统一接入 OpenAI、Claude、Gemini、Qwen 等主流模型，一个平台入口覆盖全部。'),
      tag: t('核心基础设施'),
    },
    {
      icon: <Workflow className='size-5' strokeWidth={1.8} />,
      title: t('企业级编排'),
      desc: t('集中式模型分发、渠道路由治理与成本敏感的流量调度。'),
      tag: t('运营管控'),
    },
    {
      icon: <ShieldCheck className='size-5' strokeWidth={1.8} />,
      title: t('安全合规'),
      desc: t('权限控制、配额策略、API 隔离与团队级运营治理。'),
      tag: t('风险治理'),
    },
    {
      icon: <Globe2 className='size-5' strokeWidth={1.8} />,
      title: t('全域可用'),
      desc: t('多厂商故障切换与稳定交付，构建高可用大模型接入层。'),
      tag: t('服务韧性'),
    },
    {
      icon: <BriefcaseBusiness className='size-5' strokeWidth={1.8} />,
      title: t('商业计费就绪'),
      desc: t('用量计量、充值流程、模型级定价与客户账户运营一体化。'),
      tag: t('商业化'),
    },
    {
      icon: <Building2 className='size-5' strokeWidth={1.8} />,
      title: t('私有化部署'),
      desc: t('在内网或专有环境中部署自有企业级大模型平台。'),
      tag: t('企业交付'),
    },
  ]

  return (
    <section className='relative z-10 px-4 py-24 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-14 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end'>
          <div className='max-w-3xl'>
            <p className='mb-3 text-xs font-medium tracking-[0.24em] text-slate-400 uppercase'>
              {t('平台解决方案')}
            </p>
            <h2 className='text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl'>
              {t('为下一代企业级 AI 基础设施而构建')}
            </h2>
            <p className='mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base'>
              {t('从模型接入、治理管控到计费运营与团队协作，为每一个大模型应用场景打造统一的平台体验。')}
            </p>
          </div>
          <div className='rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-sm lg:w-[320px]'>
            <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
              {t('适用场景')}
            </div>
            <div className='mt-2 text-sm font-semibold text-slate-900'>
              {t('API 服务平台 / 内部 AI 中台 / 企业模型市场')}
            </div>
          </div>
        </AnimateInView>

        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {items.map((item, index) => (
            <AnimateInView
              key={item.title}
              delay={index * 80}
              animation='fade-up'
              className='tech-card rounded-3xl p-6'
            >
              <div className='mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-blue-600 uppercase'>
                {item.tag}
              </div>
              <div className='tech-icon-box mb-5'>{item.icon}</div>
              <h3 className='text-lg font-semibold text-slate-900'>{item.title}</h3>
              <p className='mt-3 text-sm leading-7 text-slate-600'>{item.desc}</p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
