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
import { memo } from 'react'
import { ChevronRight, Copy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { StatusBadge } from '@/components/status-badge'
import { DEFAULT_TOKEN_UNIT } from '../constants'
import {
  getDynamicDisplayGroupRatio,
  getDynamicPricingSummary,
} from '../lib/dynamic-price'
import { parseTags } from '../lib/filters'
import { isTokenBasedModel } from '../lib/model-helpers'
import { formatPrice, formatRequestPrice } from '../lib/price'
import type { PricingModel, TokenUnit } from '../types'
import { ModelPerfBadge, type ModelPerfBadgeData } from './model-perf-badge'

export interface ModelCardProps {
  model: PricingModel
  onClick: () => void
  priceRate?: number
  usdExchangeRate?: number
  tokenUnit?: TokenUnit
  showRechargePrice?: boolean
  perf?: ModelPerfBadgeData
}

export const ModelCard = memo(function ModelCard(props: ModelCardProps) {
  const { t } = useTranslation()
  const { copyToClipboard } = useCopyToClipboard()
  const tokenUnit = props.tokenUnit ?? DEFAULT_TOKEN_UNIT
  const priceRate = props.priceRate ?? 1
  const usdExchangeRate = props.usdExchangeRate ?? 1
  const showRechargePrice = props.showRechargePrice ?? false
  const isTokenBased = isTokenBasedModel(props.model)
  const tokenUnitLabel = tokenUnit === 'K' ? '1K' : '1M'
  const tags = parseTags(props.model.tags)
  const groups = props.model.enable_groups || []
  const endpoints = props.model.supported_endpoint_types || []
  const vendorIcon = props.model.vendor_icon
    ? getLobeIcon(props.model.vendor_icon, 28)
    : null
  const initial = props.model.model_name?.charAt(0).toUpperCase() || '?'
  const isDynamicPricing =
    props.model.billing_mode === 'tiered_expr' &&
    Boolean(props.model.billing_expr)
  const hasCachedPrice = isTokenBased && props.model.cache_ratio != null
  const dynamicSummary = isDynamicPricing
    ? getDynamicPricingSummary(props.model, {
        tokenUnit,
        showRechargePrice,
        priceRate,
        usdExchangeRate,
        groupRatioMultiplier: getDynamicDisplayGroupRatio(props.model),
      })
    : null

  const primaryGroup = groups[0]
  const bottomTags = [...endpoints.slice(0, 2), ...tags.slice(0, 2)]
  const hiddenCount =
    Math.max(groups.length - 1, 0) +
    Math.max(endpoints.length - 2, 0) +
    Math.max(tags.length - 2, 0)
  const summaryText = isDynamicPricing
    ? t('支持阶梯或表达式计费，适合做更灵活的商业封装。')
    : isTokenBased
      ? t('适合需要精细成本控制、统一 Token 口径与多层套餐设计的场景。')
      : t('适合请求式调用、轻量接入与快速上线的标准化交付场景。')

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    copyToClipboard(props.model.model_name || '')
  }

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/95 p-4 shadow-[0_24px_72px_rgba(148,163,184,0.14)] transition-all duration-200 sm:p-5',
        'hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_28px_80px_rgba(148,163,184,0.22)]'
      )}
    >
      <div className='pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-slate-50 via-white/80 to-transparent' />
      {/* Header: icon + name + price + actions */}
      <div className='relative flex items-start justify-between gap-2.5 sm:gap-3'>
        <div className='flex min-w-0 items-start gap-2.5 sm:gap-3'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 sm:size-11'>
            {vendorIcon || (
              <span className='text-sm font-bold text-slate-600'>
                {initial}
              </span>
            )}
          </div>
          <div className='min-w-0'>
            <div className='mb-2 flex flex-wrap items-center gap-2'>
              {primaryGroup && (
                <span className='rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600'>
                  {primaryGroup}
                </span>
              )}
              <span className='rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500'>
                {isTokenBased ? t('Token 计费') : t('按次计费')}
              </span>
            </div>
            <h3 className='truncate text-[15px] leading-tight font-bold text-slate-950'>
              {props.model.model_name}
            </h3>
            <p className='mt-1 text-xs leading-6 text-slate-500'>
              {summaryText}
            </p>
            <div className='mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs sm:gap-x-3'>
              {dynamicSummary ? (
                dynamicSummary.isSpecialExpression ? (
                  <span className='min-w-0'>
                    <span className='text-amber-700 dark:text-amber-300'>
                      {t('Special billing expression')}
                    </span>
                    <code className='mt-0.5 block line-clamp-1 break-all font-mono text-[11px] text-slate-500'>
                      {dynamicSummary.rawExpression}
                    </code>
                  </span>
                ) : dynamicSummary.primaryEntries.length > 0 ? (
                  <>
                    {dynamicSummary.primaryEntries.map((entry) => (
                      <span
                        key={entry.key}
                        className='whitespace-nowrap text-slate-500'
                      >
                        {t(entry.shortLabel)}{' '}
                        <span className='font-mono font-semibold text-slate-950'>
                          {entry.formatted}
                        </span>
                        /{tokenUnitLabel}
                      </span>
                    ))}
                  </>
                ) : (
                  <span className='text-xs text-slate-500'>
                    {t('Dynamic Pricing')}
                  </span>
                )
              ) : isTokenBased ? (
                <>
                  <span className='whitespace-nowrap text-slate-500'>
                    {t('Input')}{' '}
                    <span className='text-foreground font-mono font-semibold'>
                      {formatPrice(
                        props.model,
                        'input',
                        tokenUnit,
                        showRechargePrice,
                        priceRate,
                        usdExchangeRate
                      )}
                    </span>
                    /{tokenUnitLabel}
                  </span>
                  <span className='whitespace-nowrap text-slate-500'>
                    {t('Output')}{' '}
                    <span className='text-foreground font-mono font-semibold'>
                      {formatPrice(
                        props.model,
                        'output',
                        tokenUnit,
                        showRechargePrice,
                        priceRate,
                        usdExchangeRate
                      )}
                    </span>
                    /{tokenUnitLabel}
                  </span>
                  {hasCachedPrice && (
                    <span className='whitespace-nowrap text-slate-400'>
                      {t('Cached')}{' '}
                      <span className='font-mono'>
                        {formatPrice(
                          props.model,
                          'cache',
                          tokenUnit,
                          showRechargePrice,
                          priceRate,
                          usdExchangeRate
                        )}
                      </span>
                    </span>
                  )}
                </>
              ) : (
                <span className='whitespace-nowrap text-slate-500'>
                  <span className='font-mono font-semibold text-slate-950'>
                    {formatRequestPrice(
                      props.model,
                      showRechargePrice,
                      priceRate,
                      usdExchangeRate
                    )}
                  </span>{' '}
                  / {t('request')}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-1.5'>
          <button
            type='button'
            onClick={props.onClick}
            className='inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950 sm:px-3.5'
          >
            {t('查看详情')}
            <ChevronRight className='size-3.5' />
          </button>
          <button
            type='button'
            onClick={handleCopy}
            className='rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-950'
            title={t('复制模型名')}
          >
            <Copy className='size-3.5' />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className='mt-4 line-clamp-2 flex-1 text-[13px] leading-7 text-slate-600 sm:min-h-[3.5rem]'>
        {props.model.description || t('No description available.')}
      </p>

      {/* Footer: left metadata and right performance summary share row alignment */}
      <div className='mt-4 rounded-[24px] border border-slate-200 bg-slate-50/80 p-3'>
        <div className='grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 gap-y-2'>
          <div className='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
            <span className='text-xs font-medium text-slate-500'>
              {t('交付分组')} · {groups.length || 0}
            </span>
            <span className='text-xs font-medium text-slate-500'>
              {t('接口能力')} · {endpoints.length || 0}
            </span>
            <span className='text-xs font-medium text-slate-500'>
              {t('标签')} · {tags.length || 0}
            </span>
            {isDynamicPricing && (
              <StatusBadge
                label={t('Dynamic Pricing')}
                variant='warning'
                copyable={false}
                size='sm'
              />
            )}
          </div>
          <ModelPerfBadge perf={props.perf} className='row-span-2 self-start' />

          <div className='flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1 sm:gap-x-3'>
            {bottomTags.map((item) => (
              <span key={item} className='rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-500'>
                {item}
              </span>
            ))}
            <span className='text-xs text-slate-400'>
              {tokenUnitLabel}
            </span>
            {hiddenCount > 0 && (
              <span className='text-xs text-slate-400'>
                +{hiddenCount}
              </span>
            )}
          </div>
        </div>

        <button
          type='button'
          onClick={props.onClick}
          className='mt-3 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-3.5 py-3 text-left transition-colors hover:bg-slate-50'
        >
          <div>
            <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
              {t('进入决策抽屉')}
            </div>
            <div className='mt-1 text-sm font-semibold text-slate-950'>
              {t('查看完整价格结构、性能趋势与接口信息')}
            </div>
          </div>
          <ChevronRight className='size-4 text-slate-400' />
        </button>
      </div>
    </div>
  )
})
