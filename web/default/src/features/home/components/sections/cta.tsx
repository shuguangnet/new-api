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
        <div className='tech-card rounded-[32px] px-6 py-10 text-center md:px-10 md:py-14'>
          <p className='tech-gradient-text mb-3 text-xs font-medium tracking-[0.24em] uppercase'>
            {t('Ready to Launch')}
          </p>
          <h2 className='mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl'>
            {t('Upgrade your product into an enterprise-ready Big Model Platform')}
          </h2>
          <p className='mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/45 md:text-base'>
            {t('Start with a unified model gateway, then extend into governance, operations, pricing and customer-facing platform capabilities.')}
          </p>

          <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
            <Button
              className='group h-12 rounded-xl bg-blue-600 px-6 text-sm font-medium shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/30'
              render={<Link to='/sign-up' />}
            >
              {t('Get Started')}
              <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
            <Button
              variant='outline'
              className='h-12 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm text-white/72 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
              render={<Link to='/pricing' />}
            >
              {t('View Pricing')}
            </Button>
          </div>
        </div>
      </AnimateInView>
    </section>
  )
}
