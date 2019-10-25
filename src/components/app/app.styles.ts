import styled from '@emotion/styled'
import { FlexCenter, SelfCenter } from '../../styles'
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
`

export const VerticalLine = styled('div')`
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: red;
  right: 150px;
`

export const TextField = styled('div')`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 150px;
  height: 100px;
  text-align: center;
  color: antiquewhite;
  font-size: ${themeUtils.font.base};
`

export const StyledButton = styled('button')`
  display: block;
  position: absolute;
  width: 200px;
  height: 40px;
  text-align: center;
  color: white;
  border-radius: 6px;
  background-color: chocolate;
  top: 260px;
  left: 325px;
  cursor: pointer;
  ${SelfCenter};
`
