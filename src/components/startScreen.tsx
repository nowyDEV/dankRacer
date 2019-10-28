import React from 'react'
import NameForm from './nameForm'

function StartScreen({ onEnter }: { onEnter: ({ playerName: string }) => void }): JSX.Element {
  return (
    <div>
      <h1>Start Game</h1>
      <NameForm onSubmit={(name): void => onEnter({ playerName: name })} />
    </div>
  )
}

export default StartScreen
