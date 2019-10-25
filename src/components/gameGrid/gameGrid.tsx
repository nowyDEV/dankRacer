import React from 'react'
import { HorizontalLine } from '../app/app.styles'

function GameGrid({ lines }: { lines: number[] }): JSX.Element {
  return (
    <React.Fragment>
      {lines.map((item, index) => (
        <HorizontalLine key={`${index * 2}-y`} top={index * 30} />
      ))}
    </React.Fragment>
  )
}

export default GameGrid
