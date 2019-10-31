import React from 'react'
import { Wrapper, Container } from './gameText.styles'
import { NON_TYPEABLES } from './config'
import { hasClass } from './gameText.helpers'

function isNonTypable(el: HTMLElement): boolean {
  return hasClass(el, NON_TYPEABLES)
}

function GameText({ exercise }: { exercise: Exercise }): JSX.Element {
  const gameCode = React.useRef<HTMLSpanElement | null>(null)

  /**
   * Extract game code, manipulate references, remove non-typeables,
   * and wrap each character is a specific span tag
   */
  const bindCodeCharacters = (): void => {
    const codemap = []

    if (!(gameCode.current instanceof HTMLElement)) {
      return
    }
    const contents = gameCode.current.hasChildNodes() ? gameCode.current.childNodes : []

    contents.forEach((el, index) => {
      console.log('asdasd')
      if (isNonTypable(el)) {
        console.log('dank meme')
      }
    })

    // Loop through contents of code, and add all non-comment
    // blocks into the codemap, keeping track of their positions
    // and elements
  }
  console.log(exercise)
  return (
    <Wrapper>
      <Container>
        <span ref={gameCode} id="gamecode">
          dank meme
        </span>
      </Container>
    </Wrapper>
  )
}

export default GameText
