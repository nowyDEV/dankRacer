import themeUtils from './themeUtils'

const { breakpoints } = themeUtils

export const mq = (n: string): string | number => {
  const bpArray = Object.keys(breakpoints).map((key: string): (string | number)[] => [key, breakpoints[key]])

  const [result] = bpArray.reduce((acc, [name, size]): (string | number)[] => {
    return n === name ? [...acc, `@media (min-width: ${size}em)`] : acc
  }, [])

  return result
}
