import React from 'react'
import { Container, Wrapper } from './app.styles'
import WordInput from '../wordInput'
import Timer from '../timer'
import themeUtils from '../../styles/themeUtils'
import SummaryScreen from '../summaryScreen'
import StartScreen from '../startScreen'

interface State {
  playerName: string
  currentWord: string
  isPlaying: boolean
  hasEnded: boolean
  inputValue: string
  time: number
  score: number
}

interface Word {
  word: string
}

const GAME_TIME = 60

const appReducer = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        playerName: action.payload.playerName,
        hasEnded: false,
        isPlaying: true,
        currentWord: action.payload.currentWord,
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
      return { ...state, isPlaying: false, hasEnded: true, currentWord: '', inputValue: '' }
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
    playerName: '',
    currentWord: '',
    isPlaying: false,
    hasEnded: false,
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

  const startGame = (playerName = ''): void =>
    dispatch({ type: 'START_GAME', payload: { currentWord: getRandomWord(words), playerName } })

  const showStart = !state.isPlaying && !state.hasEnded
  const showSummary = !state.isPlaying && state.hasEnded

  return (
    <Wrapper>
      <Container>
        {showStart && (
          <StartScreen
            onEnter={(entry): void => {
              startGame(entry.playerName)
            }}
          />
        )}
        {showSummary && <SummaryScreen score={state.score} onRestart={startGame} />}
        {!showStart && !showSummary && (
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
              {`${state.playerName} Score: ${state.score}`}
            </p>
          </React.Fragment>
        )}
      </Container>
    </Wrapper>
  )
}

export default App
