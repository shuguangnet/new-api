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
import { useState, useCallback, useMemo, lazy, Suspense } from 'react'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { ROLE } from '@/lib/roles'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionPageLayout } from '@/components/layout'
import { FadeIn } from '@/components/page-transition'
import { ModelsChartPreferences } from './components/models/models-chart-preferences'
import { ModelsFilter } from './components/models/models-filter-dialog'
import { OverviewDashboard } from './components/overview/overview-dashboard'
import { DEFAULT_TIME_GRANULARITY } from './constants'
import {
  buildDefaultDashboardFilters,
  getSavedChartPreferences,
  saveChartPreferences,
} from './lib'
import {
  type DashboardSectionId,
  DASHBOARD_DEFAULT_SECTION,
  DASHBOARD_SECTION_IDS,
} from './section-registry'
import {
  type DashboardChartPreferences,
  type DashboardFilters,
  type QuotaDataItem,
} from './types'

const route = getRouteApi('/_authenticated/dashboard/$section')

const LazyLogStatCards = lazy(() =>
  import('./components/models/log-stat-cards').then((m) => ({
    default: m.LogStatCards,
  }))
)

const LazyModelCharts = lazy(() =>
  import('./components/models/model-charts').then((m) => ({
    default: m.ModelCharts,
  }))
)

const LazyConsumptionDistributionChart = lazy(() =>
  import('./components/models/consumption-distribution-chart').then((m) => ({
    default: m.ConsumptionDistributionChart,
  }))
)

const LazyPerformanceOverview = lazy(() =>
  import('./components/models/performance-overview').then((m) => ({
    default: m.PerformanceOverview,
  }))
)

const LazyUserCharts = lazy(() =>
  import('./components/users/user-charts').then((m) => ({
    default: m.UserCharts,
  }))
)

function LogStatCardsFallback() {
  return (
    <div className='overflow-hidden rounded-lg border'>
      <div className='divide-border/60 grid grid-cols-2 divide-x sm:grid-cols-3 lg:grid-cols-5'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='px-4 py-3.5 sm:px-5 sm:py-4'>
            <Skeleton className='h-3.5 w-16' />
            <Skeleton className='mt-2 h-7 w-20' />
            <Skeleton className='mt-1.5 h-3.5 w-28' />
          </div>
        ))}
      </div>
    </div>
  )
}

function ModelChartsFallback() {
  return (
    <div className='overflow-hidden rounded-lg border'>
      <div className='flex items-center justify-between border-b px-4 py-3 sm:px-5'>
        <Skeleton className='h-5 w-32' />
        <Skeleton className='h-8 w-72' />
      </div>
      <div className='h-96 p-2'>
        <Skeleton className='h-full w-full' />
      </div>
    </div>
  )
}

function PerformanceOverviewFallback() {
  return (
    <div className='overflow-hidden rounded-lg border'>
      <div className='flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-5'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-24' />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='flex items-center gap-1.5'>
            <Skeleton className='h-3 w-14' />
            <Skeleton className='h-4 w-16' />
          </div>
        ))}
        <div className='ml-auto flex items-center gap-2'>
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className='h-5 w-28 rounded-full' />
          ))}
        </div>
      </div>
    </div>
  )
}

const SECTION_META: Record<
  DashboardSectionId,
  { titleKey: string; descriptionKey: string }
> = {
  overview: {
    titleKey: 'Overview',
    descriptionKey: 'View dashboard overview and statistics',
  },
  models: {
    titleKey: 'Model operations workspace',
    descriptionKey:
      'Review model demand, throughput, and delivery structure for enterprise routing decisions.',
  },
  users: {
    titleKey: 'User Analytics',
    descriptionKey: 'View user consumption statistics and charts',
  },
}

