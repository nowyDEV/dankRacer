import React from 'react'
import { Wrapper, Container } from './gameText.styles'
import UseBindCodeCharacters from './useBindCodeCharacters'
import CodeCursor from './codeCursor'
import { getKeyEvents } from './gameText.helpers'

const Mousetrap = require('mousetrap')

interface GameState {
  time: any
  startTime: any
  code: any
  playerCursor: any
  opponents: any
  opponentCursors: any
}

const gameReducer = (state, action): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        startTime: action.payload
      }
    case 'SET_CURSOR':
      return {
        ...state,
        playerCursor: action.payload
      }
    default:
      throw new Error('Wrong action provided to the gameReducer')
  }
}

function GameText({ exercise }: { exercise: Exercise }): JSX.Element {
  const [htmlData, gameCode] = UseBindCodeCharacters(exercise.code)
  const [state, dispatch] = React.useReducer(gameReducer, {
    time: null,
    startTime: null,
    code: null,
    playerCursor: null,
    opponents: 0,
    opponentCursors: {}
  })
  const [started, setStarted] = React.useState(false)

  React.useEffect((): void => {
    const startGame = (): void => {
      if (started) {
        return
      }
      // state.startTime = new Date()
      dispatch({ type: 'START_GAME', payload: new Date() })
      setStarted(true)
    }
    startGame()

    if (!state.playerCursor) {
      dispatch({
        type: 'SET_CURSOR',
        payload: new CodeCursor({
          isMainPlayer: true,
          playerId: '',
          playerName: 'player',
          cursor: '',
          code: state.code,
          onAdvanceCursor: '',
          onRetreatCursor: '',
          onGameComplete: ''
        })
      })
    }

    Mousetrap.bind(getKeyEvents(), (e, key) => {
      e.preventDefault()
      const newKey = ['space', 'shift+space'].includes(key) ? ' ' : ['enter', 'shift+enter'].includes(key) ? '\n' : key
      state.playerCursor.processKey(newKey)
    })

    Mousetrap.bind(['backspace', 'shift+backspace'], (e, key) => {
      console.log(key)
      e.preventDefault()
      state.playerCursor.backspaceKey()
    })
  }, [])

  return (
    <Wrapper>
      <Container>
        <span ref={gameCode} id="gamecode" dangerouslySetInnerHTML={{ __html: htmlData }} />
      </Container>
    </Wrapper>
  )
}

export default GameText
