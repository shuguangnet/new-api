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
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'
import { PageTransition } from '@/components/page-transition'
import {
  LoadingSkeleton,
  EmptyState,
  SearchBar,
  PricingTable,
  PricingSidebar,
  PricingToolbar,
  ModelCardGrid,
  ModelDetailsDrawer,
} from './components'
import { EXCLUDED_GROUPS, VIEW_MODES } from './constants'
import { useFilters } from './hooks/use-filters'
import { usePricingData } from './hooks/use-pricing-data'

export function Pricing() {
  const { t } = useTranslation()
  const [selectedModelName, setSelectedModelName] = useState<string | null>(
    null
  )

  const {
    models,
    vendors,
    groupRatio,
    usableGroup,
    endpointMap,
    autoGroups,
    isLoading,
    priceRate,
    usdExchangeRate,
  } = usePricingData()

  const {
    searchInput,
    sortBy,
    vendorFilter,
    groupFilter,
    quotaTypeFilter,
    endpointTypeFilter,
    tagFilter,
    tokenUnit,
    viewMode,
    showRechargePrice,
    setSearchInput,
    setSortBy,
    setVendorFilter,
    setGroupFilter,
    setQuotaTypeFilter,
    setEndpointTypeFilter,
    setTagFilter,
    setTokenUnit,
    setViewMode,
    setShowRechargePrice,
    filteredModels,
    hasActiveFilters,
    activeFilterCount,
    availableTags,
    clearFilters,
    clearSearch,
  } = useFilters(models || [])

  const handleModelClick = useCallback((modelName: string) => {
    setSelectedModelName(modelName)
  }, [])

  const selectedModel = useMemo(
    () =>
      selectedModelName
        ? (models || []).find(
            (model) => model.model_name === selectedModelName
          ) || null
        : null,
    [models, selectedModelName]
  )

  const availableGroups = useMemo(
    () =>
      Object.keys(usableGroup || {}).filter(
        (g) => !EXCLUDED_GROUPS.includes(g)
      ),
    [usableGroup]
  )

  const previewVendors = useMemo(
    () => (vendors || []).slice(0, 6).map((vendor) => vendor.name),
    [vendors]
  )

  const shortlistedVendorCount = useMemo(() => {
    return new Set(filteredModels.map((model) => model.vendor_name).filter(Boolean))
      .size
  }, [filteredModels])

  const deliverySummary = useMemo(() => {
    if (!availableGroups.length) return '—'
    return availableGroups.slice(0, 3).join(' · ')
  }, [availableGroups])

  const endpointCoverage = useMemo(() => {
    const types = new Set<string>()
    ;(models || []).forEach((model) => {
      ;(model.supported_endpoint_types || []).forEach((type) => {
        if (type) types.add(type)
      })
    })
    return types.size
  }, [models])

  const handleClearAll = useCallback(() => {
    clearFilters()
    clearSearch()
  }, [clearFilters, clearSearch])

  const renderPricingContent = () => {
    if (filteredModels.length === 0) {
      return (
        <EmptyState
          searchQuery={searchInput}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearAll}
        />
      )
    }

    if (viewMode === VIEW_MODES.CARD) {
      return (
        <ModelCardGrid
          models={filteredModels}
          onModelClick={handleModelClick}
          priceRate={priceRate}
          usdExchangeRate={usdExchangeRate}
          tokenUnit={tokenUnit}
          showRechargePrice={showRechargePrice}
        />
      )
    }

    return (
      <PricingTable
        models={filteredModels}
        priceRate={priceRate}
        usdExchangeRate={usdExchangeRate}
        tokenUnit={tokenUnit}
        showRechargePrice={showRechargePrice}
        onModelClick={handleModelClick}
      />
    )
  }

  if (isLoading) {
    return (
      <PublicLayout showMainContainer={false}>
        <div className='mx-auto w-full max-w-[1800px] px-3 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-10 xl:px-8'>
          <LoadingSkeleton viewMode={viewMode} />
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout showMainContainer={false}>
      <div className='relative overflow-hidden'>
        <div
          aria-hidden
          className='pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-80 dark:opacity-[0.14]'
          style={{
            background: [
              'radial-gradient(ellipse 62% 54% at 12% 16%, oklch(0.95 0.05 235 / 90%) 0%, transparent 72%)',
              'radial-gradient(ellipse 50% 38% at 82% 14%, oklch(0.93 0.06 210 / 70%) 0%, transparent 72%)',
              'radial-gradient(ellipse 42% 35% at 56% 72%, oklch(0.96 0.03 255 / 58%) 0%, transparent 74%)',
            ].join(', '),
            maskImage:
              'linear-gradient(to bottom, black 45%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 45%, transparent 100%)',
          }}
        />

        <PageTransition className='relative mx-auto w-full max-w-[1800px] px-3 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-10 xl:px-8'>
          <header className='mx-auto mb-8 max-w-6xl pt-5 sm:mb-10 sm:pt-10'>
            <div className='mx-auto max-w-5xl text-center'>
              <div className='mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/88 px-4 py-2 text-slate-600 shadow-[0_14px_40px_rgba(148,163,184,0.16)] backdrop-blur'>
                <span className='enterprise-badge-dot' />
                <span className='text-xs font-semibold tracking-[0.16em] uppercase'>
                  {t('企业模型选型中心')}
                </span>
              </div>
              <h1 className='mt-6 text-[clamp(2.6rem,5.6vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-slate-950'>
                <span>{t('模型定价与供给决策台')}</span>
                <br />
                <span className='bg-linear-to-r from-slate-900 via-sky-700 to-cyan-600 bg-clip-text text-transparent'>
                  {t('服务采购、路由与商业化配置')}
                </span>
              </h1>
              <p className='mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base'>
                {t('围绕模型成本、供应商覆盖、接口能力与交付策略建立统一目录，帮助团队把价格页升级为真正可用于采购评估、路由配置与对外产品包装的企业工作台。')}
              </p>
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                onClear={clearSearch}
                placeholder={t('搜索模型、供应商、接口类型或标签')}
                className='mx-auto mt-7 max-w-2xl'
              />
            </div>

            <div className='mx-auto mt-8 grid max-w-6xl gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
              <div className='rounded-[30px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_28px_80px_rgba(148,163,184,0.18)] backdrop-blur md:p-7'>
                <div className='grid gap-4 md:grid-cols-3'>
                  <div className='rounded-[22px] border border-slate-200 bg-slate-50/90 p-4'>
                    <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>{t('模型总量')}</div>
                    <div className='mt-2 text-3xl font-bold tracking-tight text-slate-950'>
                      {models?.length || 0}
                    </div>
                    <div className='mt-2 text-sm leading-6 text-slate-600'>
                      {t('可供平台接入、能力封装与商业交付的有效模型 SKU 数量。')}
                    </div>
                  </div>
                  <div className='rounded-[22px] border border-slate-200 bg-slate-50/90 p-4'>
                    <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>{t('供应商覆盖')}</div>
                    <div className='mt-2 text-3xl font-bold tracking-tight text-slate-950'>
                      {vendors?.length || 0}
                    </div>
                    <div className='mt-2 text-sm leading-6 text-slate-600'>
                      {t('衡量上游生态广度，便于建立更稳健的路由冗余与合作策略。')}
                    </div>
                  </div>
                  <div className='rounded-[22px] border border-slate-200 bg-slate-50/90 p-4'>
                    <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>{t('接口能力覆盖')}</div>
                    <div className='mt-2 text-3xl font-bold tracking-tight text-slate-950'>
                      {endpointCoverage}
                    </div>
                    <div className='mt-2 text-sm leading-6 text-slate-600'>
                      {t('覆盖聊天、嵌入、图像等接口类型，支撑不同业务场景的模型供给。')}
                    </div>
                  </div>
                </div>

                <div className='mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-600'>
                  {(previewVendors.length > 0 ? previewVendors : ['OpenAI', 'Claude', 'Gemini']).map((name) => (
                    <div
                      key={name}
                      className='rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm'
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>

              <div className='rounded-[30px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_28px_80px_rgba(148,163,184,0.18)] backdrop-blur md:p-7'>
                <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
                  {t('选型摘要')}
                </div>
                <div className='mt-3 text-xl font-semibold tracking-tight text-slate-950'>
                  {t('把价格目录升级为模型供给决策层，而不只是价目表')}
                </div>
                <div className='mt-4 space-y-4 text-sm leading-7 text-slate-600'>
                  <p>
                    {t('在模型真正面向内部团队或客户之前，先完成成本效率筛选、交付分组归一化以及接口适配性判断，降低后续接入与运营摩擦。')}
                  </p>
                  <div className='rounded-[22px] border border-slate-200 bg-slate-50/90 p-4'>
                    <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
                      {t('常见交付分组')}
                    </div>
                    <div className='mt-2 text-sm font-semibold text-slate-900'>
                      {deliverySummary}
                    </div>
                  </div>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='rounded-[22px] border border-slate-200 bg-slate-50/90 p-4'>
                      <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
                        {t('当前筛选范围')}
                      </div>
                      <div className='mt-2 text-sm font-semibold text-slate-900'>
                        {hasActiveFilters
                          ? t('当前决策集共 {{count}} 个模型', {
                              count: filteredModels.length,
                            })
                          : t('当前展示全部可用模型目录')}
                      </div>
                    </div>
                    <div className='rounded-[22px] border border-slate-200 bg-slate-50/90 p-4'>
                      <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
                        {t('入围供应商')}
                      </div>
                      <div className='mt-2 text-sm font-semibold text-slate-900'>
                        {t('{{count}} 家供应商参与当前比较', {
                          count: shortlistedVendorCount,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className='mx-auto mb-5 grid max-w-6xl gap-4 xl:grid-cols-[330px_minmax(0,1fr)]'>
            <PricingSidebar
              quotaTypeFilter={quotaTypeFilter}
              endpointTypeFilter={endpointTypeFilter}
              vendorFilter={vendorFilter}
              groupFilter={groupFilter}
              tagFilter={tagFilter}
              onQuotaTypeChange={setQuotaTypeFilter}
              onEndpointTypeChange={setEndpointTypeFilter}
              onVendorChange={setVendorFilter}
              onGroupChange={setGroupFilter}
              onTagChange={setTagFilter}
              vendors={vendors || []}
              groups={availableGroups}
              groupRatios={groupRatio}
              tags={availableTags}
              models={models || []}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
              className='hover-scrollbar sticky top-4 hidden max-h-[calc(100dvh-2rem)] self-start overflow-y-auto xl:block'
            />

            <main className='min-w-0 space-y-4'>
              <div className='rounded-[28px] border border-slate-200/80 bg-white/92 p-4 shadow-[0_24px_72px_rgba(148,163,184,0.16)] backdrop-blur md:p-5'>
                <div className='mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
                  <div>
                    <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
                      {t('决策工作区')}
                    </div>
                    <h2 className='mt-2 text-2xl font-semibold tracking-tight text-slate-950'>
                      {t('模型目录与商业比较')}
                    </h2>
                    <p className='mt-2 max-w-3xl text-sm leading-7 text-slate-600'>
                      {t('在卡片与表格视图之间切换，统一 Token 口径，比较充值策略，并把大目录逐步收敛为可直接进入采购评审的模型清单。')}
                    </p>
                  </div>
                  <div className='rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-left md:w-[320px]'>
                    <div className='text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase'>
                      {t('当前结果集')}
                    </div>
                    <div className='mt-2 text-2xl font-semibold tracking-tight text-slate-950'>
                      {filteredModels.length}
                    </div>
                    <div className='mt-1 text-xs leading-6 text-slate-600'>
                      {hasActiveFilters
                        ? t('已按当前搜索词与筛选策略缩小比较范围。')
                        : t('当前正在浏览全部有效模型目录。')}
                    </div>
                  </div>
                </div>

                <PricingToolbar
                  filteredCount={filteredModels.length}
                  totalCount={models?.length}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  tokenUnit={tokenUnit}
                  onTokenUnitChange={setTokenUnit}
                  showRechargePrice={showRechargePrice}
                  onRechargePriceChange={setShowRechargePrice}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  quotaTypeFilter={quotaTypeFilter}
                  endpointTypeFilter={endpointTypeFilter}
                  vendorFilter={vendorFilter}
                  groupFilter={groupFilter}
                  tagFilter={tagFilter}
                  onQuotaTypeChange={setQuotaTypeFilter}
                  onEndpointTypeChange={setEndpointTypeFilter}
                  onVendorChange={setVendorFilter}
                  onGroupChange={setGroupFilter}
                  onTagChange={setTagFilter}
                  vendors={vendors || []}
                  groups={availableGroups}
                  groupRatios={groupRatio}
                  tags={availableTags}
                  models={models || []}
                  hasActiveFilters={hasActiveFilters}
                  activeFilterCount={activeFilterCount}
                  onClearFilters={clearFilters}
                />
              </div>

              {renderPricingContent()}
            </main>
          </section>

          {selectedModel && (
            <ModelDetailsDrawer
              open={Boolean(selectedModel)}
              onOpenChange={(open) => {
                if (!open) setSelectedModelName(null)
              }}
              model={selectedModel}
              groupRatio={groupRatio || {}}
              usableGroup={usableGroup || {}}
              endpointMap={
                (endpointMap as Record<
                  string,
                  { path?: string; method?: string }
                >) || {}
              }
              autoGroups={autoGroups || []}
              priceRate={priceRate ?? 1}
              usdExchangeRate={usdExchangeRate ?? 1}
              tokenUnit={tokenUnit}
              showRechargePrice={showRechargePrice}
            />
          )}
        </PageTransition>
      </div>
    </PublicLayout>
  )
}
