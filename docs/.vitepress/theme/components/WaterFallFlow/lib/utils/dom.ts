import type { CssStyleObject } from '../types/utils'

export function hasClass(el: HTMLElement, className: string) {
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`)
  return reg.test(el.className)
}

export function addClass(el: HTMLElement, className: string) {
  if (hasClass(el, className))
    return

  const newClass = el.className.split(/\s+/)
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass(el: HTMLElement, className: string) {
  if (hasClass(el, className)) {
    const newClass = el.className.split(/\s+/).filter(name => name !== className)
    el.className = newClass.join(' ')
  }
}

const elementStyle = document.createElement('div').style as CssStyleObject

const vendor = (() => {
  const transformNames: Record<string, string> = {
    standard: 'transform',
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
  }

  for (const key in transformNames) {
    const val = transformNames[key]
    if (elementStyle[val] !== undefined)
      return key
  }

  return false
})()

export function prefixStyle(style: string) {
  if (vendor === false)
    return false

  if (vendor === 'standard')
    return style

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
