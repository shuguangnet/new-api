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
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Circle,
  CreditCard,
  FileText,
  KeyRound,
  ListChecks,
  Play,
  RadioTower,
  ShieldCheck,
  TerminalSquare,
  Timer,
  type LucideIcon,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { getUserModels } from '@/lib/api'
import { MOTION_TRANSITION } from '@/lib/motion'
import { ROLE } from '@/lib/roles'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/copy-button'
import {
  CardStaggerContainer,
  CardStaggerItem,
} from '@/components/page-transition'
import { fetchTokenKey, getApiKeys } from '@/features/keys/api'
import type { ApiKey } from '@/features/keys/types'
import {
  useApiInfo,
  useDashboardContentVisibility,
} from '../../hooks/use-status-data'
import { AnnouncementsPanel } from './announcements-panel'
import { ApiInfoPanel } from './api-info-panel'
import { FAQPanel } from './faq-panel'
import { PerformanceHealthPanel } from './performance-health-panel'
import { SummaryCards } from './summary-cards'
import { UptimePanel } from './uptime-panel'

const SETUP_GUIDE_VISIBILITY_STORAGE_KEY =
  'dashboard_overview_setup_guide_expanded'

const SETUP_GUIDE_CODE_PATTERN = [
  'const request = await client.responses.create({',
  "  model: 'gpt-4.1-mini',",
  "  input: 'Start routing traffic',",
  '})',
  '',
  'if (request.output_text) {',
  '  console.log(request.output_text)',
  '}',
].join('\n')

type DashboardActionPath =
  | '/keys'
  | '/wallet'
  | '/playground'
  | '/channels'
  | '/usage-logs'
  | '/pricing'

interface StartStep {
  title: string
  description: string
  to: DashboardActionPath
  icon: LucideIcon
  completed: boolean
}

interface QuickAction {
  title: string
  description: string
  to: DashboardActionPath
  icon: LucideIcon
  adminOnly?: boolean
}

interface RequestExample {
  endpoint: string
  model: string
  keyName: string
  displayKey: string
  curl: string
  ready: boolean
}

interface HeroSignal {
  label: string
  value: string
  icon: LucideIcon
}

interface OperatingBriefItem {
  label: string
  value: string
  description: string
  icon: LucideIcon
}

interface OperationsFocusItem {
  label: string
  value: string
  description: string
}

function getSavedSetupGuideExpanded(): boolean | null {
  if (typeof window === 'undefined') return null
  const saved = window.localStorage.getItem(SETUP_GUIDE_VISIBILITY_STORAGE_KEY)
  if (saved === 'expanded') return true
  if (saved === 'collapsed') return false
  return null
}

function saveSetupGuideExpanded(expanded: boolean): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(
    SETUP_GUIDE_VISIBILITY_STORAGE_KEY,
    expanded ? 'expanded' : 'collapsed'
  )
}

function getCurrentOrigin(): string {
  if (typeof window === 'undefined') return ''
  return window.location.origin
}

function normalizeEndpoint(sourceUrl?: string): string {
  const fallback = `${getCurrentOrigin()}/v1/chat/completions`
  const trimmed = sourceUrl?.trim()
  if (!trimmed) return fallback

  const withoutTrailingSlash = trimmed.replace(/\/+$/, '')
  if (withoutTrailingSlash.endsWith('/v1/chat/completions')) {
    return withoutTrailingSlash
  }
  if (withoutTrailingSlash.endsWith('/v1')) {
    return `${withoutTrailingSlash}/chat/completions`
  }
  return `${withoutTrailingSlash}/v1/chat/completions`
}

function getPreferredKey(keys: ApiKey[]): ApiKey | null {
  return keys.find((item) => item.status === 1) ?? keys[0] ?? null
}

function formatDisplayKey(key?: string): string {
  if (!key) return 'sk-...'
  if (key.length <= 14) return key
  return `${key.slice(0, 7)}...${key.slice(-4)}`
}

function buildCurlCommand(args: {
  endpoint: string
  apiKey: string
  model: string
}): string {
  return [
    `curl ${args.endpoint} \\`,
    '  -H "Content-Type: application/json" \\',
    `  -H "Authorization: Bearer ${args.apiKey}" \\`,
    `  -d '{"model":"${args.model}","messages":[{"role":"user","content":"Say hello in one sentence."}]}'`,
  ].join('\n')
}

