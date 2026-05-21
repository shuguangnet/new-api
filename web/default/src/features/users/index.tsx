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
import { useTranslation } from 'react-i18next'
import { ShieldCheck, UserCheck, UserCog } from 'lucide-react'
import { SectionPageLayout } from '@/components/layout'
import { UsersDeleteDialog } from './components/users-delete-dialog'
import { UsersMutateDrawer } from './components/users-mutate-drawer'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider, useUsers } from './components/users-provider'
import { UsersTable } from './components/users-table'

function UsersContent() {
  const { t } = useTranslation()
  const { open, setOpen, currentRow } = useUsers()

  return (
    <>
      <SectionPageLayout>
        <SectionPageLayout.Title>{t('用户管理')}</SectionPageLayout.Title>
        <SectionPageLayout.Description>
          {t('管理平台用户、角色权限与访问控制策略')}
        </SectionPageLayout.Description>
        <SectionPageLayout.Actions>
          <UsersPrimaryButtons />
        </SectionPageLayout.Actions>
        <SectionPageLayout.Content>
          {/* Enterprise workspace header */}
          <div className='relative mb-5 overflow-hidden rounded-[28px] border border-slate-200/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_42%,rgba(243,244,246,0.78)_100%)] px-5 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6'>
            <div
              className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-400/60 to-transparent'
              aria-hidden='true'
            />
            <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
              <div className='max-w-3xl space-y-3'>
                <div className='inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50/85 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-violet-700 uppercase'>
                  <span className='h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.35)]' />
                  {t('平台用户管理中心')}
                </div>
                <h2 className='text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl'>
                  {t('账户、角色与访问权限')}
                </h2>
                <p className='text-sm leading-7 text-slate-600 sm:text-[15px]'>
                  {t('在此管理平台所有用户的账户信息、角色分配（普通用户 / 管理员）、调用配额、分组归属与状态管控。角色的权限范围决定用户可访问的功能模块与数据范围，是平台多租户运营的基础。')}
                </p>
              </div>
              <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px]'>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <UserCheck className='size-3.5 text-violet-600' aria-hidden='true' />
                    {t('角色体系')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('普通用户 / 管理员')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('最小权限原则管控')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <UserCog className='size-3.5 text-violet-600' aria-hidden='true' />
                    {t('配额管控')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('按用户分配额度')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('精细化成本与用量管理')}
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-200/85 bg-white/88 px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]'>
                  <div className='flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase'>
                    <ShieldCheck className='size-3.5 text-violet-600' aria-hidden='true' />
                    {t('状态管理')}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-900'>
                    {t('启用 / 禁用 / 封禁')}
                  </div>
                  <p className='mt-1 text-xs leading-5 text-slate-500'>
                    {t('灵活的生命周期管控')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <UsersTable />
        </SectionPageLayout.Content>
      </SectionPageLayout>

      <UsersMutateDrawer
        open={open === 'create' || open === 'update'}
        onOpenChange={(isOpen) => !isOpen && setOpen(null)}
        currentRow={open === 'update' ? currentRow || undefined : undefined}
      />
      <UsersDeleteDialog />
    </>
  )
}

export function Users() {
  return (
    <UsersProvider>
      <UsersContent />
    </UsersProvider>
  )
}
