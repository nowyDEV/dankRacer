import { actionKeys, alphaKeys, numericKeys, specialKeys } from './config'

export function getKeyEvents(): string[] {
  // Bind key events
  const allAlphaKeys = [...alphaKeys, ...alphaKeys.map(key => key.toUpperCase())]

  return [...allAlphaKeys, ...numericKeys, ...specialKeys, ...actionKeys]
}

export function hasClass(el: HTMLElement, classes: string[]): boolean {
  if (el instanceof HTMLElement) {
    return classes.some(className => el.classList.contains(className))
  }
  return false
}

export function isTextNode(el: HTMLElement): boolean {
  return el.nodeType === 3
}

export function prevAll(element): HTMLElement[] {
  let el = element.previousElementSibling
  const result: HTMLElement[] = []

  while (el instanceof HTMLElement) {
    result.push(el)
    el = el.previousElementSibling
  }
  return result
}
