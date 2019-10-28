import React from 'react'
import themeUtils from '../styles/themeUtils'
import useInterval from './hooks/useInterval'

function Timer({ seconds, onTick }: { seconds: number; onTick: () => void }): JSX.Element {
  useInterval((): void => {
    onTick()
  }, 1000)

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
