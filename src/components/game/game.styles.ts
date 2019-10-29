import styled from '@emotion/styled'
import { FlexCenter } from '../../styles'
import themeUtils from '../../styles/themeUtils'

export const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  background-color: #000;
  ${FlexCenter};
`

export const Container = styled('div')`
  width: 960px;
  height: 600px;
  background-color: #1c2323;
  color: white;
  position: relative;
  ${FlexCenter};
  flex-flow: column wrap;
  justify-content: space-around;
`

export const StyledButton = styled('button')`
  display: block;
  width: 200px;
  height: 40px;
  text-align: center;
  color: white;
  border-radius: 6px;
  background-color: chocolate;
  cursor: pointer;
`

export const StyledInput = styled('input')`
  height: 30px;
  background-color: white;
  color: black;
  font-size: ${themeUtils.font.medium};
`

export const Status = styled('div')`
  font-size: ${themeUtils.font.medium};
`
