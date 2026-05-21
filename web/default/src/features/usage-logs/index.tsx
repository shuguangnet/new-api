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
import { useCallback, useMemo } from 'react'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Activity, FileSearch, BarChart3 } from 'lucide-react'
import { useSidebarConfig } from '@/hooks/use-sidebar-config'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionPageLayout } from '@/components/layout'
import type { NavGroup } from '@/components/layout/types'
import { CacheStatsDialog } from '@/features/system-settings/general/channel-affinity/cache-stats-dialog'
import { UserInfoDialog } from './components/dialogs/user-info-dialog'
import {
  UsageLogsProvider,
  useUsageLogsContext,
} from './components/usage-logs-provider'
import { UsageLogsTable } from './components/usage-logs-table'
import {
  isUsageLogsSectionId,
  USAGE_LOGS_DEFAULT_SECTION,
  type UsageLogsSectionId,
} from './section-registry'

const route = getRouteApi('/_authenticated/usage-logs/$section')
const TASK_LOG_SECTIONS = ['drawing', 'task'] as const

const SECTION_META: Record<
  UsageLogsSectionId,
  { titleKey: string; descriptionKey: string }
> = {
  common: {
    titleKey: '通用日志',
    descriptionKey: '查看与管理平台 API 调用日志',
  },
  drawing: {
    titleKey: '绘图日志',
    descriptionKey: '查看与管理绘图请求日志',
  },
  task: {
    titleKey: '任务日志',
    descriptionKey: '查看与管理异步任务执行日志',
  },
}

function UsageLogsContent() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = route.useParams()
  const activeCategory: UsageLogsSectionId =
    params.section && isUsageLogsSectionId(params.section)
      ? params.section
      : USAGE_LOGS_DEFAULT_SECTION
  const {
    selectedUserId,
    userInfoDialogOpen,
    setUserInfoDialogOpen,
    affinityTarget,
    affinityDialogOpen,
    setAffinityDialogOpen,
  } = useUsageLogsContext()
  const tabNavGroups = useMemo<NavGroup[]>(
    () => [
      {
        title: '任务日志',
        items: TASK_LOG_SECTIONS.map((section) => ({
          title: SECTION_META[section].titleKey,
          url: `/usage-logs/${section}`,
        })),
      },
    ],
    []
  )
  const filteredTabGroups = useSidebarConfig(tabNavGroups)
  const visibleSections = useMemo(
    () =>
      (filteredTabGroups[0]?.items ?? [])
        .map((item) => {
          if (!('url' in item) || typeof item.url !== 'string') return null
          return item.url.split('/').pop() ?? null
        })
        .filter((section): section is UsageLogsSectionId =>
          Boolean(section && isUsageLogsSectionId(section))
        ),
    [filteredTabGroups]
  )

  const handleSectionChange = useCallback(
    (section: string) => {
      void navigate({
        to: '/usage-logs/$section',
        params: { section: section as UsageLogsSectionId },
      })
    },
    [navigate]
  )

  const pageMeta =
    activeCategory === 'common' ? SECTION_META.common : SECTION_META.task
  const showTaskSwitcher =
    activeCategory !== 'common' && visibleSections.length > 1

  return (
    <>
      <SectionPageLayout>
        <SectionPageLayout.Title>
          {t(pageMeta.titleKey)}
        </SectionPageLayout.Title>
        <SectionPageLayout.Description>
          {t(pageMeta.descriptionKey)}
        </SectionPageLayout.Description>
        <SectionPageLayout.Content>
          {/* Enterprise workspace header */}
          <div className='relative mb-5 overflow-hidden rounded-[28px] border border-slate-200/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_42%,rgba(254,243,199,0.50)_100%)] px-5 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6'>
            <div
              className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-400/60 to-transparent'
              aria-hidden='true'
            />
            <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
              <div className='max-w-3xl space-y-3'>
                <div className='inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/85 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-amber-700 uppercase'>
                  <span className='h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.35)]' />
                  {t('调用日志中心')}
                </div>
                <h2 className='text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl'>
                  {t('API 请求追踪与用量审计')}
                </h2>
                <p className='text-sm leading-7 text-slate-600 sm:text-[15px]'>
                  {t('在此查看所有 API 调用的详细日志，包括请求参数、响应内容、Token 消耗、延迟数据与错误信息。支持按模型、用户、渠道、状态等维度筛选，是排查问题、审计用量与优化成本的核心入口。')}
                </p>
              </div>
              <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px]'>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <Activity className='size-3.5 text-amber-600' aria-hidden='true' />
                    {t('实时追踪')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('全量请求记录')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('毫秒级请求链路追踪')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <FileSearch className='size-3.5 text-amber-600' aria-hidden='true' />
                    {t('多维筛选')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('模型 / 用户 / 渠道')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('灵活组合定位问题请求')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <BarChart3 className='size-3.5 text-amber-600' aria-hidden='true' />
                    {t('用量审计')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('Token 与成本核算')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('精确到每次调用的用量明细')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            {showTaskSwitcher && (
              <Tabs value={activeCategory} onValueChange={handleSectionChange}>
                <TabsList className='group-data-horizontal/tabs:h-auto max-w-full flex-wrap justify-start'>
                  {visibleSections.map((section) => (
                    <TabsTrigger key={section} value={section}>
                      {t(SECTION_META[section].titleKey)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
            <UsageLogsTable logCategory={activeCategory} />
          </div>
        </SectionPageLayout.Content>
      </SectionPageLayout>

      <UserInfoDialog
        userId={selectedUserId}
        open={userInfoDialogOpen}
        onOpenChange={setUserInfoDialogOpen}
      />

      <CacheStatsDialog
        open={affinityDialogOpen}
        onOpenChange={setAffinityDialogOpen}
        target={
          affinityTarget
            ? {
                rule_name: affinityTarget.rule_name || '',
                using_group:
                  affinityTarget.using_group ||
                  affinityTarget.selected_group ||
                  '',
                key_hint: affinityTarget.key_hint || '',
                key_fp: affinityTarget.key_fp || '',
              }
            : null
        }
      />
    </>
  )
}

export function UsageLogs() {
  return (
    <UsageLogsProvider>
      <UsageLogsContent />
    </UsageLogsProvider>
  )
}
