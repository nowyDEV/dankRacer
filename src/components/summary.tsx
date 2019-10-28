import React from 'react'
import themeUtils from '../styles/themeUtils'

function Summary({ score }: { score: number }): JSX.Element {
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
    </div>
  )
}

export default Summary
