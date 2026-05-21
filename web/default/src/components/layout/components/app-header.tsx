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
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { useStatus } from '@/hooks/use-status'
import { useNotifications } from '@/hooks/use-notifications'
import { useTopNavLinks } from '@/hooks/use-top-nav-links'
import { getRoleLabel } from '@/lib/roles'
import { ConfigDrawer } from '@/components/config-drawer'
import { LanguageSwitcher } from '@/components/language-switcher'
import { NotificationButton } from '@/components/notification-button'
import { NotificationDialog } from '@/components/notification-dialog'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { defaultTopNavLinks } from '../config/top-nav.config'
import { type TopNavLink } from '../types'
import { Header } from './header'
import { SystemBrand } from './system-brand'
import { TopNav } from './top-nav'

/**
 * General application Header component
 * Integrates navigation bar, search, configuration and profile functions
 *
 * @example
 * // Basic usage
 * <AppHeader />
 *
 * @example
 * // Custom navigation links
 * <AppHeader navLinks={customLinks} />
 *
 * @example
 * // Hide navigation bar and search box
 * <AppHeader showTopNav={false} showSearch={false} />
 *
 * @example
 * // Fully customize left and right content
 * <AppHeader
 *   leftContent={<CustomLeft />}
 *   rightContent={<CustomRight />}
 * />
 */
type AppHeaderProps = {
  /**
   * Custom navigation links, uses default global navigation or dynamically generated from backend if not provided
   */
  navLinks?: TopNavLink[]
  /**
   * Whether to show top navigation bar
   * @default true
   */
  showTopNav?: boolean
  /**
   * Left content, overrides TopNav if provided
   */
  leftContent?: React.ReactNode
  /**
   * Whether to show search box
   * @default true
   */
  showSearch?: boolean
  /**
   * Custom right content, overrides default right content if provided
   */
  rightContent?: React.ReactNode
  /**
   * Whether to show notification button
   * @default true
   */
  showNotifications?: boolean
  /**
   * Whether to show config drawer
   * @default true
   */
  showConfigDrawer?: boolean
  /**
   * Whether to show profile dropdown
   * @default true
   */
  showProfileDropdown?: boolean
}

export function AppHeader({
  navLinks = defaultTopNavLinks,
  showTopNav = true,
  leftContent,
  showSearch = true,
  rightContent,
  showNotifications = true,
  showConfigDrawer = true,
  showProfileDropdown = true,
}: AppHeaderProps) {
  const { t } = useTranslation()
  const dynamicLinks = useTopNavLinks()
  const links = dynamicLinks.length > 0 ? dynamicLinks : navLinks
  const notifications = useNotifications()
  const { auth } = useAuthStore()
  const { status } = useStatus()

  const user = auth.user
  const roleLabel = getRoleLabel(user?.role)
  const userName = user?.display_name || user?.username || t('User')
  const version = status?.version || t('Unknown version')

  const quickSignals = useMemo(
    () => [
      t('Overview'),
      showSearch ? t('Search') : null,
      showNotifications ? t('Notifications') : null,
    ].filter((item): item is string => Boolean(item)),
    [showNotifications, showSearch, t]
  )

  return (
    <>
      <Header>
        <div className='flex min-w-0 flex-1 items-center gap-3 lg:gap-4'>
          <div className='app-header-brand-shell'>
            <SystemBrand variant='inline' />
            <div className='app-header-brand-copy hidden xl:flex'>
              <span className='app-header-eyebrow'>{t('Management console')}</span>
              <div className='app-header-brand-line'>
                <span className='truncate'>{t('Enterprise control center')}</span>
                <span className='app-header-dot' aria-hidden='true' />
                <span className='truncate text-muted-foreground'>
                  {t('Version')} {version}
                </span>
              </div>
            </div>
          </div>

          {leftContent ? (
            <div className='hidden min-w-0 items-center lg:flex'>{leftContent}</div>
          ) : null}

          {showTopNav ? (
            <div className='hidden min-w-0 flex-1 lg:flex'>
              <TopNav links={links} className='app-header-nav' />
            </div>
          ) : null}
        </div>

        {rightContent ?? (
          <div className='ml-auto flex min-w-0 items-center gap-2'>
            <div className='hidden items-center gap-2 xl:flex'>
              <div className='app-header-status-card'>
                <div className='app-header-eyebrow'>{t('Workspace ready')}</div>
                <div className='app-header-status-line'>
                  <span className='truncate font-medium text-foreground'>
                    {userName}
                  </span>
                  <span className='app-header-status-badge'>{roleLabel}</span>
                </div>
              </div>
              <div className='app-header-signal-group'>
                {quickSignals.map((signal) => (
                  <span key={signal} className='app-header-signal-pill'>
                    {signal}
                  </span>
                ))}
              </div>
            </div>
            {showSearch ? (
              <Search
                className='hidden lg:flex lg:w-64 xl:w-72'
                placeholder={t('Search models, channels, logs')}
              />
            ) : null}
            {showNotifications ? (
              <NotificationButton
                unreadCount={notifications.unreadCount}
                onClick={() => notifications.openDialog()}
                className='app-header-action-button'
              />
            ) : null}
            <LanguageSwitcher />
            {showConfigDrawer ? <ConfigDrawer /> : null}
            {showProfileDropdown ? <ProfileDropdown /> : null}
          </div>
        )}
      </Header>

      {showNotifications ? (
        <NotificationDialog
          open={notifications.dialogOpen}
          onOpenChange={notifications.setDialogOpen}
          activeTab={notifications.activeTab}
          onTabChange={notifications.setActiveTab}
          notice={notifications.notice}
          announcements={notifications.announcements}
          loading={notifications.loading}
          onCloseToday={notifications.closeToday}
        />
      ) : null}
    </>
  )
}
