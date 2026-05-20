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
import { useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

function Counter(props: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  const formatValue = useCallback(
    (value: number) =>
      props.decimals && props.decimals > 0
        ? value.toFixed(props.decimals)
        : Math.round(value).toLocaleString(),
    [props.decimals]
  )

  const animate = useCallback(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const start = performance.now()
    const duration = props.duration ?? 1600
    const prefix = props.prefix ?? ''
    const suffix = props.suffix ?? ''

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      element.textContent = `${prefix}${formatValue(eased * props.end)}${suffix}`
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [formatValue, props.duration, props.end, props.prefix, props.suffix])

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefix = props.prefix ?? ''
    const suffix = props.suffix ?? ''

    if (mediaQuery.matches) {
      element.textContent = `${prefix}${formatValue(props.end)}${suffix}`
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          animate()
          observer.unobserve(element)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [animate, formatValue, props.end, props.prefix, props.suffix])

  return (
    <span ref={ref} className='tabular-nums'>
      {props.prefix ?? ''}0{props.suffix ?? ''}
    </span>
  )
}

interface StatItem {
  end: number
  suffix: string
  label: string
  desc: string
  decimals?: number
}

export function Stats() {
  const { t } = useTranslation()

  const stats: StatItem[] = [
    {
      end: 50,
      suffix: '+',
      label: t('Integrated upstream services'),
      desc: t('Aggregate major LLM ecosystems into one stable enterprise access layer.'),
    },
    {
      end: 100,
      suffix: '+',
      label: t('Model billing support'),
      desc: t('Flexible pricing, recharge and customer monetization capabilities.'),
    },
    {
      end: 50,
      suffix: '+',
      label: t('Compatible API routes'),
      desc: t('Rapidly connect products through standardized developer-facing APIs.'),
    },
    {
      end: 10,
      suffix: '+',
      label: t('Scheduling controls'),
      desc: t('Fine-grained quota, policy and traffic orchestration for production usage.'),
    },
  ]

  return (
    <section className='relative z-10 px-4 py-8 md:py-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {stats.map((item) => (
            <div key={item.label} className='tech-card rounded-[24px] p-6'>
              <div className='enterprise-kpi-label'>{item.label}</div>
              <div className='mt-3 tech-stat text-3xl font-bold tracking-tight md:text-4xl'>
                <Counter end={item.end} suffix={item.suffix} decimals={item.decimals} />
              </div>
              <p className='mt-3 text-sm leading-7 text-white/45'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
