import React from 'react'
import { Wrapper, Container } from './gameText.styles'
import UseBindCodeCharacters from './useBindCodeCharacters'

function GameText({ exercise }: { exercise: Exercise }): JSX.Element {
  const [htmlData, gameCode] = UseBindCodeCharacters(exercise.code)

  return (
    <Wrapper>
      <Container>
        <span ref={gameCode} id="gamecode" dangerouslySetInnerHTML={{ __html: htmlData }} />
      </Container>
    </Wrapper>
  )
}

export default GameText
