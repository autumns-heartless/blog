/**
 * 格式化时间
 *
 * @param date 待格式化时间
 * @returns 格式化后的时间(YYYY/MM/dd AM hh:mm)
 */
export function formatDate(date: any) {
  const formatDate = new Date(date)
  return formatDate.toLocaleString('zh', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

/**
 * 获取 URL 路径中的指定参数
 *
 * @param paramName 参数名
 * @returns 参数值
 */
export function getQueryParam(paramName: any) {
  const reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)')
  let value = decodeURIComponent(window.location.search.substr(1)).match(reg)
  if (value != null) {
    return unescape(value[2])
  }
  return null
}

/**
 * 跳转到指定链接
 *
 * @param paramName 参数名
 * @param paramValue 参数值
 */
export function goToLink(url: string, paramName?: any, paramValue?: any) {
  console.log('[ url ] 🌸>', url);
  if (paramName) {
    window.location.href = url + '?' + paramName + '=' + paramValue
  } else {
    window.location.href = url
  }
}

/**
 * 获取生肖图标
 *
 * @param year 年份
 */
export function getChineseZodiac(year: any) {
  const arr = [
    'monkey',
    'rooster',
    'dog',
    'pig',
    'rat',
    'ox',
    'tiger',
    'rabbit',
    'dragon',
    'snake',
    'horse',
    'goat',
  ]
  return arr[year % 12]
}

/**
 * 获取生肖名称
 *
 * @param year 年份
 */
export function getChineseZodiacAlias(year: any) {
  const arr = [
    '猴年',
    '鸡年',
    '狗年',
    '猪年',
    '鼠年',
    '牛年',
    '虎年',
    '兔年',
    '龙年',
    '蛇年',
    '马年',
    '羊年',
  ]
  return arr[year % 12]
}
