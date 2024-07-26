import { createAuth0Client } from '@auth0/auth0-spa-js'
import { authConfig } from './auth_config'

let auth0Client

export const initAuth0 = async () => {
  if (!auth0Client) {
    auth0Client = await createAuth0Client({
      domain: authConfig.domain,
      clientId: authConfig.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin + '/callback',
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true, // 启用刷新令牌
      cacheExpiration: 3600, // 自定义缓存有效期（以秒为单位）
    })
  }
  return auth0Client
}

export const login = async () => {
  const auth0 = await initAuth0()
  // 保存用户登录前的页面URL
  localStorage.setItem('preLoginRedirect', window.location.href)
  await auth0.loginWithRedirect()
}

export const logout = async () => {
  const auth0 = await initAuth0()
  auth0.logout({
    returnTo: window.location.origin,
  })
}

export const isAuthenticated = async () => {
  const auth0 = await initAuth0()
  return await auth0.isAuthenticated()
}

export const getUser = async () => {
  const auth0 = await initAuth0()
  return await auth0.getUser()
}
