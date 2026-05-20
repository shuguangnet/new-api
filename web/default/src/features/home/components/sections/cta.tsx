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
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'

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
    <section className='relative z-10 overflow-hidden py-24 px-4'>
      {/* Dark tech glow background */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10'
        style={{
          background: [
            'radial-gradient(ellipse 50% 50% at 30% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 40% at 70% 40%, rgba(6,182,212,0.04) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      <AnimateInView
        className='tech-card group mx-auto max-w-2xl text-center p-8 md:p-12 rounded-2xl'
        animation='scale-in'
      >
        <h2 className='tech-gradient-text text-2xl leading-tight font-bold tracking-tight md:text-4xl'>
          {t('Ready to simplify')}
          <br />
          <span>
            {t('your AI integration?')}
          </span>
        </h2>
        <p className='text-muted-foreground/80 mx-auto mt-5 max-w-md text-sm leading-relaxed md:text-base'>
          {t(
            'Deploy your own gateway and start routing requests through your configured upstream services.'
          )}
        </p>
        <div className='mt-8 flex items-center justify-center gap-3'>
          <Button
            className='group rounded-lg bg-blue-600 px-6 shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30'
            render={<Link to='/sign-up' />}
          >
            {t('Get Started')}
            <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
          </Button>
          <Button
            variant='outline'
            className='rounded-lg border border-white/10 bg-white/[0.02] px-6 text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/80'
            render={<Link to='/pricing' />}
          >
            {t('View Pricing')}
          </Button>
        </div>
      </AnimateInView>
    </section>
  )
}
