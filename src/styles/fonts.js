import { css } from '@emotion/core'
import StarcraftWoff from '../assets/fonts/starcraftnormal.woff'
import StarcraftWoff2 from '../assets/fonts/starcraftnormal.woff2'

export const FontCss = css`
  @font-face {
    font-family: 'Starcraft';
    src: url(${StarcraftWoff2}) format('woff2'), url(${StarcraftWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`
