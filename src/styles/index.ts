import { css } from '@emotion/core'

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullScreen = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
`

export const SelfCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const HorizontalCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

export const FullFixed = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
`
