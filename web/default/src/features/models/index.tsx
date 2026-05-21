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
import { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { Boxes, CloudUpload, Plus, Tags } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionPageLayout } from '@/components/layout'
import { listDeployments } from './api'
import { DeploymentAccessGuard } from './components/deployment-access-guard'
import { DeploymentsTable } from './components/deployments-table'
import { CreateDeploymentDrawer } from './components/dialogs/create-deployment-drawer'
import { ModelsDialogs } from './components/models-dialogs'
import { ModelsPrimaryButtons } from './components/models-primary-buttons'
import { ModelsProvider, useModels } from './components/models-provider'
import { ModelsTable } from './components/models-table'
import { useModelDeploymentSettings } from './hooks/use-model-deployment-settings'
import { deploymentsQueryKeys } from './lib'
import {
  type ModelsSectionId,
  MODELS_DEFAULT_SECTION,
  MODELS_SECTION_IDS,
} from './section-registry'

const route = getRouteApi('/_authenticated/models/$section')

const SECTION_META: Record<
  ModelsSectionId,
  { titleKey: string; descriptionKey: string }
> = {
  metadata: {
    titleKey: '模型元数据',
    descriptionKey: '管理模型元数据与配置信息',
  },
  deployments: {
    titleKey: '模型部署',
    descriptionKey: '管理模型部署与分发',
  },
}

function ModelsContent() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { tabCategory, setTabCategory } = useModels()
  const params = route.useParams()
  const activeSection = (params.section ??
    MODELS_DEFAULT_SECTION) as ModelsSectionId

  // Deployment create dialog state
  const [createDeploymentOpen, setCreateDeploymentOpen] = useState(false)

  // keep context state in sync (for components that rely on it)
  useEffect(() => {
    if (tabCategory !== activeSection) {
      setTabCategory(activeSection)
    }
  }, [activeSection, setTabCategory, tabCategory])

  const {
    loading: deploymentLoading,
    loadingPhase,
    isIoNetEnabled,
    connectionLoading,
    connectionOk,
    connectionError,
    testConnection,
    refresh: refreshDeploymentSettings,
  } = useModelDeploymentSettings()

  // Ensure settings are fresh when switching to deployments section
  useEffect(() => {
    if (activeSection === 'deployments') {
      refreshDeploymentSettings()
    }
  }, [activeSection, refreshDeploymentSettings])

  // Prefetch deployments list while connection check is in progress
  useEffect(() => {
    if (
      activeSection === 'deployments' &&
      isIoNetEnabled &&
      loadingPhase === 'connection'
    ) {
      const defaultParams = { p: 1, page_size: 10 }
      queryClient.prefetchQuery({
        queryKey: deploymentsQueryKeys.list(defaultParams),
        queryFn: () => listDeployments(defaultParams),
        staleTime: 30 * 1000, // 30 seconds
      })
    }
  }, [activeSection, isIoNetEnabled, loadingPhase, queryClient])

  const handleSectionChange = useCallback(
    (section: string) => {
      void navigate({
        to: '/models/$section',
        params: { section: section as ModelsSectionId },
      })
    },
    [navigate]
  )

  const meta = SECTION_META[activeSection] ?? SECTION_META.metadata

  return (
    <>
      <SectionPageLayout>
        <SectionPageLayout.Title>{t(meta.titleKey)}</SectionPageLayout.Title>
        <SectionPageLayout.Description>
          {t(meta.descriptionKey)}
        </SectionPageLayout.Description>
        <SectionPageLayout.Actions>
          {activeSection === 'metadata' ? (
            <ModelsPrimaryButtons />
          ) : (
            <Button onClick={() => setCreateDeploymentOpen(true)} size='sm'>
              <Plus className='h-4 w-4' />
              {t('创建部署')}
            </Button>
          )}
        </SectionPageLayout.Actions>
        <SectionPageLayout.Content>
          {/* Enterprise model workspace header */}
          <div className='relative mb-5 overflow-hidden rounded-[28px] border border-slate-200/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_42%,rgba(250,245,255,0.65)_100%)] px-5 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6'>
            <div
              className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-purple-400/60 to-transparent'
              aria-hidden='true'
            />
            <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
              <div className='max-w-3xl space-y-3'>
                <div className='inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/85 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-purple-700 uppercase'>
                  <span className='h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.35)]' />
                  {t('模型管理中心')}
                </div>
                <h2 className='text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl'>
                  {t('模型资产与部署治理')}
                </h2>
                <p className='text-sm leading-7 text-slate-600 sm:text-[15px]'>
                  {t('在此维护平台可用的模型目录，配置模型元数据、价格比率、分组归属与供应商映射，并管理模型在 io.net 等去中心化网络上的部署分发。模型元数据的准确性直接影响路由决策与成本核算。')}
                </p>
              </div>
              <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px]'>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <Tags className='size-3.5 text-purple-600' aria-hidden='true' />
                    {t('元数据')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('模型信息维护')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('名称、类型、供应商映射')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <Boxes className='size-3.5 text-purple-600' aria-hidden='true' />
                    {t('分组归属')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('按组管理配额')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('精细化的访问控制策略')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <CloudUpload className='size-3.5 text-purple-600' aria-hidden='true' />
                    {t('部署分发')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('io.net 网络部署')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('去中心化模型托管与交付')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <Tabs value={activeSection} onValueChange={handleSectionChange}>
              <TabsList className='group-data-horizontal/tabs:h-auto max-w-full flex-wrap justify-start'>
                {MODELS_SECTION_IDS.map((section) => (
                  <TabsTrigger key={section} value={section}>
                    {t(SECTION_META[section].titleKey)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {activeSection === 'metadata' ? (
              <ModelsTable />
            ) : (
              <DeploymentAccessGuard
                loading={deploymentLoading}
                loadingPhase={loadingPhase}
                isEnabled={isIoNetEnabled}
                connectionLoading={connectionLoading}
                connectionOk={connectionOk}
                connectionError={connectionError}
                onRetry={testConnection}
              >
                <DeploymentsTable />
              </DeploymentAccessGuard>
            )}
          </div>
        </SectionPageLayout.Content>
      </SectionPageLayout>

      <ModelsDialogs />
      <CreateDeploymentDrawer
        open={createDeploymentOpen}
        onOpenChange={setCreateDeploymentOpen}
      />
    </>
  )
}

export function Models() {
  return (
    <ModelsProvider>
      <ModelsContent />
    </ModelsProvider>
  )
}
