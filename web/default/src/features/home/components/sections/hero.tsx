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
import { HeroTerminalDemo } from '../hero-terminal-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 flex flex-col items-center overflow-hidden px-6 pt-28 pb-16 md:pt-36 md:pb-24'>
      {/* Layer 1: Deep dark gradient mesh background */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10'
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 15% 25%, rgba(59,130,246,0.25) 0%, transparent 70%)',
            'radial-gradient(ellipse 70% 50% at 75% 10%, rgba(139,92,246,0.2) 0%, transparent 70%)',
            'radial-gradient(ellipse 60% 45% at 50% 85%, rgba(124,58,237,0.15) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 90% 60%, rgba(99,102,241,0.12) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 30% at 10% 70%, rgba(168,85,247,0.1) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
      {/* Layer 2: Enhanced grid pattern */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.15)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black_20%,transparent_100%)] bg-[size:4rem_4rem] opacity-[0.15]'
      />

      {/* Layer 3: Particle-connection decoration */}
      <div aria-hidden className='pointer-events-none absolute inset-0 -z-[5]'>
        {/* Particle 1 */}
        <div className='absolute left-[15%] top-[20%] size-2 animate-pulse rounded-full bg-blue-400/40' />
        {/* Particle 2 */}
        <div className='absolute left-[55%] top-[12%] size-2 animate-pulse rounded-full bg-blue-400/40' style={{ animationDelay: '0.6s' }} />
        {/* Particle 3 */}
        <div className='absolute left-[80%] top-[35%] size-2 animate-pulse rounded-full bg-blue-400/40' style={{ animationDelay: '1.2s' }} />

        {/* Connection line: Particle 1 → Particle 2 */}
        <div
          className='absolute h-px bg-gradient-to-r from-blue-400/20 via-violet-400/15 to-transparent'
          style={{
            top: '21%',
            left: '15%',
            width: '40%',
            transform: 'rotate(-6deg)',
            transformOrigin: 'left center',
          }}
        />
        {/* Connection line: Particle 2 → Particle 3 */}
        <div
          className='absolute h-px bg-gradient-to-r from-violet-400/15 via-blue-400/20 to-transparent'
          style={{
            top: '14%',
            left: '55%',
            width: '25%',
            transform: 'rotate(18deg)',
            transformOrigin: 'left center',
          }}
        />
      </div>

      <div className='flex max-w-3xl flex-col items-center text-center'>
        <h1
          className='landing-animate-fade-up text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.15] font-bold tracking-tight drop-shadow-[0_0_30px_oklch(0.6_0.2_280/30%)]'
          style={{ animationDelay: '0ms' }}
        >
          {t('Unified API Gateway for')}
          <br />
          <span className='bg-gradient-to-r from-blue-400 via-violet-500 to-fuchsia-400 bg-clip-text text-transparent'>
            {t('All Your AI Models')}
          </span>
        </h1>

        <div
          className='landing-animate-fade-up mt-6 opacity-0'
          style={{ animationDelay: '80ms' }}
        >
          <div className='glass-panel inline-block rounded-xl px-6 py-4'>
            <p className='text-muted-foreground/80 max-w-lg text-base leading-relaxed md:text-lg'>
              {t('Power AI applications, manage digital assets, connect the Future')}
            </p>
          </div>
        </div>

        <div
          className='landing-animate-fade-up mt-8 flex items-center gap-4 opacity-0'
          style={{ animationDelay: '160ms' }}
        >
          {props.isAuthenticated ? (
            <Button
              className='glow-pulse group rounded-lg'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <>
              <Button
                className='glow-pulse group rounded-lg'
                render={<Link to='/sign-up' />}
              >
                {t('Get Started')}
                <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='gradient-border glass-panel border-border/50 hover:border-border hover:bg-muted/50 rounded-lg'
                render={<Link to='/pricing' />}
              >
                {t('View Pricing')}
              </Button>
            </>
          )}
        </div>
      </div>

      <div
        className='hover-lift glass-panel landing-animate-fade-up mt-12 w-full rounded-xl p-3 opacity-0'
        style={{ animationDelay: '300ms' }}
      >
        <HeroTerminalDemo />
      </div>
    </section>
  )
}