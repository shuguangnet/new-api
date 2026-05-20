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
          className='pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-20 dark:opacity-[0.10]'
          style={{
            background: [
              'radial-gradient(ellipse 62% 54% at 12% 16%, oklch(0.72 0.18 250 / 80%) 0%, transparent 72%)',
              'radial-gradient(ellipse 50% 38% at 82% 14%, oklch(0.65 0.12 215 / 58%) 0%, transparent 72%)',
              'radial-gradient(ellipse 42% 35% at 56% 72%, oklch(0.70 0.10 280 / 32%) 0%, transparent 74%)',
            ].join(', '),
            maskImage:
              'linear-gradient(to bottom, black 45%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 45%, transparent 100%)',
          }}
        />

        <PageTransition className='relative mx-auto w-full max-w-[1800px] px-3 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-10 xl:px-8'>
          <header className='mx-auto mb-8 max-w-6xl pt-5 sm:mb-10 sm:pt-10'>
            <div className='mx-auto max-w-4xl text-center'>
              <div className='enterprise-badge mx-auto w-fit'>
                <span className='enterprise-badge-dot' />
                <span className='text-xs font-medium tracking-[0.18em] uppercase'>
                  {t('Enterprise Model Marketplace')}
                </span>
              </div>
              <h1 className='mt-6 text-[clamp(2.6rem,5.6vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-white'>
                <span>{t('Pricing Intelligence')}</span>
                <br />
                <span className='tech-gradient-text'>
                  {t('for AI Platform Decisions')}
                </span>
              </h1>
              <p className='mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/45 sm:text-base'>
                {t('Compare model cost, provider coverage, endpoint capability and delivery strategy in a directory designed for enterprise selection, routing and commercialization.')}
              </p>
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                onClear={clearSearch}
                placeholder={t(
                  'Search model name, provider, endpoint, or tag...'
                )}
                className='mx-auto mt-7 max-w-2xl'
              />
            </div>

            <div className='mx-auto mt-8 grid max-w-6xl gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
              <div className='tech-card rounded-[30px] p-6 md:p-7'>
                <div className='grid gap-4 md:grid-cols-3'>
                  <div className='rounded-[22px] border border-white/6 bg-white/[0.03] p-4'>
                    <div className='enterprise-kpi-label'>{t('Models')}</div>
                    <div className='mt-2 text-3xl font-bold tracking-tight text-white'>
                      {models?.length || 0}
                    </div>
                    <div className='mt-2 text-sm leading-6 text-white/45'>
                      {t('Active model SKUs available for platform access and business packaging.')}
                    </div>
                  </div>
                  <div className='rounded-[22px] border border-white/6 bg-white/[0.03] p-4'>
                    <div className='enterprise-kpi-label'>{t('Providers')}</div>
                    <div className='mt-2 text-3xl font-bold tracking-tight text-white'>
                      {vendors?.length || 0}
                    </div>
                    <div className='mt-2 text-sm leading-6 text-white/45'>
                      {t('Upstream ecosystem breadth for resilient routing and partner strategy.')}
                    </div>
                  </div>
                  <div className='rounded-[22px] border border-white/6 bg-white/[0.03] p-4'>
                    <div className='enterprise-kpi-label'>{t('Endpoint Coverage')}</div>
                    <div className='mt-2 text-3xl font-bold tracking-tight text-white'>
                      {endpointCoverage}
                    </div>
                    <div className='mt-2 text-sm leading-6 text-white/45'>
                      {t('Capability breadth across chat, embedding, image and other endpoint types.')}
                    </div>
                  </div>
                </div>

                <div className='mt-5 flex flex-wrap items-center gap-2 text-sm text-white/52'>
                  {(previewVendors.length > 0 ? previewVendors : [t('OpenAI'), t('Claude'), t('Gemini')]).map((name) => (
                    <div
                      key={name}
                      className='rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5'
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>

              <div className='tech-card rounded-[30px] p-6 md:p-7'>
                <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>
                  {t('Selection brief')}
                </div>
                <div className='mt-3 text-xl font-semibold tracking-tight text-white'>
                  {t('Use pricing as a procurement and routing layer, not just a rate sheet')}
                </div>
                <div className='mt-4 space-y-4 text-sm leading-7 text-white/45'>
                  <p>
                    {t('Shortlist providers for cost efficiency, normalize delivery groups, and evaluate endpoint fit before exposing models to internal teams or customers.')}
                  </p>
                  <div className='rounded-[22px] border border-white/6 bg-white/[0.03] p-4'>
                    <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>
                      {t('Common delivery groups')}
                    </div>
                    <div className='mt-2 text-sm font-semibold text-white'>
                      {deliverySummary}
                    </div>
                  </div>
                  <div className='rounded-[22px] border border-white/6 bg-white/[0.03] p-4'>
                    <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>
                      {t('Filtered scope')}
                    </div>
                    <div className='mt-2 text-sm font-semibold text-white'>
                      {hasActiveFilters
                        ? t('{{count}} models in the current decision set', {
                            count: filteredModels.length,
                          })
                        : t('Showing the full active model catalog')}
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
              <div className='tech-card rounded-[28px] p-4 md:p-5'>
                <div className='mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
                  <div>
                    <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>
                      {t('Decision workspace')}
                    </div>
                    <h2 className='mt-2 text-2xl font-semibold tracking-tight text-white'>
                      {t('Model catalog and commercial comparison')}
                    </h2>
                    <p className='mt-2 max-w-3xl text-sm leading-7 text-white/45'>
                      {t('Switch between card and table views, adjust token units, compare recharge strategy, and narrow the catalog into a procurement-ready shortlist.')}
                    </p>
                  </div>
                  <div className='rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 text-left md:w-[280px]'>
                    <div className='text-[11px] tracking-[0.18em] text-white/32 uppercase'>
                      {t('Current result set')}
                    </div>
                    <div className='mt-2 text-2xl font-semibold tracking-tight text-white'>
                      {filteredModels.length}
                    </div>
                    <div className='mt-1 text-xs leading-6 text-white/42'>
                      {hasActiveFilters
                        ? t('Scoped by your active search and filter strategy.')
                        : t('All active catalog entries are currently visible.')}
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
