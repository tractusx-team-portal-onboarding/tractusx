import { PAGES, ROLES } from '../types/MainTypes'
import UserService from './UserService'

const pagePermissions: { [page: string]: string } = {
  [PAGES.ROOT]: ROLES.EVERYONE,
  [PAGES.DASHBOARD]: ROLES.EVERYONE,
  [PAGES.APPSTORE]: ROLES.EVERYONE,
  [PAGES.DATACATALOG]: ROLES.DATACATALOG_VIEW,
  [PAGES.DIGITALTWIN]: ROLES.DIGITALTWIN_VIEW,
  [PAGES.SEMANTICHUB]: ROLES.SEMANTICHUB_VIEW,
  [PAGES.ADMINISTRATION]: ROLES.CX_ADMIN,
  [PAGES.DEVELOPERHUB]: ROLES.DEVELOPER,
  [PAGES.CONNECTOR]: ROLES.ADMIN_CONNECTOR,
  [PAGES.ACCOUNT]: ROLES.EVERYONE,
  [PAGES.NOTIFICATIONS]: ROLES.EVERYONE,
  [PAGES.ORGANIZATION]: ROLES.EVERYONE,
  [PAGES.PARTNER_NETWORK]: ROLES.EVERYONE,
  [PAGES.USER_MANAGEMENT]: ROLES.ADMIN_USER,
  [PAGES.ADMINISTRATION]: ROLES.CX_ADMIN,
  [PAGES.TRANSLATOR]: ROLES.PORTAL_DEVELOPER,
  [PAGES.LOGOUT]: ROLES.EVERYONE,
}

const mainMenuFull = [
  PAGES.DASHBOARD,
  PAGES.APPSTORE,
  PAGES.DATACATALOG,
  PAGES.DIGITALTWIN,
  PAGES.SEMANTICHUB,
  PAGES.DEVELOPERHUB,
]

const userMenuFull = [
  PAGES.ACCOUNT,
  PAGES.NOTIFICATIONS,
  PAGES.ORGANIZATION,
  PAGES.PARTNER_NETWORK,
  PAGES.USER_MANAGEMENT,
  PAGES.ADMINISTRATION,
  PAGES.LOGOUT,
]

const hasAccess = (page: string): boolean =>
  UserService.hasRole(pagePermissions[page]) ||
  pagePermissions[page] === ROLES.EVERYONE

const mainMenu = (): string[] => {
  return mainMenuFull.filter((page) => hasAccess(page))
}

const userMenu = (): string[] => {
  return userMenuFull.filter((page) => hasAccess(page))
}

const AccessService = {
  hasAccess,
  mainMenu,
  userMenu,
}

export default AccessService
