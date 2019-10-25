import React from 'react'
import GameGrid from '../gameGrid/gameGrid'
import { Container, StyledButton, TextField, VerticalLine, Wrapper, BottomContainer, StyledInput } from './app.styles'

interface State {
  showButton: boolean
  loadGrid: boolean
  level: number
}

const NUM_OF_LINES = 19

const appReducer = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, showButton: false, loadGrid: true }
    default:
      throw new Error('Wrong action provided to the appReducer')
  }
}

function insertSpans(): void {
  console.log('add span')
}

function getRandomWord(words: string[]): { index: number; word: string } {
  const rand = Math.floor(Math.random() * words.length)
  return { index: rand, word: words[rand] }
}

function App({ words }: { words: any }): JSX.Element {
  console.log(words)
  const [state, dispatch] = React.useReducer(appReducer, {
    showButton: true,
    loadGrid: false,
    level: 6
  })

  const handleClick = (): void => {
    dispatch({ type: 'START_GAME' })
  }

  return (
    <Wrapper>
      <Container>
        {state.loadGrid && <GameGrid lines={new Array(NUM_OF_LINES).fill(1)} />}
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
