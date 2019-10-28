import React from 'react'
import { Container, StyledButton, Wrapper, StyledInput } from './app.styles'

interface State {
  showButton: boolean
  wordIndex: number
}

const appReducer = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, showButton: false, wordIndex: 0 }
    default:
      throw new Error('Wrong action provided to the appReducer')
  }
}

function getRandomWord(words: string[]): { index: number; word: string } {
  const rand = Math.floor(Math.random() * words.length)
  return { index: rand, word: words[rand] }
}

function App({ words }: { words: any }): JSX.Element {
  const [state, dispatch] = React.useReducer(appReducer, {
    showButton: true,
    wordIndex: 0
  })

  const handleClick = (): void => {
    dispatch({ type: 'START_GAME' })
  }

  return (
    <Wrapper>
      <Container>
        <h1>{words[state.wordIndex].word}</h1>
        <StyledInput placeholder="Type here" />
        <p>Time left: </p>
        <p>Score: </p>
        <StyledButton onClick={handleClick}>Start</StyledButton>
      </Container>
    </Wrapper>
  )
}

export default App
