import styled from '@emotion/styled'
import themeUtils from '../../styles/themeUtils'

export const Wrapper = styled('pre')`
  display: block;
  padding: 10px;
  margin: 0 0 10px;
  font-size: ${themeUtils.font.base};
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
  display: block;
  padding: 0.5em;
  color: #333;
  background: #f8f8ff;
  white-space: pre-wrap;
  border-radius: 4px;
`
