import React from 'react'
import { Container, StyledButton, Wrapper } from './app.styles'
import WordInput from '../wordInput'
import Timer from '../timer'

interface State {
  showButton: boolean
  wordIndex: number
  isPlaying: boolean
  inputValue: string
  time: number
  score: number
}

const appReducer = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, showButton: false, wordIndex: 0 }
    case 'TYPE_LETTER':
      return { ...state, inputValue: action.payload }
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
    wordIndex: 0,
    isPlaying: false,
    inputValue: '',
    time: 60,
    score: 0
  })

  const handleClick = (): void => {
    dispatch({ type: 'START_GAME' })
  }

  const handleTyping = (value: string): void => {
    dispatch({ type: 'TYPE_LETTER', payload: value })
  }

  return (
    <Wrapper>
      <Container>
        <h1>{words[state.wordIndex].word}</h1>
        <WordInput value={state.inputValue} onChange={handleTyping} />
        <Timer seconds={state.time} />
        <p>Score: </p>
        <StyledButton onClick={handleClick}>Start</StyledButton>
      </Container>
    </Wrapper>
  )
}

export default App