function SetupGuideBackdrop(props: { compact?: boolean }) {
  return (
    <>
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,oklch(0.97_0.04_250/.92)_0%,oklch(0.95_0.08_315/.82)_38%,oklch(0.96_0.12_92/.78)_74%,oklch(0.94_0.1_132/.62)_100%)] dark:opacity-25',
          props.compact
            ? '[mask-image:linear-gradient(90deg,black_0%,black_48%,transparent_74%)] opacity-55'
            : 'opacity-85'
        )}
        aria-hidden='true'
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 hidden overflow-hidden font-mono text-lime-100/75 sm:block dark:text-lime-200/25',
          props.compact ? 'w-1/2 opacity-45' : 'w-[58%] opacity-75'
        )}
        aria-hidden='true'
      >
        <pre
          className={cn(
            'absolute right-3 [mask-image:linear-gradient(90deg,transparent_0%,black_30%,black_82%,transparent_100%)] text-right tracking-[0.38em] whitespace-pre',
            props.compact
              ? '-top-6 text-[9px] leading-4'
              : 'top-1 text-[11px] leading-5'
          )}
        >
          {SETUP_GUIDE_CODE_PATTERN}
        </pre>
      </div>
      <div
        className='from-background/35 to-background/70 dark:from-background/20 dark:to-background/80 pointer-events-none absolute inset-0 bg-linear-to-b via-transparent'
        aria-hidden='true'
      />
    </>
  )
}

function StartStepItem(props: {
  step: StartStep
  index: number
  isLast: boolean
}) {
  const Icon = props.step.icon
  const StatusIcon = props.step.completed ? Check : Circle

  return (
    <li className='relative flex gap-3 pb-2.5 last:pb-0'>
      {!props.isLast && (
        <span
          className='bg-border absolute top-9 bottom-0 left-4 w-px'
          aria-hidden='true'
        />
      )}
      <span
        className={cn(
          'bg-background relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg border shadow-xs',
          props.step.completed && 'border-success/30 bg-success/10'
        )}
      >
        <StatusIcon
          className={props.step.completed ? 'text-success size-4' : 'size-4'}
          aria-hidden='true'
        />
      </span>

      <Link
        to={props.step.to}
        className='bg-background/70 hover:bg-muted/50 focus-visible:ring-ring flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left shadow-xs transition-colors outline-none focus-visible:ring-2'
      >
        <span className='flex min-w-0 items-start gap-2.5'>
          <span className='bg-muted mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg'>
            <Icon className='size-3.5' aria-hidden='true' />
          </span>
          <span className='flex min-w-0 flex-col gap-0.5'>
            <span className='flex items-center gap-2 text-sm font-medium'>
              <span className='text-muted-foreground font-mono text-xs tabular-nums'>
                {props.index + 1}.
              </span>
              <span className='truncate'>{props.step.title}</span>
            </span>
            <span className='text-muted-foreground line-clamp-1 text-xs'>
              {props.step.description}
            </span>
          </span>
        </span>
        <ArrowRight
          className='text-muted-foreground size-4 shrink-0'
          aria-hidden='true'
        />
      </Link>
    </li>
  )
}

