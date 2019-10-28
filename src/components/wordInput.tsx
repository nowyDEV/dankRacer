import React from 'react'
import { StyledInput } from './app/app.styles'

function WordInput({ value, onChange }: { value: string; onChange: (value: string) => void }): JSX.Element {
  return (
    <StyledInput autoFocus value={value} onChange={(e): void => onChange(e.target.value)} placeholder="Type here..." />
  )
}

export default WordInput
