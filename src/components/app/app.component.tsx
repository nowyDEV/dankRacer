import React from 'react'
import { Container, StyledButton, Wrapper } from './app.styles'
import WordInput from '../wordInput'
import Timer from '../timer'
import themeUtils from '../../styles/themeUtils'
import Summary from '../summary'

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

const GAME_TIME = 5

const appReducer = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        showButton: false,
        isPlaying: true,
        currentWord: action.payload,
        score: 0,
        time: GAME_TIME
      }
    case 'TYPE_LETTER':
      return { ...state, inputValue: action.payload }
    case 'SET_NEW_WORD':
      return { ...state, currentWord: action.payload }
    case 'REDUCE_TIME':
      return { ...state, time: state.time - 1 }
    case 'MAKE_SCORE':
      return { ...state, inputValue: '', currentWord: action.payload, score: state.score + 1 }
    case 'END_GAME':
      return { ...state, isPlaying: false, currentWord: '' }
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
    time: GAME_TIME,
    score: 0
  })

  const matchWords = (value: string): boolean => {
    return state.currentWord.toLowerCase() === value
  }

  const generateNewWord = (): void => {
    dispatch({ type: 'SET_NEW_WORD', payload: getRandomWord(words) })
  }

  const handleClick = (): void => {
    dispatch({ type: 'START_GAME', payload: getRandomWord(words) })
  }

  const handleTyping = (value: string): void => {
    dispatch({ type: 'TYPE_LETTER', payload: value })
    if (matchWords(value)) {
      dispatch({ type: 'MAKE_SCORE' })
      generateNewWord()
    }
  }

  const handleTick = (): void => {
    if (state.time > 0) {
      dispatch({ type: 'REDUCE_TIME' })
      return
    }

    dispatch({ type: 'END_GAME' })
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

            <Timer seconds={state.time} onTick={handleTick} />
            <p
              css={{
                fontSize: themeUtils.font.large
              }}
            >
              {`Score: ${state.score}`}
            </p>
          </React.Fragment>
        ) : state.showButton ? (
          <StyledButton onClick={handleClick}>Start</StyledButton>
        ) : (
          <React.Fragment>
            <Summary score={state.score} />
            <StyledButton onClick={handleClick}>Start</StyledButton>
          </React.Fragment>
        )}
      </Container>
    </Wrapper>
  )
}

export default App
