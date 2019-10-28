import React from 'react'
import themeUtils from '../styles/themeUtils'
import { StyledButton } from './app/app.styles'

function SummaryScreen({ score, onRestart }: { score: number; onRestart: () => void }): JSX.Element {
  return (
    <div>
      <h1
        css={{
          fontSize: themeUtils.font.large,
          marginBottom: '30px'
        }}
      >
        GAME OVER
      </h1>
      <p
        css={{
          fontSize: themeUtils.font.base
        }}
      >
        {`Your score: ${score}`}
      </p>
      <StyledButton onClick={onRestart}>Restart</StyledButton>
    </div>
  )
}

export default SummaryScreen
