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
import { useMemo } from 'react'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

function TechParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      left: `${5 + Math.random() * 90}%`,
      top: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      '--tx': `${(Math.random() - 0.5) * 60}px`,
      '--ty': `${(Math.random() - 0.5) * 40}px`,
    })) as React.CSSProperties[]
  }, [])
  return (
    <>
      {particles.map((style, i) => (
        <div key={i} className='tech-particle' style={style as React.CSSProperties} />
      ))}
    </>
  )
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 flex flex-col items-center overflow-hidden px-6 pt-28 pb-16 md:pt-36 md:pb-24'>
      {/* Deep dark tech background */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10'
        style={{
          background: 'linear-gradient(to bottom, #050508, #0a0a0f, #08080c)',
        }}
      />

      {/* Tech grid overlay */}
      <div aria-hidden className='tech-grid pointer-events-none absolute inset-0 -z-[8]' />

      {/* Scanning line */}
      <div aria-hidden className='tech-scan-line' />

      {/* Glow orbs */}
      <div aria-hidden className='tech-glow-orb tech-glow-orb-1 z-[0]' />
      <div aria-hidden className='tech-glow-orb tech-glow-orb-2 z-[0]' />

      {/* Floating particles */}
      <TechParticles />

      {/* Corner decorations */}
      <div aria-hidden className='tech-corner-decoration tech-corner-tl rounded-tl-lg' />
      <div aria-hidden className='tech-corner-decoration tech-corner-tr rounded-tr-lg' />
      <div aria-hidden className='tech-corner-decoration tech-corner-bl rounded-bl-lg' />
      <div aria-hidden className='tech-corner-decoration tech-corner-br rounded-br-lg' />

      {/* Data stream dots */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`d${i}`}
          className='tech-data-dot'
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 15}%`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className='relative z-10 flex max-w-4xl flex-col items-center gap-8 text-center'>
        {/* Tech badge */}
        <div className='tech-badge'>
          <span className='tech-badge-dot' />
          <span className='tracking-wide'>{t('AI-Powered API Gateway')}</span>
        </div>

        {/* Main heading — electric gradient */}
        <h1 className='tech-gradient-text text-5xl font-extrabold leading-tight tracking-tight md:text-7xl'>
          {t('Next-Gen AI Platform')}
        </h1>

        {/* Subtitle */}
        <p className='max-w-2xl text-lg text-white/40 md:text-xl'>
          {t('Unified gateway for 40+ AI providers. One API. Infinite possibilities.')}
        </p>

        {/* CTA buttons */}
        <div className='flex items-center gap-4'>
          {props.isAuthenticated ? (
            <Button
              className='group rounded-lg bg-blue-600 px-6 shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <>
              <Button
                className='group rounded-lg bg-blue-600 px-6 shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30'
                render={<Link to='/sign-up' />}
              >
                {t('Get Started')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='rounded-lg border border-white/10 bg-white/[0.03] px-6 text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80'
                render={<Link to='/pricing' />}
              >
                <svg className='mr-1.5 size-4' viewBox='0 0 24 24' fill='currentColor'><path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z'/></svg>
                {t('View on GitHub')}
              </Button>
            </>
          )}
        </div>

        {/* Stats bar */}
        <div className='mt-4 flex items-center gap-6 text-sm md:gap-10'>
          <div className='flex flex-col items-center gap-1'>
            <span className='tech-stat text-2xl font-bold tracking-tight'>40+</span>
            <span className='text-white/30'>Providers</span>
          </div>
          <div className='h-8 w-px bg-white/[0.06]' />
          <div className='flex flex-col items-center gap-1'>
            <span className='tech-stat text-2xl font-bold tracking-tight'>99.9%</span>
            <span className='text-white/30'>Uptime</span>
          </div>
          <div className='h-8 w-px bg-white/[0.06]' />
          <div className='flex flex-col items-center gap-1'>
            <span className='tech-stat text-2xl font-bold tracking-tight'>10M+</span>
            <span className='text-white/30'>Requests/Day</span>
          </div>
        </div>
      </div>
    </section>
  )
}
