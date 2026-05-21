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
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export interface EmptyStateProps {
  searchQuery?: string
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function EmptyState(props: EmptyStateProps) {
  const { t } = useTranslation()
  const hasSearch = Boolean(props.searchQuery?.trim())

  return (
    <div className='flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white/90 px-6 py-12 text-center shadow-[0_20px_60px_rgba(148,163,184,0.12)]'>
      <div className='mb-4 flex size-14 items-center justify-center rounded-full border border-slate-200 bg-slate-50'>
        <Search className='size-6 text-slate-400' />
      </div>

      <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
        {t('结果为空')}
      </div>
      <h3 className='mt-3 text-xl font-semibold tracking-tight text-slate-950'>
        {t('当前筛选条件下暂无可评估模型')}
      </h3>

      <p className='mt-3 mb-6 max-w-xl text-sm leading-7 text-slate-600'>
        {hasSearch
          ? t(
              '没有找到与“{{query}}”相关的模型。建议放宽关键词、切换供应商范围，或回到全量目录重新建立候选集。',
              { query: props.searchQuery }
            )
          : t('当前筛选组合过于严格，尚未形成有效的模型决策清单。可以重置筛选后重新开始选型与比较。')}
      </p>

      {(props.hasActiveFilters || hasSearch) && (
        <Button
          variant='outline'
          size='sm'
          onClick={props.onClearFilters}
          className='border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950'
        >
          {t('重置搜索与筛选')}
        </Button>
      )}
    </div>
  )
}
