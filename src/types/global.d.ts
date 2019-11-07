interface GameInstance {
  success: boolean
  game: Game
  timeLeft: number
  exercise: Exercise
  nonTypeables: string
}

interface Exercise {
  _id: string
  typeables: number
  typeableCode: string
  code: string
  projectName: string
}

interface Game {
  isSinglePlayer: boolean
  numPlayers: number
  maxPlayers: number
  isJoinable: boolean
  isComplete: boolean
  isViewable: boolean
  starting: boolean
  started: boolean
  players: string[]
  playerNames: string[]
  startingPlayers: any[]
  wasReset: boolean
  _id: string
  lang: string
  langName: string
  exercise: string
  creator: string
  status: string
  statusText: string
  startTime: string
  __v: number
}
