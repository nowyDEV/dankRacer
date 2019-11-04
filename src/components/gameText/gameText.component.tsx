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

    const scrollToCursor = (cursor): void => {
      // Make sure the cursor DOM element exists
      if (cursor.cursor.length) {
        const windowHeight = window.innerHeight
        const cursorPos = cursor.cursor.getBoundingClientRect().top + document.body.scrollTop
        const windowPos = window.pageYOffset + windowHeight

        // Begin scrolling when 25% from the bottom
        if (windowPos - cursorPos < windowHeight * 0.25) {
          window.scrollTo(0, cursorPos - windowHeight * 0.25)
        }
      }
    }

    // TODO
    const updatePlayerProgress = (cursor): void => {
      console.log(cursor)
    }

    const onPlayerAdvanceCursor = (cursor): void => {
      scrollToCursor(cursor)
      updatePlayerProgress(cursor)
    }

    const completeGame = (cursor): void => {
      console.log('emit ingame:complete', cursor)
    }

    if (!state.playerCursor) {
      const el = document.querySelector('.code-char')
      if (el instanceof HTMLElement) {
        dispatch({
          type: 'SET_CURSOR',
          payload: new CodeCursor({
            isMainPlayer: true,
            playerId: '666',
            playerName: 'player',
            cursor: el,
            code: exercise.code,
            onAdvanceCursor: onPlayerAdvanceCursor,
            onRetreatCursor: null,
            onGameComplete: completeGame
          })
        })
      }
    }

    startGame()
  }, [htmlData])

  React.useEffect((): (() => void) => {
    const handleBackspace = (e, key): void => {
      console.log(key)
      e.preventDefault()
      state.playerCursor.backspaceKey()
    }

    const handleKeyPress = (e, key): void => {
      e.preventDefault()
      const newKey = ['space', 'shift+space'].includes(key) ? ' ' : ['enter', 'shift+enter'].includes(key) ? '\n' : key
      state.playerCursor.processKey(newKey)
    }

    Mousetrap.bind(getKeyEvents(), handleKeyPress)
    Mousetrap.bind(['backspace', 'shift+backspace'], handleBackspace)
    return (): void => {
      Mousetrap.unbind(getKeyEvents(), handleKeyPress)
      Mousetrap.unbind(['backspace', 'shift+backspace'], handleBackspace)
    }
  }, [state.playerCursor])

  console.log('state: ', state)

  return (
    <Wrapper>
      <Container>
        <span ref={gameCode} id="gamecode" dangerouslySetInnerHTML={{ __html: htmlData }} />
      </Container>
    </Wrapper>
  )
}

export default GameText
