import React, { ReactElement } from 'react'
import { Global, css } from '@emotion/core'
import { ResetCss } from './reset'
import { FontCss } from './fonts'
import themeUtils from './themeUtils'

function GlobalStyles(): ReactElement {
  return (
    <Global
      styles={css`
        ${ResetCss};
        ${FontCss};

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 62.5%;
          height: 100%;
          /* scroll-behavior: smooth; */
        }

        body {
          font-family: ${themeUtils.fontFamily.primary};
          font-weight: 400;
          width: 100%;
          height: 100%;
          color: ${themeUtils.color.white};
          -webkit-touch-callout: none;
        }

        .root {
          width: 100%;
          height: 100%;
          position: relative;
        }

        strong {
          font-weight: bold;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        a {
          border: 0;
          background: none;

          &:focus {
            outline: none;
          }
        }
      `}
    />
  )
}

export default GlobalStyles
