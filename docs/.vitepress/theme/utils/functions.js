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
