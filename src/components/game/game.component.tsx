import React from 'react'
import { Container, Wrapper, Status } from './game.styles'
import { TypingPanel } from '../typingPanel'
import { CameraView } from '../cameraView'

interface State {
  startTime: number | null
  wpm: number
  progress: number
}

const appReducer = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        startTime: action.payload
      }
    case 'MAKE_PROGRESS':
      return {
        ...state,
        wpm: action.payload.wpm,
        progress: action.payload.progress
      }
    default:
      throw new Error('Wrong action provided to the appReducer')
  }
}

function Game({ text }: { text: string }): JSX.Element {
  const [state, dispatch] = React.useReducer(appReducer, {
    startTime: null,
    wpm: 0,
    progress: 0
  })

  const onType = (): void => {
    if (state.startTime == null) {
      dispatch({ type: 'START_GAME', payload: Date.now() })
    }
  }

  const onProgress = (current, total): void => {
    dispatch({
      type: 'MAKE_PROGRESS',
      payload: {
        progress: current / total,
        wpm: current / 5 / ((Date.now() - (state.startTime || 0)) / 60000)
      }
    })
  }

  return (
    <Wrapper>
      <Container>
        <TypingPanel text={text} onProgress={onProgress} onType={onType} />
        <Status>
          {`${(state.progress * 100).toFixed(0)}% completed ${state.wpm ? `, ${state.wpm.toFixed(0)} WPM` : ''}`}
        </Status>
        <CameraView />
      </Container>
    </Wrapper>
  )
}

export default Game
