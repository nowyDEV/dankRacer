import React from 'react'
import { Wrapper, Container } from './gameText.styles'
import { NON_TYPEABLES } from './config'
import { hasClass } from './gameText.helpers'

interface Code {
  char: string
  beforeComment: boolean
  index: number
  elIndex: number
  el: HTMLElement
}

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
    let codemap: Code[] = []

    if (!(gameCode.current instanceof HTMLElement)) {
      return
    }
    const contents = gameCode.current.hasChildNodes() ? gameCode.current.childNodes : []

    // Loop through contents of code, and add all non-comment
    // blocks into the codemap, keeping track of their positions
    // and elements
    contents.forEach((el, elIndex) => {
      console.log('asdasd')
      if (isNonTypable(el)) {
        // Handle special case of end-of-line comment
        const prev = contents[elIndex - 1]
        const next = contents[elIndex + 1]

        if (prev instanceof HTMLElement && next instanceof HTMLElement) {
          // End-of-line comment is preceded by non-newline and
          // followed by newline
          const prevText = prev.textContent || ''
          const nextText = next.textContent || ''
          const isEndOfLineComment = !prevText.match(/\n\s*$/) && nextText.charAt(0) === '\n'
          if (isEndOfLineComment) {
            // Add the return at the end of the previous
            // element
            codemap.push({
              char: '\n',
              beforeComment: true,
              index: prevText.search(/\s*$/),
              elIndex: elIndex - 1,
              el: prev
            })
          }
        }
        return
      }

      const text = el.textContent || ''
      text.split('').forEach((char, charIndex) => {
        codemap.push({
          char,
          beforeComment: false,
          index: charIndex,
          elIndex,
          el
        })
      })
    })

    /**
     * Reusable filter method that keeps track of indices
     * marked for removal, with custom criteria functions
     */
    const iterativeFilter = (collection, state, loopFn): Code[] => {
      const indices = {}
      const addSection = (lastIdx: number, curIdx: number): void => {
        const start = lastIdx + 1
        const howMany = curIdx - start

        if (howMany > 0) {
          for (let i = start; i < start + howMany; i++) {
            indices[i] = true
          }
        }
      }

      collection.forEach((piece, index) => {
        loopFn.call(state, piece, index, addSection)
      })

      // Remove the collected indices
      return collection.filter((piece, index) => {
        return !indices[index]
      })
    }

    // Loop through the codemap and remove occurrences of leading and
    // trailing whitespace
    codemap = iterativeFilter(
      codemap,
      {
        leadingSearch: true,
        trailingSearch: false,
        lastNewline: -1,
        lastTypeable: -1,
        setMode(mode): void {
          this.leadingSearch = mode === 'leading'
          this.trailingSearch = mode === 'trailing'
        }
      },
      function check(this, piece, i, addSection) {
        if (piece.char === ' ' || piece.char === '\t') {
          // Skip over
          return
        }
        if (piece.char === '\n') {
          // New line
          if (this.trailingSearch) {
            this.setMode('leading')
            addSection(this.lastTypeable, i)
          }
          this.lastNewline = i
        } else {
          // Typeable
          if (this.leadingSearch) {
            this.setMode('trailing')
            addSection(this.lastNewline, i)
          }
          this.lastTypeable = i
        }
      }
    )

    // Finally, remove contiguous blocks of newline+whitespace,
    // as well as globally leading whitespace
    codemap = iterativeFilter(
      codemap,
      {
        firstTypeableFound: false,
        newlineFound: false,
        typeableFound: false,
        lastRelevantNewline: -1,
        setFound(found): void {
          this.newlineFound = found === 'newline'
          this.typeableFound = found === 'typeable'
          if (found === 'typeable') {
            this.firstTypeableFound = true
          }
        }
      },
      function check(this, piece, i, addSection) {
        if (piece.char === ' ' || piece.char === '\t') {
          // Skip over
          return
        }
        if (piece.char === '\n') {
          // Newline
          if (this.firstTypeableFound && !this.newlineFound) {
            this.lastRelevantNewline = i
          }
          this.setFound('newline')
        } else {
          // Typeable
          if (this.newlineFound) {
            addSection(this.lastRelevantNewline, i)
          }
          this.setFound('typeable')
        }
      }
    )
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
