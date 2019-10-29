import styled from '@emotion/styled'
import themeUtils from '../../styles/themeUtils'

export const Container = styled('div')`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 30px 15px;
`

export const GameText = styled('div')<{ ok: boolean }>`
  line-height: 1;
  font-size: ${themeUtils.font.base};

  & .past {
    color: #888;
  }

  & .present {
    color: ${props => (props.ok ? '#4a3' : '#f00')};
    background: ${props => (props.ok ? 'transparent' : '#fcc')};
    text-decoration: underline;
  }

  & .future {
    color: #333;
  }
`

export const InputArea = styled('div')`
  margin-top: 1em;

  & label {
    color: #888;
    font-size: 1.8rem;
  }
`

export const Input = styled('input')<{ ok: boolean }>`
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  font-size: 1.5em;
  background: ${props => (props.ok ? 'white' : '#faa')};
  color: ${props => (props.ok ? '#333' : '#f00')};
  border: 1px solid #000;
  padding: 5px;
`
