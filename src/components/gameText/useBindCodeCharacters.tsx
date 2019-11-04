import React from 'react'
import _ from 'lodash'
import { NON_TYPEABLES } from './config'
import { hasClass, isTextNode } from './gameText.helpers'

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

/**
 * Extract game code, manipulate references, remove non-typeables,
 * and wrap each character in a specific span tag
 */
const bindCodeCharacters = (wrapper: HTMLElement): string => {
  let codemap: Code[] = []
  let htmlCode = ''

  if (!(wrapper instanceof HTMLElement)) {
    return htmlCode
  }

  const contents = wrapper.hasChildNodes() ? wrapper.childNodes : []

  // Loop through contents of code, and add all non-comment
  // blocks into the codemap, keeping track of their positions
  // and elements
  contents.forEach((el, elIndex) => {
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
    function check(piece, i, addSection) {
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
    function check(piece, i, addSection) {
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

  // Group remaining code chars by original element, and loop through
  // every element group and replace the element's text content with the
  // wrapped code chars
  // eslint-disable-next-line
  const groupedCodemap = _.groupBy(codemap, function(piece) {
    return piece.elIndex
  })

  // @ts-ignore
  _.each(groupedCodemap, codeGroup => {
    const elem = codeGroup[0].el
    const elemText = elem.textContent || ''

    const collapseCodeGroup = (code, text): string => {
      const chunks: string[] = []
      let idx = 0

      code.forEach(piece => {
        chunks.push(text.slice(idx, piece.index))
        idx = piece.index + 1

        if (piece.char === '\n') {
          chunks.push(`<span class="code-char return-char"></span>`)
          if (!piece.beforeComment) {
            chunks.push('\n')
          }
        } else {
          chunks.push(`<span class="code-char">${piece.char}</span>`)
        }
      })

      chunks.push(text.slice(idx, text.length))
      return chunks.join('')
    }

    if (isTextNode(elem)) {
      htmlCode = collapseCodeGroup(codeGroup, elemText)
    } else {
      // Re-add highlighting classes to the new spans
      const oldClass = elem.attr('class')
      const newContent = wrapper!.querySelector(collapseCodeGroup(codeGroup, elemText))
      elem.outerHTML = newContent
      newContent instanceof HTMLElement && newContent.classList.add(oldClass)
    }
  })

  // Set all code characters to untyped
  wrapper.querySelectorAll('.code-char').forEach(el => {
    el.classList.add('untyped')
  })

  return htmlCode
}

function UseBindCodeCharacters(exerciseCode: string): any {
  const [htmlCode, setHtmlCode] = React.useState<string>(exerciseCode)
  const ref = React.useCallback(node => {
    if (node !== null) {
      console.log(bindCodeCharacters(node))

      setHtmlCode(bindCodeCharacters(node) || '')
    }
  }, [])

  return [htmlCode, ref]
}

export default UseBindCodeCharacters
