import React from 'react'
import GameGrid from '../gameGrid/gameGrid'
import { Container, StyledButton, TextField, VerticalLine, Wrapper, BottomContainer, StyledInput } from './app.styles'

interface State {
  showButton: boolean
  loadGrid: boolean
}

const appReducer = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, showButton: false, loadGrid: true }
    default:
      throw new Error('Wrong action provided to the appReducer')
  }
}

function App({ data }: { data: any }): JSX.Element {
  console.log(data)
  const [state, dispatch] = React.useReducer(appReducer, {
    showButton: true,
    loadGrid: false
  })

  const handleClick = (): void => {
    dispatch({ type: 'START_GAME' })
  }

  return (
    <Wrapper>
      <Container>
        {state.loadGrid && <GameGrid lines={new Array(19).fill(1)} />}
        <TextField>dank</TextField>
        {state.showButton && (
          <StyledButton type="button" onClick={handleClick}>
            Start
          </StyledButton>
        )}
        <VerticalLine />
        <BottomContainer>
          <StyledInput type="text" />
        </BottomContainer>
      </Container>
    </Wrapper>
  )
}

export default App
