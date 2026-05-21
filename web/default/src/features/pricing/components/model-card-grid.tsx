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
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { getPerfMetricsSummary } from '@/features/performance-metrics/api'
import { DEFAULT_PRICING_PAGE_SIZE, DEFAULT_TOKEN_UNIT } from '../constants'
import type { PricingModel, TokenUnit } from '../types'
import { ModelCard } from './model-card'
import type { ModelPerfBadgeData } from './model-perf-badge'

export interface ModelCardGridProps {
  models: PricingModel[]
  onModelClick: (modelName: string) => void
  priceRate?: number
  usdExchangeRate?: number
  tokenUnit?: TokenUnit
  showRechargePrice?: boolean
}

export function ModelCardGrid(props: ModelCardGridProps) {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const pageSize = DEFAULT_PRICING_PAGE_SIZE
  const tokenUnit = props.tokenUnit ?? DEFAULT_TOKEN_UNIT
  const totalPages = Math.max(1, Math.ceil(props.models.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * pageSize + 1
  const pageEnd = Math.min(currentPage * pageSize, props.models.length)

  const perfQuery = useQuery({
    queryKey: ['perf-metrics-summary', 24],
    queryFn: () => getPerfMetricsSummary(24),
    staleTime: 60 * 1000,
    retry: false,
  })

  const pagedModels = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return props.models.slice(start, start + pageSize)
  }, [currentPage, pageSize, props.models])

  const perfMap = useMemo(() => {
    const map = new Map<string, ModelPerfBadgeData>()
    for (const model of perfQuery.data?.data?.models ?? []) {
      map.set(model.model_name, model)
    }
    return map
  }, [perfQuery.data])

  if (props.models.length === 0) {
    return null
  }

  return (
    <div className='space-y-4 sm:space-y-5'>
      <div className='rounded-[28px] border border-slate-200/80 bg-white/92 p-4 shadow-[0_24px_72px_rgba(148,163,184,0.14)] backdrop-blur md:p-5'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
              {t('卡片决策视图')}
            </div>
            <h3 className='mt-2 text-xl font-semibold tracking-tight text-slate-950'>
              {t('适合做模型选型初筛与供应商横向比较')}
            </h3>
            <p className='mt-2 max-w-3xl text-sm leading-7 text-slate-600'>
              {t('以更高密度的价格、性能与能力摘要快速识别候选模型，再进入详情抽屉完成采购评审、路由判断与交付配置。')}
            </p>
          </div>

          <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[520px]'>
            <div className='rounded-[22px] border border-slate-200 bg-slate-50/90 px-4 py-3'>
              <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
                {t('当前页范围')}
              </div>
              <div className='mt-2 text-lg font-semibold tracking-tight text-slate-950'>
                {pageStart}-{pageEnd}
              </div>
              <div className='mt-1 text-xs text-slate-600'>
                {t('帮助团队聚焦当前批次的候选模型。')}
              </div>
            </div>
            <div className='rounded-[22px] border border-slate-200 bg-slate-50/90 px-4 py-3'>
              <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
                {t('本页卡片数')}
              </div>
              <div className='mt-2 text-lg font-semibold tracking-tight text-slate-950'>
                {pagedModels.length}
              </div>
              <div className='mt-1 text-xs text-slate-600'>
                {t('单屏即可完成一轮高效比对。')}
              </div>
            </div>
            <div className='rounded-[22px] border border-slate-200 bg-slate-50/90 px-4 py-3'>
              <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
                {t('总页数')}
              </div>
              <div className='mt-2 text-lg font-semibold tracking-tight text-slate-950'>
                {totalPages}
              </div>
              <div className='mt-1 text-xs text-slate-600'>
                {t('适用于分批完成目录治理与商业筛选。')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {pagedModels.map((model) => (
          <ModelCard
            key={model.id ?? model.model_name}
            model={model}
            tokenUnit={tokenUnit}
            priceRate={props.priceRate}
            usdExchangeRate={props.usdExchangeRate}
            showRechargePrice={props.showRechargePrice}
            perf={perfMap.get(model.model_name || '')}
            onClick={() => props.onModelClick(model.model_name || '')}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex flex-col items-center justify-between gap-3 rounded-[24px] border border-slate-200/80 bg-white/92 px-4 py-4 text-sm text-slate-600 shadow-[0_18px_48px_rgba(148,163,184,0.12)] sm:flex-row'>
          <p>
            {t('第 {{current}} 页，共 {{total}} 页', {
              current: currentPage,
              total: totalPages,
            })}
          </p>
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={currentPage <= 1}
              className='gap-1.5 border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            >
              <ChevronLeft className='size-4' />
              {t('上一页')}
            </Button>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={currentPage >= totalPages}
              className='gap-1.5 border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            >
              {t('下一页')}
              <ChevronRight className='size-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
