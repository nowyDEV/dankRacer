import React from 'react'
import { Wrapper, Container } from './gameText.styles'

function GameText({ exercise }: { exercise: Exercise }): JSX.Element {
  const codeRef = React.useRef<HTMLSpanElement | null>(null)
  console.log(exercise)
  return (
    <Wrapper>
      <Container>
        <span ref={codeRef} id="gamecode" data-bind="text: game.gamecode">
          dank meme
        </span>
      </Container>
    </Wrapper>
  )
}

export default GameText
