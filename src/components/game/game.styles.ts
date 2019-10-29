import styled from '@emotion/styled'
import { FlexCenter } from '../../styles'
import themeUtils from '../../styles/themeUtils'
import BackgroundImage from '../../assets/images/carmageddon-max-damage.jpg'

export const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  background: url('${BackgroundImage}') no-repeat;
  background-size: cover;
  ${FlexCenter};
`

export const Container = styled('div')`
  width: 960px;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  position: relative;
  ${FlexCenter};
  flex-flow: column wrap;
  justify-content: space-between;
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
