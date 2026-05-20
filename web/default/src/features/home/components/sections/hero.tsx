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

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 flex flex-col items-center overflow-hidden px-6 pt-28 pb-16 md:pt-36 md:pb-24'>
      {/* Background: deep dark gradient */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10'
        style={{
          background:
            'linear-gradient(to bottom, oklch(0.12 0.02 280), oklch(0.08 0.01 260), oklch(0.06 0.005 240))',
        }}
      />

      {/* Background: fine grid mesh */}
      <div aria-hidden className='hero-mesh pointer-events-none absolute inset-0 -z-[9]' />

      {/* Background: upper-right blurred orb */}
      <div
        aria-hidden
        className='pointer-events-none absolute -right-32 -top-32 -z-[8] h-[600px] w-[600px] rounded-full blur-[120px]'
        style={{ background: 'oklch(0.5 0.2 280 / 5%)' }}
      />

      {/* Background: lower-left blurred orb */}
      <div
        aria-hidden
        className='pointer-events-none absolute -bottom-40 -left-40 -z-[8] h-[500px] w-[500px] rounded-full blur-[120px]'
        style={{ background: 'oklch(0.4 0.15 200 / 4%)' }}
      />

      {/* Content container */}
      <div className='flex max-w-4xl flex-col items-center gap-8 text-center'>
        {/* Badge */}
        <div className='badge-glow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/60'>
          <span className='inline-block size-2 rounded-full bg-violet-400 animate-pulse-soft' />
          {t('AI-Powered API Gateway')}
        </div>

        {/* Main heading */}
        <h1 className='gradient-text text-5xl font-extrabold leading-tight tracking-tight md:text-7xl'>
          {t('Next-Gen AI Platform')}
        </h1>

        {/* Subtitle */}
        <p className='text-xl text-white/50 max-w-2xl'>
          {t('Unified gateway for 40+ AI providers. One API. Infinite possibilities.')}
        </p>

        {/* CTA buttons */}
        <div className='flex items-center gap-4'>
          {props.isAuthenticated ? (
            <Button
              className='btn-shine group rounded-lg px-6'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <>
              <Button
                className='btn-shine group rounded-lg px-6'
                render={<Link to='/sign-up' />}
              >
                {t('Get Started')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='gradient-border glass-panel border-border/50 hover:border-border hover:bg-muted/50 rounded-lg px-6'
                render={<Link to='/pricing' />}
              >
                <svg className='mr-1.5 size-4' viewBox='0 0 24 24' fill='currentColor'><path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z'/></svg>
                {t('View on GitHub')}
              </Button>
            </>
          )}
        </div>

        {/* Stats bar */}
        <div className='mt-4 flex items-center gap-6 text-sm text-white/40 md:gap-10'>
          <div className='flex flex-col items-center gap-1'>
            <span className='stat-glow text-2xl font-bold text-white/80'>40+</span>
            <span>Providers</span>
          </div>
          <div className='h-8 w-px bg-white/10' />
          <div className='flex flex-col items-center gap-1'>
            <span className='stat-glow text-2xl font-bold text-white/80'>99.9%</span>
            <span>Uptime</span>
          </div>
          <div className='h-8 w-px bg-white/10' />
          <div className='flex flex-col items-center gap-1'>
            <span className='stat-glow text-2xl font-bold text-white/80'>10M+</span>
            <span>Requests/Day</span>
          </div>
        </div>
      </div>
    </section>
  )
}