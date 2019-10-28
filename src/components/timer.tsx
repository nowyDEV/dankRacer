import React from 'react'
import themeUtils from '../styles/themeUtils'

function Timer({ seconds }: { seconds: number }): JSX.Element {
  return (
    <div
      css={{
        fontSize: themeUtils.font.large
      }}
    >
      <time
        css={{
          color: seconds >= 10 ? 'green' : 'red'
        }}
      >
        {`${seconds} seconds `}
      </time>
      left
    </div>
  )
}

export default Timer
