import React from 'react'
import { Container, StyledButton, Wrapper } from './app.styles'
import WordInput from '../wordInput'
import Timer from '../timer'
import themeUtils from '../../styles/themeUtils'

interface State {
  showButton: boolean
  currentWord: string
  isPlaying: boolean
  inputValue: string
  time: number
  score: number
}

interface Word {
  word: string
}

const appReducer = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, showButton: false, isPlaying: true, currentWord: action.payload }
    case 'TYPE_LETTER':
      return { ...state, inputValue: action.payload }
    case 'SET_NEW_WORD':
      return { ...state, currentWord: action.payload }
    case 'REDUCE_TIME':
      return { ...state, time: state.time - 1 }
    default:
      throw new Error('Wrong action provided to the appReducer')
  }
}

function getRandomWord(words: Word[]): string {
  const rand = Math.floor(Math.random() * words.length)
  return words[rand].word
}

function App({ words }: { words: Word[] }): JSX.Element {
  const [state, dispatch] = React.useReducer(appReducer, {
    showButton: true,
    currentWord: '',
    isPlaying: false,
    inputValue: '',
    time: 60,
    score: 0
  })

  const updateCurrentWord = (): void => {
    dispatch({ type: 'SET_NEW_WORD', payload: getRandomWord(words) })
  }

  const handleClick = (): void => {
    dispatch({ type: 'START_GAME', payload: getRandomWord(words) })
  }

  const handleTyping = (value: string): void => {
    dispatch({ type: 'TYPE_LETTER', payload: value })
    updateCurrentWord()
  }

  return (
    <Wrapper>
      <Container>
        {state.isPlaying ? (
          <React.Fragment>
            <h1
              css={{
                fontSize: themeUtils.font.large,
                marginBottom: '30px'
              }}
            >
              {state.currentWord}
            </h1>
            <WordInput value={state.inputValue} onChange={handleTyping} />

            <Timer seconds={state.time} onTick={(): void => dispatch({ type: 'REDUCE_TIME' })} />
            <p
              css={{
                fontSize: themeUtils.font.large
              }}
            >
              {`Score: ${state.score}`}
            </p>
          </React.Fragment>
        ) : (
          <StyledButton onClick={handleClick}>Start</StyledButton>
        )}
      </Container>
    </Wrapper>
  )
}

export default App
