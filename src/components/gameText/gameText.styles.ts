import styled from '@emotion/styled'
import themeUtils from '../../styles/themeUtils'

export const Wrapper = styled('pre')`
  display: block;
  padding: 10px;
  margin: 0 0 10px;
  line-height: 1.4286;
  color: #7b8a8b;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #ecf0f1;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const Container = styled('code')`
  font-family: 'Source Code Pro', monospace;
  font-size: ${themeUtils.font.small};
  display: block;
  padding: 0.5em;
  color: #333;
  background: #f8f8ff;
  white-space: pre-wrap;
  border-radius: 4px;

  .comment {
    opacity: 0.7;
  }

  .code-char {
    &.untyped {
      opacity: 0.7;
    }

    &.typed {
      opacity: 1;
    }

    &.mistake {
      background-color: #df2e1b;
      color: #fff;
    }

    &.mistake-path {
      color: #df2e1b;
    }

    &.player.mistaken {
      background-color: #7f9293;
      color: #fff;
    }

    &.player {
      background-color: #1ac7a4;
      color: #fff;
    }

    &.opponent {
      background-color: #3498db;
      color: #fff;
    }

    &.return-char {
      text-align: center;
      display: inline-block;
      width: 20px;
      visibility: hidden;

      &.mistake,
      &.mistaken-path,
      &.opponent,
      &.player {
        visibility: visible;
      }

      &::before {
        content: '\\23CE';
      }

      &.backspace-char::before {
        content: '\\232B';
      }
    }
  }
`
