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
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, BarChart3, Cpu, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

function TechParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 10 }, () => ({
      left: `${4 + Math.random() * 92}%`,
      top: `${8 + Math.random() * 84}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 4}s`,
      '--tx': `${(Math.random() - 0.5) * 70}px`,
      '--ty': `${(Math.random() - 0.5) * 45}px`,
    })) as React.CSSProperties[]
  }, [])

  return (
    <>
      {particles.map((style, index) => (
        <div key={index} className='tech-particle' style={style} />
      ))}
    </>
  )
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 overflow-hidden px-4 pt-28 pb-20 md:px-6 md:pt-34 md:pb-26'>
      <div aria-hidden className='tech-grid pointer-events-none absolute inset-0 -z-10 opacity-70' />
      <div aria-hidden className='tech-scan-line' />
      <div aria-hidden className='tech-glow-orb tech-glow-orb-1 z-0' />
      <div aria-hidden className='tech-glow-orb tech-glow-orb-2 z-0' />
      <TechParticles />

      <div className='mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='relative z-10'>
          <div className='enterprise-badge'>
            <span className='enterprise-badge-dot' />
            <span className='text-xs font-medium tracking-[0.18em] uppercase'>
              {t('Enterprise AI Infrastructure')}
            </span>
          </div>

          <h1 className='mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl xl:text-7xl'>
            <span className='tech-gradient-text'>{t('Build your own')}</span>
            <br />
            <span className='text-white'>{t('Big Model Platform')}</span>
          </h1>

          <p className='mt-6 max-w-2xl text-base leading-8 text-white/46 md:text-lg'>
            {t('Create an enterprise-grade large model gateway with unified model access, channel routing, billing governance and operational analytics.')}
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-3 text-sm text-white/56'>
            <div className='rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5'>
              {t('Unified model routing')}
            </div>
            <div className='rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5'>
              {t('Enterprise-grade governance')}
            </div>
            <div className='rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5'>
              {t('Private deployment ready')}
            </div>
          </div>

          <div className='mt-8 grid max-w-3xl gap-4 sm:grid-cols-3'>
            <div className='rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4'>
              <div className='text-[11px] tracking-[0.18em] text-white/34 uppercase'>
                {t('Launch Scope')}
              </div>
              <div className='mt-2 text-lg font-semibold text-white'>
                {t('Self-hosted / SaaS / Enterprise')}
              </div>
            </div>
            <div className='rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4'>
              <div className='text-[11px] tracking-[0.18em] text-white/34 uppercase'>
                {t('Core Value')}
              </div>
              <div className='mt-2 text-lg font-semibold text-white'>
                {t('Gateway + Billing + Governance')}
              </div>
            </div>
            <div className='rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4'>
              <div className='text-[11px] tracking-[0.18em] text-white/34 uppercase'>
                {t('Delivery Mode')}
              </div>
              <div className='mt-2 text-lg font-semibold text-white'>
                {t('OpenAI-compatible API')}
              </div>
            </div>
          </div>

          <div className='mt-10 flex flex-wrap items-center gap-4'>
            {props.isAuthenticated ? (
              <Button
                className='group h-12 rounded-xl bg-blue-600 px-6 text-sm font-medium shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/30'
                render={<Link to='/dashboard' />}
              >
                {t('Go to Dashboard')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
            ) : (
              <>
                <Button
                  className='group h-12 rounded-xl bg-blue-600 px-6 text-sm font-medium shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/30'
                  render={<Link to='/sign-up' />}
                >
                  {t('Start Building')}
                  <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Button>
                <Button
                  variant='outline'
                  className='h-12 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm text-white/72 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
                  render={<Link to='/pricing' />}
                >
                  {t('Explore Pricing')}
                </Button>
              </>
            )}
          </div>

          <div className='mt-12 enterprise-kpi-grid'>
            <div className='enterprise-kpi-card'>
              <div className='enterprise-kpi-label'>{t('Providers')}</div>
              <div className='enterprise-kpi-value'>40+</div>
              <div className='enterprise-kpi-desc'>{t('Access major model ecosystems through one control plane.')}</div>
            </div>
            <div className='enterprise-kpi-card'>
              <div className='enterprise-kpi-label'>{t('Channels')}</div>
              <div className='enterprise-kpi-value'>100+</div>
              <div className='enterprise-kpi-desc'>{t('Design flexible routing and business-ready quota strategies.')}</div>
            </div>
            <div className='enterprise-kpi-card'>
              <div className='enterprise-kpi-label'>{t('Operations')}</div>
              <div className='enterprise-kpi-value'>24/7</div>
              <div className='enterprise-kpi-desc'>{t('Observe cost, stability and growth in one unified platform view.')}</div>
            </div>
          </div>
        </div>

        <div className='relative z-10'>
          <div className='tech-card rounded-[30px] p-5 md:p-6'>
            <div className='enterprise-terminal-shell rounded-[24px] border border-white/6 bg-[#060a12] p-5 md:p-6'>
              <div className='mb-5 flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                  <span className='size-2.5 rounded-full bg-[#ff5f57]' />
                  <span className='size-2.5 rounded-full bg-[#febc2e]' />
                  <span className='size-2.5 rounded-full bg-[#28c840]' />
                  <span className='ml-2 text-xs tracking-wide text-white/35'>enterprise-control-center</span>
                </div>
                <div className='rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.16em] text-emerald-300 uppercase'>
                  {t('system online')}
                </div>
              </div>

              <div className='mb-4 grid gap-3 md:grid-cols-3'>
                <div className='rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3'>
                  <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>{t('Gateway')}</div>
                  <div className='mt-2 text-sm font-semibold text-white'>{t('Multi-provider live')}</div>
                </div>
                <div className='rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3'>
                  <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>{t('Policies')}</div>
                  <div className='mt-2 text-sm font-semibold text-white'>{t('Quota & routing active')}</div>
                </div>
                <div className='rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3'>
                  <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>{t('Analytics')}</div>
                  <div className='mt-2 text-sm font-semibold text-white'>{t('Operational insights ready')}</div>
                </div>
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='enterprise-node-card'>
                  <div className='tech-icon-box mb-4'>
                    <Cpu className='size-4' strokeWidth={1.8} />
                  </div>
                  <div className='enterprise-node-label'>{t('Model Access')}</div>
                  <div className='enterprise-node-title'>{t('Multi-provider model aggregation')}</div>
                  <div className='enterprise-node-desc'>{t('OpenAI, Claude, Gemini, Qwen, GLM and other model ecosystems with a unified access layer.')}</div>
                </div>
                <div className='enterprise-node-card'>
                  <div className='tech-icon-box mb-4'>
                    <ShieldCheck className='size-4' strokeWidth={1.8} />
                  </div>
                  <div className='enterprise-node-label'>{t('Governance')}</div>
                  <div className='enterprise-node-title'>{t('Permission, quota and tenant isolation')}</div>
                  <div className='enterprise-node-desc'>{t('Meet enterprise operational needs for account management, billing control and secure API delivery.')}</div>
                </div>
                <div className='enterprise-node-card'>
                  <div className='tech-icon-box mb-4'>
                    <BarChart3 className='size-4' strokeWidth={1.8} />
                  </div>
                  <div className='enterprise-node-label'>{t('Analytics')}</div>
                  <div className='enterprise-node-title'>{t('Usage insights and cost observability')}</div>
                  <div className='enterprise-node-desc'>{t('Track request trends, provider performance and monetization efficiency in real time.')}</div>
                </div>
                <div className='enterprise-node-card'>
                  <div className='enterprise-node-label'>{t('Open Interface')}</div>
                  <div className='enterprise-node-title'>{t('OpenAI-compatible API gateway')}</div>
                  <div className='enterprise-node-desc'>{t('Keep application integration simple while your platform evolves behind the scenes.')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
