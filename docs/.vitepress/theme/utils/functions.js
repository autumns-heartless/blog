import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import rTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// 全局使用中文
dayjs.locale('zh-cn')

// 对时间进行格式化
export function formatTime(data, type = 'YYYY-MM-DD') {
  return dayjs(data).format(type)
}
dayjs.extend(rTime)

// 人性化时间格式
export const relativeTime = (value) => {
  return dayjs(value).fromNow()
}

dayjs.extend(duration)
// 人性化时间格式
export const durationTime = (value) => {
  return dayjs.duration(value)
}

// 通用随机获取方法
export const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

const pattern =
  /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

export function countWord(data) {
  const m = data.match(pattern)
  let count = 0
  if (!m) {
    return 0
  }
  for (let i = 0; i < m.length; i += 1) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length
    } else {
      count += 1
    }
  }
  return count
}

/**
 * 获取 URL 路径中的指定参数
 *
 * @param paramName 参数名
 * @returns 参数值
 */
export function getQueryParam(paramName) {
  const reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)')
  let value = decodeURIComponent(window.location.search.substr(1)).match(reg)
  if (value != null) {
    return unescape(value[2])
  }
  return null
}
