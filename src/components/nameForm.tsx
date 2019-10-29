import React from 'react'
import { StyledInput, StyledButton } from './game/game.styles'

function NameForm({ onSubmit }: { onSubmit: (name: string) => void }): JSX.Element {
  const [name, setName] = React.useState('')

  const handleChange = (e): void => {
    setName(e.target.value)
  }

  const handleSubmit = (): void => {
    onSubmit(name)
  }

  return (
    <form onSubmit={handleSubmit}>
      <StyledInput required placeholder="Enter you name" onChange={handleChange} value={name} />
      <StyledButton>Let&#39;s race!</StyledButton>
    </form>
  )
}

export default NameForm
