/* eslint-disable */

/**
 * Extract game code, manipulate references, remove non-typeables,
 * and wrap each character is a specific span tag
 */
var bindCodeCharacters = function() {
  $gamecode = $('#gamecode')

  var codemap = []
  var $contents = $gamecode.contents()

  // Loop through contents of code, and add all non-comment
  // blocks into the codemap, keeping track of their positions
  // and elements
  _.each($contents, function(elem, elIdx) {
    var $elem = $(elem)

    if ($elem.is(nonTypeables)) {
      // Handle special case of end-of-line comment
      var $prev = $($contents.get(elIdx - 1)),
        $next = $($contents.get(elIdx + 1))

      if ($prev && $next) {
        // End-of-line comment is preceded by non-newline and
        // followed by newline
        var isEndOfLineComment = !$prev.text().match(/\n\s*$/) && $next.text().charAt(0) === '\n'

        if (isEndOfLineComment) {
          // Add the return at the end of the previous
          // element
          codemap.push({
            char: '\n',
            beforeComment: true,
            idx: $prev.text().search(/\s*$/),
            elIdx: elIdx - 1,
            el: $prev
          })
        }
      }
      return
    }

    var text = $elem.text()
    _.each(text, function(s, i) {
      codemap.push({
        char: s,
        beforeComment: false,
        idx: i,
        elIdx: elIdx,
        el: $elem
      })
    })
  })

  /**
   * Reusable filter method that keeps track of indices
   * marked for removal, with custom criteria functions
   */
  var iterativeFilter = function(collection, state, loopFn) {
    var indices = {}
    var addSection = function(lastIdx, curIdx) {
      var start = lastIdx + 1,
        howMany = curIdx - start

      if (howMany > 0) {
        for (var i = start; i < start + howMany; i++) {
          indices[i] = true
        }
      }
    }

    _.each(collection, function(piece, i) {
      loopFn.call(state, piece, i, addSection)
    })

    // Remove the collected indices
    return _.filter(collection, function(piece, i) {
      return !indices[i]
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
      setMode: function(mode) {
        this.leadingSearch = mode === 'leading'
        this.trailingSearch = mode === 'trailing'
      }
    },
    function(piece, i, addSection) {
      if (piece.char === ' ' || piece.char === '\t') {
        // Skip over
        return
      } else if (piece.char === '\n') {
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
      setFound: function(found) {
        this.newlineFound = found === 'newline'
        this.typeableFound = found === 'typeable'
        if (found === 'typeable') {
          this.firstTypeableFound = true
        }
      }
    },
    function(piece, i, addSection) {
      if (piece.char === ' ' || piece.char === '\t') {
        // Skip over
        return
      } else if (piece.char === '\n') {
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

  var isTextNode = function(el) {
    return el.get(0).nodeType === 3
  }

  // Group remaining code chars by original element, and loop through
  // every element group and replace the element's text content with the
  // wrapped code chars
  var groupedCodemap = _.groupBy(codemap, function(piece) {
    return piece.elIdx
  })
  _.each(groupedCodemap, function(codeGroup) {
    var $elem = codeGroup[0].el,
      text = $elem.text()

    var collapseCodeGroup = function(codeGroup, text) {
      var chunks = [],
        idx = 0

      _.each(codeGroup, function(piece) {
        chunks.push(text.slice(idx, piece.idx))
        idx = piece.idx + 1

        if (piece.char === '\n') {
          chunks.push('<span class="code-char return-char"></span>')
          if (!piece.beforeComment) {
            chunks.push('\n')
          }
        } else {
          chunks.push('<span class="code-char">' + piece.char + '</span>')
        }
      })

      chunks.push(text.slice(idx, text.length))
      return chunks.join('')
    }

    if (isTextNode($elem)) {
      $elem.replaceWith(collapseCodeGroup(codeGroup, text))
    } else {
      // Re-add highlighting classes to the new spans
      var oldClass = $elem.attr('class')
      var $newContent = $(collapseCodeGroup(codeGroup, text))
      $elem.replaceWith($newContent)
      $newContent.addClass(oldClass)
    }
  })

  // Attach boundcode
  swiftcode.boundCode = _.map(codemap, function(piece) {
    return piece.char
  }).join('')

  // Set all code characters to untyped
  $gamecode.find('.code-char').addClass('untyped')
}
