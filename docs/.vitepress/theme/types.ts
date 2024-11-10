/* 这里存放 ts要求的内容格式 */
import type { DefaultTheme } from 'vitepress'

export interface NavLink {
  /** 站点图标 */
  icon?: string | { svg: string }
  badge?:
    | string
    | {
        text?: string
        type?: 'info' | 'tip' | 'warning' | 'danger'
      }
  /** 站点名称 */
  title: string
  /** 站点名称 */
  desc?: string
  /** 站点链接 */
  link: string
  /* 能够下载 */
  canDownLoad?: boolean
}

/* 音乐播放器 */
export interface Song {
  title?: string
  id?: number
  author?: string
  url?: string
  pic?: string
  lrc?: any
}

export interface ThemeConfig extends DefaultTheme.Config {
  sidebar?: object[]
  search: any
  nav: any
  socialLinks: any
  music?: Song[]
  outlineTitle?: string
  docFooter?: object
  darkModeSwitchLabel?: string
  sidebarMenuLabel?: string
  returnToTopLabel?: string
  article?: object
  website?: object
  logo: any
}