function RequestPreview(props: {
  example: RequestExample
  signals: HeroSignal[]
}) {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const previewLines = props.example.curl.split('\n').map((line) => {
    if (line.includes('Authorization: Bearer')) {
      return `  -H "Authorization: Bearer ${props.example.displayKey}" \\`
    }
    return line
  })

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={MOTION_TRANSITION.slow}
      className='bg-background/75 relative overflow-hidden rounded-2xl border p-3 shadow-sm backdrop-blur'
    >
      {!shouldReduceMotion && (
        <motion.div
          className='via-foreground/30 pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent'
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden='true'
        />
      )}

      <div className='flex items-center justify-between gap-3 border-b pb-3'>
        <div className='flex min-w-0 items-center gap-2'>
          <span className='bg-muted flex size-8 shrink-0 items-center justify-center rounded-lg'>
            <TerminalSquare className='size-4' aria-hidden='true' />
          </span>
          <div className='min-w-0'>
            <div className='truncate text-sm font-medium'>
              {t('首条 API 请求')}
            </div>
            <div className='text-muted-foreground truncate text-xs'>
              {props.example.ready
                ? props.example.keyName
                : t('先创建 API 密钥后，再解锁可直接执行的真实请求示例')}
            </div>
          </div>
        </div>
        {props.example.ready ? (
          <CopyButton
            value={props.example.curl}
            variant='outline'
            size='sm'
            className='h-7 gap-1.5 px-2 text-xs'
            tooltip={t('复制可直接运行的 curl 示例')}
            successTooltip={t('已复制')}
            aria-label={t('复制可直接运行的 curl 示例')}
          >
            {t('复制')}
          </CopyButton>
        ) : (
          <Button size='sm' variant='outline' render={<Link to='/keys' />}>
            {t('创建 API 密钥')}
          </Button>
        )}
      </div>

      <div className='bg-foreground/[0.035] my-3 rounded-xl p-3 font-mono text-xs'>
        <div className='mb-2 flex items-center gap-1.5'>
          <span className='bg-destructive size-2 rounded-full' />
          <span className='bg-warning size-2 rounded-full' />
          <span className='bg-success size-2 rounded-full' />
        </div>
        <div className='flex flex-col gap-1 overflow-hidden'>
          {previewLines.map((line, index) => (
            <code
              key={`${line}-${index}`}
              className='text-muted-foreground truncate'
              title={line}
            >
              {line}
            </code>
          ))}
        </div>
      </div>

      <div className='grid gap-2'>
        {props.signals.map((signal) => {
          const Icon = signal.icon

          return (
            <div
              key={signal.label}
              className='bg-muted/40 flex items-center justify-between gap-3 rounded-xl px-3 py-2'
            >
              <span className='flex min-w-0 items-center gap-2'>
                <Icon
                  className='text-muted-foreground size-3.5 shrink-0'
                  aria-hidden='true'
                />
                <span className='truncate text-xs font-medium'>
                  {signal.label}
                </span>
              </span>
              <span className='text-muted-foreground shrink-0 text-xs'>
                {signal.value}
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

function QuickActionItem(props: { action: QuickAction }) {
  const Icon = props.action.icon

  return (
    <Button
      variant='outline'
      className='h-auto justify-start rounded-xl px-3 py-3 text-left'
      render={<Link to={props.action.to} />}
    >
      <span className='bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg'>
        <Icon className='size-4' aria-hidden='true' />
      </span>
      <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <span className='truncate text-sm font-medium'>
          {props.action.title}
        </span>
        <span className='text-muted-foreground line-clamp-2 text-xs leading-relaxed'>
          {props.action.description}
        </span>
      </span>
    </Button>
  )
}

function OperatingBriefCard(props: {
  items: OperatingBriefItem[]
  summaryTitle: string
  summaryBody: string
  summaryCta: string
  summaryTo: DashboardActionPath
  operationsTitle: string
  operationsBody: string
  operationsFocus: OperationsFocusItem[]
}) {
  const { t } = useTranslation()

  return (
    <CardStaggerContainer className='grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_20rem]'>
      <CardStaggerItem className='bg-card overflow-hidden rounded-2xl border shadow-xs'>
        <div className='relative p-4 sm:p-5'>
          <div
            className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[oklch(0.72_0.18_265/.5)] to-transparent'
            aria-hidden='true'
          />
          <div className='flex flex-col gap-4'>
            <div className='flex flex-wrap items-start justify-between gap-3'>
              <div className='flex max-w-2xl flex-col gap-1'>
                <span className='text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase'>
                  {t('运营简报')}
                </span>
                <h3 className='text-lg font-semibold tracking-tight sm:text-xl'>
                  {t('在放量前先看清就绪度、覆盖面与预算安全垫')}
                </h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {t(
                    '这里不再只是传统统计卡片，而是一个面向交付与运营协同的首页简报区，帮助团队在进入其他模块前先确认关键条件。'
                  )}
                </p>
              </div>
            </div>

            <div className='grid gap-3 md:grid-cols-2 2xl:grid-cols-4'>
              {props.items.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className='from-background/90 to-muted/35 rounded-2xl border bg-linear-to-b p-4 shadow-xs'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0'>
                        <div className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
                          {item.label}
                        </div>
                        <div className='mt-2 text-base font-semibold tracking-tight sm:text-lg'>
                          {item.value}
                        </div>
                      </div>
                      <span className='bg-muted flex size-9 shrink-0 items-center justify-center rounded-xl border'>
                        <Icon className='text-muted-foreground size-4' aria-hidden='true' />
                      </span>
                    </div>
                    <p className='text-muted-foreground mt-3 text-xs leading-relaxed'>
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardStaggerItem>

      <CardStaggerItem className='bg-card overflow-hidden rounded-2xl border shadow-xs'>
        <div className='from-background to-muted/35 flex h-full flex-col justify-between gap-4 bg-linear-to-b p-4 sm:p-5'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-3'>
              <div>
                <div className='text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase'>
                  {t('控制建议')}
                </div>
                <h3 className='mt-2 text-lg font-semibold tracking-tight'>
                  {props.summaryTitle}
                </h3>
              </div>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {props.summaryBody}
              </p>
            </div>

            <div className='rounded-2xl border border-border/70 bg-background/75 p-3.5'>
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <div className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
                    {t('运营节奏')}
                  </div>
                  <h4 className='mt-1 text-sm font-semibold tracking-tight'>
                    {props.operationsTitle}
                  </h4>
                </div>
                <span className='rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] font-medium text-primary'>
                  {t('实时工作台')}
                </span>
              </div>
              <p className='text-muted-foreground mt-2 text-xs leading-relaxed'>
                {props.operationsBody}
              </p>
              <div className='mt-3 grid gap-2'>
                {props.operationsFocus.map((item) => (
                  <div
                    key={item.label}
                    className='rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5'
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase'>
                        {item.label}
                      </span>
                      <span className='text-sm font-semibold tracking-tight'>
                        {item.value}
                      </span>
                    </div>
                    <p className='text-muted-foreground mt-1.5 text-xs leading-relaxed'>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='bg-background/70 rounded-2xl border p-3'>
            <div className='text-muted-foreground text-xs leading-relaxed'>
              {t('推荐下一步工作区')}
            </div>
            <Button
              variant='ghost'
              className='mt-2 h-auto w-full justify-between rounded-xl px-0 py-0 text-left'
              render={<Link to={props.summaryTo} />}
            >
              <span className='flex flex-col items-start gap-0.5'>
                <span className='text-sm font-medium'>{props.summaryCta}</span>
                <span className='text-muted-foreground text-xs'>
                  {t('从总览页直接进入下一个关键决策区域，保持运营动作连续推进。')}
                </span>
              </span>
              <ArrowRight className='size-4 shrink-0' aria-hidden='true' />
            </Button>
          </div>
        </div>
      </CardStaggerItem>
    </CardStaggerContainer>
  )
}

function CompactQuickAction(props: { action: QuickAction }) {
  const Icon = props.action.icon

  return (
    <Button
      variant='outline'
      size='sm'
      className='bg-background/70 h-8 min-w-24 gap-1.5 px-2.5'
      render={<Link to={props.action.to} />}
    >
      <Icon data-icon='inline-start' />
      <span>{props.action.title}</span>
    </Button>
  )
}

export function OverviewDashboard() {
  const { t } = useTranslation()
  const user = useAuthStore((state) => state.auth.user)
  const { items: apiInfoItems } = useApiInfo()
  const {
    apiInfo: showApiInfoPanel,
    announcements: showAnnouncementsPanel,
    faq: showFAQPanel,
    uptimeKuma: showUptimePanel,
  } = useDashboardContentVisibility()
  const [manualSetupGuideExpanded, setManualSetupGuideExpanded] = useState<
    boolean | null
  >(() => getSavedSetupGuideExpanded())

  const requestCount = Number(user?.request_count ?? 0)
  const remainQuota = Number(user?.quota ?? 0)
  const usedQuota = Number(user?.used_quota ?? 0)
  const isAdmin = Boolean(user?.role && user.role >= ROLE.ADMIN)

  const apiKeysQuery = useQuery({
    queryKey: ['dashboard', 'overview', 'api-keys'],
    queryFn: async () => {
      const result = await getApiKeys({ p: 1, size: 10 })
      return result.success ? (result.data?.items ?? []) : []
    },
    staleTime: 60 * 1000,
  })

  const modelsQuery = useQuery({
    queryKey: ['dashboard', 'overview', 'user-models'],
    queryFn: async () => {
      const result = await getUserModels()
      return result.success ? (result.data ?? []) : []
    },
    staleTime: 5 * 60 * 1000,
  })

  const preferredKey = useMemo(
    () => getPreferredKey(apiKeysQuery.data ?? []),
    [apiKeysQuery.data]
  )

  const realKeyQuery = useQuery({
    queryKey: ['dashboard', 'overview', 'token-key', preferredKey?.id],
    queryFn: async () => {
      if (!preferredKey?.id) return ''
      const result = await fetchTokenKey(preferredKey.id)
      return result.success && result.data?.key ? `sk-${result.data.key}` : ''
    },
    enabled: Boolean(preferredKey?.id),
    staleTime: 5 * 60 * 1000,
  })

  const startSteps = useMemo<StartStep[]>(
    () => [
      {
        title: t('创建 API 密钥'),
        description: t('为应用、团队或交付环境签发访问凭证'),
        to: '/keys',
        icon: KeyRound,
        completed: Boolean(preferredKey),
      },
      {
        title: t('补充余额'),
        description: t('在正式流量接入前准备稳定可用的额度缓冲'),
        to: '/wallet',
        icon: CreditCard,
        completed: remainQuota > 0 || usedQuota > 0,
      },
      {
        title: t('发起验证请求'),
        description: t('通过 Playground 或业务客户端验证首条调用链路'),
        to: '/playground',
        icon: TerminalSquare,
        completed: requestCount > 0,
      },
    ],
    [preferredKey, remainQuota, requestCount, t, usedQuota]
  )

  const quickActions = useMemo<QuickAction[]>(
    () => [
      {
        title: t('即时调试台'),
        description: t('直接在浏览器中测试模型、提示词与响应效果'),
        to: '/playground',
        icon: Play,
      },
      {
        title: t('渠道编排'),
        description: t('配置上游供应商、路由策略与交付链路。'),
        to: '/channels',
        icon: RadioTower,
        adminOnly: true,
      },
      {
        title: t('调用日志'),
        description: t('查看请求明细、错误状态与计费结果'),
        to: '/usage-logs',
        icon: FileText,
      },
      {
        title: t('模型定价目录'),
        description: t('在放量前审阅模型价格、能力与商业化策略'),
        to: '/pricing',
        icon: BookOpen,
      },
    ],
    [t]
  )

  const visibleQuickActions = useMemo(
    () => quickActions.filter((action) => !action.adminOnly || isAdmin),
    [isAdmin, quickActions]
  )

  const heroSignals = useMemo<HeroSignal[]>(
    () => [
      {
        label: t('路由状态'),
        value: apiInfoItems.length > 0 ? t('已联通') : t('当前域名可用'),
        icon: RadioTower,
      },
      {
        label: t('鉴权配置'),
        value: preferredKey ? t('已加固') : t('待创建密钥'),
        icon: ShieldCheck,
      },
      {
        label: t('默认模型'),
        value: modelsQuery.data?.[0] ?? t('加载中'),
        icon: Timer,
      },
    ],
    [apiInfoItems.length, modelsQuery.data, preferredKey, t]
  )

  const requestExample = useMemo<RequestExample>(() => {
    const endpoint = normalizeEndpoint(apiInfoItems[0]?.url)
    const model = modelsQuery.data?.[0] ?? 'gpt-4o-mini'
    const apiKey = realKeyQuery.data ?? ''
    const keyName = preferredKey?.name ?? t('尚未创建 API 密钥')
    const ready = Boolean(apiKey && model)

    return {
      endpoint,
      model,
      keyName,
      displayKey: formatDisplayKey(apiKey),
      ready,
      curl: buildCurlCommand({
        endpoint,
        apiKey: apiKey || 'sk-...',
        model,
      }),
    }
  }, [apiInfoItems, modelsQuery.data, preferredKey, realKeyQuery.data, t])

  const completedStepCount = startSteps.filter((step) => step.completed).length
  const setupComplete = completedStepCount === startSteps.length

  const operatingBriefItems = useMemo<OperatingBriefItem[]>(
    () => [
      {
        label: t('就绪度'),
        value: `${completedStepCount}/${startSteps.length}`,
        description: setupComplete
          ? t('基础开通动作已完成，当前工作台已具备承接验证流量与交付演示的条件。')
          : t('优先完成首轮开通清单，降低对外试运行前的接入与运营风险。'),
        icon: ListChecks,
      },
      {
        label: t('主力模型'),
        value: modelsQuery.data?.[0] ?? t('加载中'),
        description: t(
          '保持一个明确的默认模型，有助于产品、交付、支持与运营团队共享同一条路由认知。'
        ),
        icon: Timer,
      },
      {
        label: t('余额态势'),
        value:
          remainQuota > 0
            ? t('额度充足')
            : usedQuota > 0
              ? t('曾有消耗')
              : t('待补充余额'),
        description:
          remainQuota > 0
            ? t('当前额度足以支撑验证、演示与受控放量阶段的核心流量。')
            : t('在将工作台作为稳定服务面对团队或客户前，应先完成充值与额度准备。'),
        icon: CreditCard,
      },
      {
        label: t('流量信号'),
        value: requestCount > 0 ? t('已有请求进入') : t('暂无近期流量'),
        description:
          requestCount > 0
            ? t('已观测到真实调用，说明网关正在承接有效工作负载。')
            : t('建议通过 Playground 或业务客户端发起首条请求，完成链路闭环验证。'),
        icon: RadioTower,
      },
    ],
    [
      completedStepCount,
      modelsQuery.data,
      remainQuota,
      requestCount,
      setupComplete,
      startSteps.length,
      t,
      usedQuota,
    ]
  )

  const setupGuideExpanded = manualSetupGuideExpanded ?? !setupComplete
  const showLeftContentPanels =
    isAdmin || showApiInfoPanel || showAnnouncementsPanel || showFAQPanel
  const showContentPanels = showLeftContentPanels || showUptimePanel

  const operationalSummary = useMemo(() => {
    if (!preferredKey) {
      return {
        title: t('先完成访问层闭环'),
        body: t(
          '当前最具价值的动作，是先签发首个面向生产或测试环境的 API 密钥，让团队从配置阶段进入可验证、可交付的接入阶段。'
        ),
        cta: t('立即创建首个 API 密钥'),
        to: '/keys' as const,
      }
    }

    if (remainQuota <= 0) {
      return {
        title: t('余额是当前放量阻塞点'),
        body: t(
          '即使路由与鉴权已经具备，余额不足仍会给演示、试点与共享环境带来不必要的服务中断风险。'
        ),
        cta: t('前往钱包检查并充值'),
        to: '/wallet' as const,
      }
    }

    if (requestCount <= 0) {
      return {
        title: t('补齐首条真实请求验证'),
        body: t(
          '平台已经完成基本配置，但尚未形成可观测的真实调用。完成首条请求，才能把开通动作转化为可复用的交付流程。'
        ),
        cta: t('进入 Playground 完成验证'),
        to: '/playground' as const,
      }
    }

    return {
      title: t('从开通视角转向运营复盘'),
      body: t(
        '当前基础能力已具备，下一步重点应转向调用日志与定价结构复盘，确保路由策略、毛利空间与服务质量保持一致。'
      ),
      cta: t('查看调用与定价态势'),
      to: '/usage-logs' as const,
    }
  }, [preferredKey, remainQuota, requestCount, t])

  const operationsFocusItems = useMemo<OperationsFocusItem[]>(() => {
    const activeModels = modelsQuery.data?.length ?? 0
    const balanceStatus =
      remainQuota > 0
        ? t('可调用且额度充足')
        : usedQuota > 0
          ? t('需恢复预算连续性')
          : t('等待充值开通')

    return [
      {
        label: t('访问层'),
        value: preferredKey ? t('已保护') : t('待完成'),
        description: preferredKey
          ? t('密钥已建立，内部团队与客户流量均可通过受控凭证接入统一网关。')
          : t('先发放首个 API 密钥，让工作台从配置态进入可路由的服务态。'),
      },
      {
        label: t('模型资产'),
        value:
          activeModels > 0
            ? t('已上线 {{count}} 个模型', { count: activeModels })
            : t('待配置路由'),
        description:
          activeModels > 0
            ? t('清晰可见的默认模型与候选模型，有助于产品、运营与支持团队对外统一交付范围。')
            : t('至少接入一个可用模型，便于下游团队验证真实生产路由。'),
      },
      {
        label: t('预算态势'),
        value: balanceStatus,
        description:
          remainQuota > 0
            ? t('当前充值压力较低，足以支持验证流量、演示场景与受控放量。')
            : t('额度是稳定流量承接的核心限制项，应先解决后再将其视作可长期交付的平台。'),
      },
    ]
  }, [modelsQuery.data, preferredKey, remainQuota, t, usedQuota])

  const operationsCadence = useMemo(() => {
    if (!preferredKey) {
      return {
        title: t('基础阶段：先加固访问，再考虑放量'),
        body: t(
          '建议工作台按照“密钥签发—额度准备—首条验证—持续监控”的节奏推进，这样能在接入真实流量前显著降低上线风险。'
        ),
      }
    }

    if (remainQuota <= 0) {
      return {
        title: t('商业准备阶段：恢复预算连续性'),
        body: t(
          '当访问与路由已经具备后，余额覆盖能力就成为演示、试点与内部协作是否稳定的关键条件。'
        ),
      }
    }

    if (requestCount <= 0) {
      return {
        title: t('激活阶段：把配置转化为真实流量'),
        body: t(
          '即使已经完成充值与配置，仍需要至少一条真实调用链路，才能证明当前入口是可交付、可复用的服务端点。'
        ),
      }
    }

    return {
      title: t('运营阶段：持续复盘成本、质量与流量'),
      body: t(
        '当真实流量已经进入后，首页应把团队引导到定价结构、调用证据与服务健康等高价值运营视角，而不是重复开通动作。'
      ),
    }
  }, [preferredKey, remainQuota, requestCount, t])

  const handleSetupGuideToggle = () => {
    const nextExpanded = !setupGuideExpanded
    setManualSetupGuideExpanded(nextExpanded)
    saveSetupGuideExpanded(nextExpanded)
  }

  return (
    <div className='flex flex-col gap-4 section-divider pt-4'>
      {setupGuideExpanded ? (
        <CardStaggerContainer className='grid items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]'>
          <CardStaggerItem className='bg-card h-full overflow-hidden rounded-2xl border shadow-xs'>
            <div className='relative h-full overflow-hidden p-4 sm:p-5'>
              <SetupGuideBackdrop />
              <div className='relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]'>
                <div className='flex min-w-0 flex-col gap-5'>
                  <div className='flex flex-wrap items-start justify-between gap-3'>
                    <div className='flex max-w-2xl flex-col gap-1'>
                      <div className='mb-3 inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-white/75 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase shadow-sm backdrop-blur'>
                        <ListChecks className='size-3.5' aria-hidden='true' />
                        {t('快速开通')}
                      </div>
                      <h3 className='text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl'>
                        {t('在一个页面内完成核心上线准备')}
                      </h3>
                      <p className='max-w-xl text-sm leading-relaxed text-slate-600'>
                        {t(
                          '将密钥签发、额度准备、链路验证与服务状态收束在同一入口，帮助团队以更低认知成本完成上线前准备。'
                        )}
                      </p>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handleSetupGuideToggle}
                      >
                        <ChevronUp data-icon='inline-start' />
                        {t('收起开通指南')}
                      </Button>
                      <Button size='sm' render={<Link to='/keys' />}>
                        <KeyRound data-icon='inline-start' />
                        {t('创建 API 密钥')}
                      </Button>
                    </div>
                  </div>

                  <ol className='bg-background/45 rounded-2xl border p-2 backdrop-blur'>
                    {startSteps.map((step, index) => (
                      <StartStepItem
                        key={step.title}
                        step={step}
                        index={index}
                        isLast={index === startSteps.length - 1}
                      />
                    ))}
                  </ol>
                </div>

                <RequestPreview
                  example={requestExample}
                  signals={heroSignals}
                />
              </div>
            </div>
          </CardStaggerItem>

          <CardStaggerItem className='bg-card h-full rounded-2xl border p-4 shadow-xs sm:p-5'>
            <div className='flex h-full flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <div className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
                  {t('推荐动作')}
                </div>
                <h3 className='text-lg font-semibold tracking-tight text-slate-900'>
                  {t('让平台始终保持可交付状态')}
                </h3>
              </div>
              <div className='grid gap-2'>
                {visibleQuickActions.map((action) => (
                  <QuickActionItem key={action.title} action={action} />
                ))}
              </div>
            </div>
          </CardStaggerItem>
        </CardStaggerContainer>
      ) : (
        <CardStaggerContainer>
          <CardStaggerItem className='bg-card overflow-hidden rounded-2xl border shadow-xs'>
            <div className='relative overflow-hidden px-4 py-3 sm:px-5'>
              <SetupGuideBackdrop compact />
              <div className='relative flex flex-wrap items-center justify-between gap-3'>
                <div className='flex min-w-0 items-center gap-3'>
                  <span className='bg-background/70 flex size-9 shrink-0 items-center justify-center rounded-xl border shadow-xs'>
                    <Check className='text-success size-4' aria-hidden='true' />
                  </span>
                  <div className='min-w-0'>
                    <div className='flex items-center gap-2'>
                      <h3 className='gradient-text truncate text-sm font-semibold'>
                        {setupComplete
                          ? t('开通指南已完成')
                          : t('开通指南')}
                      </h3>
                      <span className='text-muted-foreground bg-background/60 rounded-md border px-2 py-0.5 text-xs'>
                        {t('开通进度：{{completed}}/{{total}}', {
                          completed: completedStepCount,
                          total: startSteps.length,
                        })}
                      </span>
                    </div>
                    <p className='text-muted-foreground line-clamp-1 text-xs'>
                      {setupComplete
                        ? t(
                            '已折叠开通指南，让首页更聚焦真实调用、预算与运营观察。'
                          )
                        : t('开通指南当前已收起，你可以随时展开继续完成准备动作。')}
                    </p>
                  </div>
                </div>

                <div className='flex flex-wrap items-center gap-2'>
                  {visibleQuickActions.map((action) => (
                    <CompactQuickAction key={action.title} action={action} />
                  ))}
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-background/70 h-8 min-w-28'
                    onClick={handleSetupGuideToggle}
                  >
                    <ChevronDown data-icon='inline-start' />
                    {t('展开开通指南')}
                  </Button>
                </div>
              </div>
            </div>
          </CardStaggerItem>
        </CardStaggerContainer>
      )}

      <OperatingBriefCard
        items={operatingBriefItems}
        summaryTitle={operationalSummary.title}
        summaryBody={operationalSummary.body}
        summaryCta={operationalSummary.cta}
        summaryTo={operationalSummary.to}
        operationsTitle={operationsCadence.title}
        operationsBody={operationsCadence.body}
        operationsFocus={operationsFocusItems}
      />

      <SummaryCards />

      {showContentPanels && (
        <CardStaggerContainer
          className={cn(
            'grid grid-cols-1 gap-4',
            showLeftContentPanels &&
              showUptimePanel &&
              'xl:grid-cols-[minmax(0,1fr)_22rem]'
          )}
        >
          {showLeftContentPanels && (
            <div
              className={cn(
                'grid min-w-0 grid-cols-1 gap-4',
                (showApiInfoPanel || showAnnouncementsPanel || showFAQPanel) &&
                  'lg:grid-cols-2'
              )}
            >
              {isAdmin && (
                <CardStaggerItem className='lg:col-span-2'>
                  <PerformanceHealthPanel />
                </CardStaggerItem>
              )}
              {showApiInfoPanel && (
                <CardStaggerItem>
                  <ApiInfoPanel />
                </CardStaggerItem>
              )}
              {showAnnouncementsPanel && (
                <CardStaggerItem>
                  <AnnouncementsPanel />
                </CardStaggerItem>
              )}
              {showFAQPanel && (
                <CardStaggerItem>
                  <FAQPanel />
                </CardStaggerItem>
              )}
            </div>
          )}
          {showUptimePanel && (
            <CardStaggerItem>
              <UptimePanel />
            </CardStaggerItem>
          )}
        </CardStaggerContainer>
      )}
    </div>
  )
}
