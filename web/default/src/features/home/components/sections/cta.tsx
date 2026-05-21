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
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'
import { Button } from '@/components/ui/button'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()

  if (props.isAuthenticated) {
    return null
  }

  return (
    <section className='relative z-10 overflow-hidden px-4 py-24 md:py-28'>
      <AnimateInView className='mx-auto max-w-5xl' animation='scale-in'>
        <div className='tech-card rounded-[32px] px-6 py-10 md:px-10 md:py-14'>
          <div className='grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end'>
            <div className='max-w-3xl'>
              <p className='mb-3 text-xs font-medium tracking-[0.24em] text-slate-400 uppercase'>
                {t('即刻启动')}
              </p>
              <h2 className='max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl'>
                {t('将您的产品升级为企业级大模型平台')}
              </h2>
              <p className='mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:text-base'>
                {t('从统一模型网关起步，逐步扩展到治理、运营、定价与面向客户的平台能力。')}
              </p>
            </div>
            <div className='grid gap-3 sm:grid-cols-3 lg:w-[420px] lg:grid-cols-1'>
              <div className='rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm'>
                <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>{t('交付方式')}</div>
                <div className='mt-2 text-sm font-semibold text-slate-900'>{t('私有化部署或企业交付')}</div>
              </div>
              <div className='rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm'>
                <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>{t('商业模式')}</div>
                <div className='mt-2 text-sm font-semibold text-slate-900'>{t('配额、充值、定价就绪')}</div>
              </div>
              <div className='rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm'>
                <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>{t('使用体验')}</div>
                <div className='mt-2 text-sm font-semibold text-slate-900'>{t('企业控制台 + 面向客户的工作流')}</div>
              </div>
            </div>
          </div>

          <div className='mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-500'>
            <div className='rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm'>
              {t('兼容 OpenAI 接口')}
            </div>
            <div className='rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm'>
              {t('企业运营控制台')}
            </div>
            <div className='rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm'>
              {t('模型商业化能力')}
            </div>
          </div>

          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <Button
              className='group h-12 rounded-xl bg-blue-600 px-6 text-sm font-medium shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/30'
              render={<Link to='/sign-up' />}
            >
              {t('立即开始')}
              <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
            <Button
              variant='outline'
              className='h-12 rounded-xl border border-slate-200 bg-white px-6 text-sm text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950'
              render={<Link to='/pricing' />}
            >
              {t('查看定价')}
            </Button>
          </div>
        </div>
      </AnimateInView>
    </section>
  )
}