export function Dashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = route.useParams()
  const userRole = useAuthStore((state) => state.auth.user?.role)
  const activeSection = (params.section ??
    DASHBOARD_DEFAULT_SECTION) as DashboardSectionId

  const [modelData, setModelData] = useState<QuotaDataItem[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [chartPreferences, setChartPreferences] =
    useState<DashboardChartPreferences>(() => getSavedChartPreferences())
  const [modelFilters, setModelFilters] = useState<DashboardFilters>(() =>
    buildDefaultDashboardFilters(getSavedChartPreferences())
  )

  const handleFilterChange = useCallback((filters: DashboardFilters) => {
    setModelFilters(filters)
  }, [])

  const handleResetFilters = useCallback(() => {
    setModelFilters(buildDefaultDashboardFilters(chartPreferences))
  }, [chartPreferences])

  const handleDataUpdate = useCallback(
    (data: QuotaDataItem[], loading: boolean) => {
      setModelData(data)
      setDataLoading(loading)
    },
    []
  )

  const handleChartPreferencesChange = useCallback(
    (preferences: DashboardChartPreferences) => {
      setChartPreferences(preferences)
      setModelFilters(buildDefaultDashboardFilters(preferences))
      saveChartPreferences(preferences)
    },
    []
  )

  const meta = SECTION_META[activeSection] ?? SECTION_META.overview
  const isAdmin = Boolean(userRole && userRole >= ROLE.ADMIN)
  const visibleSections = useMemo(
    () =>
      DASHBOARD_SECTION_IDS.filter(
        (section) => section !== 'overview' && (section !== 'users' || isAdmin)
      ),
    [isAdmin]
  )
  const handleSectionChange = useCallback(
    (section: string) => {
      void navigate({
        to: '/dashboard/$section',
        params: { section: section as DashboardSectionId },
      })
    },
    [navigate]
  )
  const showSectionTabs =
    activeSection !== 'overview' && visibleSections.length > 1
  const sectionFocusLabel = useMemo(() => {
    if (activeSection === 'overview') {
      return t('Workspace overview')
    }
    if (activeSection === 'models') {
      return t('Model operations analytics')
    }
    return t('User consumption analytics')
  }, [activeSection, t])
  const modelActions =
    activeSection === 'models' ? (
      <>
        <ModelsChartPreferences
          preferences={chartPreferences}
          onPreferencesChange={handleChartPreferencesChange}
        />
        <ModelsFilter
          preferences={chartPreferences}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </>
    ) : null
  const modelWorkspaceStats = useMemo(
    () => [
      {
        label: t('Decision lens'),
        value: t('Enterprise routing view'),
        description: t(
          'Focus on traffic concentration, model efficiency, and commercial sustainability.'
        ),
        icon: BriefcaseBusiness,
      },
      {
        label: t('Monitoring scope'),
        value: t('Demand + performance'),
        description: t(
          'Combine request trends with latency and success posture to spot delivery risk earlier.'
        ),
        icon: BarChart3,
      },
      {
        label: t('Operational outcome'),
        value: t('Stable service margin'),
        description: t(
          'Keep pricing, routing, and quality signals aligned before expanding user traffic.'
        ),
        icon: ShieldCheck,
      },
    ],
    [t]
  )

  return (
    <SectionPageLayout>
      <div className='relative mb-4 overflow-hidden rounded-[30px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_42%,rgba(241,245,249,0.95)_100%)] px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:px-6 sm:py-7'>
        <div
          className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-300/80 to-transparent'
          aria-hidden='true'
        />
        <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-3xl'>
            <div className='inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-sky-700 uppercase'>
              <span className='h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.35)]' />
              {t('Enterprise AI operations center')}
            </div>
            <SectionPageLayout.Title>{t(meta.titleKey)}</SectionPageLayout.Title>
            <SectionPageLayout.Description>
              <span className='text-sm leading-7 text-slate-600 sm:text-[15px]'>
                {t(meta.descriptionKey)}
              </span>
            </SectionPageLayout.Description>
          </div>
          <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px]'>
            <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)]'>
              <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
                {t('Current focus')}
              </div>
              <div className='mt-2 text-sm font-medium text-slate-900'>
                {sectionFocusLabel}
              </div>
            </div>
            <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)]'>
              <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
                {t('Current access')}
              </div>
              <div className='mt-2 text-sm font-medium text-slate-900'>
                {t(isAdmin ? 'Administrator account' : 'Workspace member account')}
              </div>
            </div>
            <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)]'>
              <div className='text-[11px] tracking-[0.18em] text-slate-400 uppercase'>
                {t('Workspace status')}
              </div>
              <div className='mt-2 text-sm font-medium text-slate-900'>
                {t('Operational dashboard online')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionPageLayout.Content>
        <div className='space-y-3 sm:space-y-4'>
          {activeSection !== 'overview' && (
            <div className='flex flex-wrap items-center justify-between gap-1.5 sm:gap-2'>
              {showSectionTabs ? (
                <Tabs value={activeSection} onValueChange={handleSectionChange}>
                  <TabsList className='group-data-horizontal/tabs:h-auto max-w-full flex-wrap justify-start'>
                    {visibleSections.map((section) => (
                      <TabsTrigger key={section} value={section}>
                        {t(SECTION_META[section].titleKey)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              ) : (
                <div />
              )}
              {modelActions != null && (
                <div className='flex shrink-0 flex-wrap items-center gap-1.5 sm:gap-2'>
                  {modelActions}
                </div>
              )}
            </div>
          )}
          {activeSection === 'overview' && <OverviewDashboard />}
          {activeSection === 'models' && (
            <div className='space-y-4'>
              <FadeIn>
                <div className='relative overflow-hidden rounded-[28px] border border-slate-200/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_52%,rgba(239,246,255,0.78)_100%)] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-6'>
                  <div
                    className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-300/80 to-transparent'
                    aria-hidden='true'
                  />
                  <div className='grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]'>
                    <div className='space-y-4'>
                      <div className='inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/85 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-sky-700 uppercase'>
                        <Sparkles className='size-3.5' aria-hidden='true' />
                        {t('Model decision workspace')}
                      </div>
                      <div className='max-w-3xl space-y-2'>
                        <h2 className='text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl'>
                          {t('Use analytics as the operating panel for model routing and delivery quality')}
                        </h2>
                        <p className='text-sm leading-7 text-slate-600 sm:text-[15px]'>
                          {t(
                            'This section reframes raw model charts into an enterprise review workspace so operations, product, and finance can evaluate demand concentration, response quality, and quota structure from one place.'
                          )}
                        </p>
                      </div>
                      <div className='grid gap-3 md:grid-cols-3'>
                        {modelWorkspaceStats.map((item) => {
                          const Icon = item.icon
                          return (
                            <div
                              key={item.label}
                              className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3.5 shadow-[0_10px_28px_rgba(15,23,42,0.04)]'
                            >
                              <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                                <Icon className='size-3.5 text-sky-600' aria-hidden='true' />
                                {item.label}
                              </div>
                              <div className='mt-2 text-sm font-semibold text-slate-950'>
                                {item.value}
                              </div>
                              <p className='mt-1 text-xs leading-6 text-slate-500'>
                                {item.description}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className='rounded-[24px] border border-slate-200/85 bg-white/92 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)] sm:p-5'>
                      <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                        <ShieldCheck className='size-3.5 text-emerald-600' aria-hidden='true' />
                        {t('Review brief')}
                      </div>
                      <div className='mt-3 space-y-3'>
                        <div className='rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3'>
                          <div className='text-sm font-semibold text-slate-900'>
                            {t('Recommended review order')}
                          </div>
                          <p className='mt-1 text-sm leading-6 text-slate-600'>
                            {t(
                              'First confirm overall demand and quota distribution, then inspect model performance, and finally compare detailed trend charts before adjusting routing or pricing strategy.'
                            )}
                          </p>
                        </div>
                        <div className='space-y-2'>
                          {[
                            t('Look for concentration risk in high-volume models.'),
                            t('Check whether latency and success metrics still support the current pricing posture.'),
                            t('Use the detailed charts below to decide whether to rebalance traffic or refine delivery tiers.'),
                          ].map((point) => (
                            <div
                              key={point}
                              className='flex items-start gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5'
                            >
                              <ArrowRight
                                className='mt-0.5 size-3.5 shrink-0 text-sky-600'
                                aria-hidden='true'
                              />
                              <span className='text-sm leading-6 text-slate-600'>
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <div className='overflow-hidden rounded-[28px] border border-slate-200/85 bg-white/95 shadow-[0_18px_48px_rgba(15,23,42,0.05)]'>
                  <div className='flex flex-col gap-4 border-b border-slate-200/85 bg-slate-50/75 px-4 py-4 sm:px-5 lg:flex-row lg:items-end lg:justify-between'>
                    <div className='space-y-1'>
                      <div className='text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                        {t('Analytics workspace')}
                      </div>
                      <h3 className='text-lg font-semibold tracking-tight text-slate-950'>
                        {t('Model delivery analytics board')}
                      </h3>
                      <p className='max-w-3xl text-sm leading-6 text-slate-600'>
                        {t(
                          'All cards and charts below are grouped as one decision surface, helping teams move from descriptive statistics to concrete routing and commercial actions.'
                        )}
                      </p>
                    </div>
                    {modelActions != null && (
                      <div className='flex shrink-0 flex-wrap items-center gap-1.5 sm:gap-2'>
                        {modelActions}
                      </div>
                    )}
                  </div>
                  <div className='space-y-4 p-4 sm:p-5'>
                    <FadeIn>
                      <Suspense fallback={<LogStatCardsFallback />}>
                        <LazyLogStatCards
                          filters={modelFilters}
                          onDataUpdate={handleDataUpdate}
                        />
                      </Suspense>
                    </FadeIn>
                    {isAdmin && (
                      <FadeIn delay={0.05}>
                        <Suspense fallback={<PerformanceOverviewFallback />}>
                          <LazyPerformanceOverview />
                        </Suspense>
                      </FadeIn>
                    )}
                    <FadeIn delay={0.1}>
                      <Suspense fallback={<ModelChartsFallback />}>
                        <LazyConsumptionDistributionChart
                          data={modelData}
                          loading={dataLoading}
                          defaultChartType={
                            chartPreferences.consumptionDistributionChart
                          }
                          timeGranularity={
                            modelFilters.time_granularity || DEFAULT_TIME_GRANULARITY
                          }
                        />
                      </Suspense>
                    </FadeIn>
                    <FadeIn delay={0.15}>
                      <Suspense fallback={<ModelChartsFallback />}>
                        <LazyModelCharts
                          data={modelData}
                          loading={dataLoading}
                          defaultChartTab={chartPreferences.modelAnalyticsChart}
                          timeGranularity={
                            modelFilters.time_granularity || DEFAULT_TIME_GRANULARITY
                          }
                        />
                      </Suspense>
                    </FadeIn>
                  </div>
                </div>
              </FadeIn>
            </div>
          )}
          {activeSection === 'users' && (
            <FadeIn>
              <Suspense fallback={<ModelChartsFallback />}>
                <LazyUserCharts />
              </Suspense>
            </FadeIn>
          )}
        </div>
      </SectionPageLayout.Content>
    </SectionPageLayout>
  )
}
