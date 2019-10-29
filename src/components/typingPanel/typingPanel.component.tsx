import React from 'react'
import { GameText, Input, InputArea } from './typingPanel.styles'

interface Props {
  text: string
  onType: () => void
  onProgress: (current: number, total: number) => void
}

interface State {
  charactersCommitted: number
  inputText: string
}

function TypingPanel({ text, onType, onProgress }: Props): JSX.Element {
  const [state, setState] = React.useState<State>({
    charactersCommitted: 0,
    inputText: ''
  })

  const onChange = (e): void => {
    onType()

    const nextInputText = e.target.value
    if (
      nextInputText === text.substr(state.charactersCommitted) ||
      (nextInputText.endsWith(' ') && text.substr(state.charactersCommitted, nextInputText.length) === nextInputText)
    ) {
      const nextCharactersCommitted = state.charactersCommitted + nextInputText.length
      setState({
        inputText: '',
        charactersCommitted: nextCharactersCommitted
      })

      onProgress(nextCharactersCommitted, text.length)
    } else {
      setState({ ...state, inputText: nextInputText.replace(/^\s+/, '') })
    }
  }

  const ok = text.substr(state.charactersCommitted).startsWith(state.inputText)
  const past = text.substr(0, state.charactersCommitted)
  const present = (text.substr(state.charactersCommitted).match(/^\S+/) || [''])[0]
  const future = text.substr(state.charactersCommitted + present.length)
  const done = state.charactersCommitted === text.length
  return (
    <div>
      <GameText ok={ok}>
        <span className="past">{past}</span>
        <span className="present">{present}</span>
        <span className="future">{future}</span>
      </GameText>
      <InputArea>
        <label htmlFor="text">Type the text:</label>
        <Input ok={ok} id="text" autoFocus onChange={onChange} value={state.inputText} disabled={done} />
      </InputArea>
    </div>
  )
}

export default TypingPanel