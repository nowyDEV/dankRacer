import { prevAll } from './gameText.helpers'

/**
 * Represents a player or opponent's cursor
 */
class CodeCursor {
  playerId
  playerName
  cursor
  code
  codeLength
  pos
  keystrokes
  isMistaken
  mistakePathLength
  mistakes
  mistakePositions
  isMainPlayer
  onCorrectKey
  onAdvanceCursor
  onRetreatCursor
  onGameComplete

  constructor(cfg) {
    this.playerId = cfg.playerId
    this.playerName = cfg.playerName
    this.cursor = cfg.cursor
    this.code = cfg.code
    this.codeLength = cfg.code.length
    this.pos = 0
    this.keystrokes = 0
    this.isMistaken = false
    this.mistakePathLength = 0
    this.mistakes = 0
    this.mistakePositions = []

    this.isMainPlayer = cfg.isMainPlayer || false

    this.onCorrectKey = cfg.onCorrectKey || (() => undefined)
    this.onAdvanceCursor = cfg.onAdvanceCursor || (() => undefined)
    this.onRetreatCursor = cfg.onRetreatCursor || (() => undefined)
    this.onGameComplete = cfg.onGameComplete || (() => undefined)

    this.cursor.classList.add(this.playerName)
  }

  public processKey = (key): void => {
    if (this.isMistaken) {
      this.mistakePathKey()
    } else if (key === this.code.charAt(this.pos)) {
      this.correctKey()
    } else {
      this.incorrectKey()
    }
  }

  private advanceCursor = (): void => {
    this.advanceCursorWithClass(this.playerName)
  }

  private advanceCursorWithClass = (curClass, trailingClass = ''): void => {
    this.keystrokes += 1
    this.pos += 1

    this.cursor.classList.remove(...curClass.split(' '))
    if (this.isMainPlayer) {
      this.cursor.classList.remove('untyped')
      this.cursor.classList.add('typed')
    }
    this.cursor.classList.add(...trailingClass.split(' '))

    this.cursor = this.cursor.nextElementSibling
    this.cursor.classList.add(...curClass.split(' '))

    this.onAdvanceCursor.call(this, this)
  }

  private retreatCursor = (): void => {
    this.retreatCursorWithClass(this.playerName)
  }

  private retreatCursorWithClass = (curClass, trailingClass = ''): void => {
    this.keystrokes += 1
    this.pos -= 1
    this.mistakePathLength -= 1

    this.cursor.classList.remove(...curClass.split(' '))
    ;[this.cursor] = prevAll(this.cursor)

    this.cursor.classList.remove(...trailingClass.split(' '))
    if (this.isMainPlayer) {
      this.cursor.classList.remove('typed')
      this.cursor.classList.add('untyped')
    }
    this.cursor.classList.add(...curClass.split(' '))

    this.onRetreatCursor.call(this, this)
  }

  private correctKey = (): void => {
    this.advanceCursorWithClass(this.playerName)

    this.onCorrectKey.call(this, this)
    if (this.pos === this.codeLength) {
      this.onGameComplete.call(this, this)
    }
  }

  private incorrectKey = (): void => {
    // We must *not* be at the final character of the code if we want to
    // create a mistake path, so check for it
    if (this.pos < this.codeLength - 1) {
      this.isMistaken = true
      this.mistakes += 1
      this.mistakePositions.push(this.pos)
      this.advanceCursorWithClass(this.playerName, 'mistake')
      this.mistakePathLength += 1
    }
    // But we do want to highlight a mistake, even if we're at the end
    // of the code
    this.cursor.classList.add('mistaken')
  }

  private mistakePathKey = (): void => {
    if (this.pos < this.codeLength - 1) {
      if (this.mistakePathLength < 10) {
        this.advanceCursorWithClass(`${this.playerName} mistaken`, 'mistake-path')
        this.mistakePathLength += 1
      }
    }
  }

  public backspaceKey = (): void => {
    if (this.isMistaken) {
      this.retreatCursorWithClass(`${this.playerName} mistaken`, 'mistake-path mistake')

      if (this.mistakePathLength === 0) {
        this.isMistaken = false
        this.cursor.classList.remove('mistaken')
      }
    }
  }

  public destroy = (): void => {
    this.cursor.classList.remove(this.playerName)
  }
}

export default CodeCursor
