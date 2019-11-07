import GameData from './code_response.json'

function getGameData(): Promise<any> {
  return new Promise((res): ReturnType<typeof setTimeout> => setTimeout((): void => res(GameData), 1))
}

const requests = {
  getGameData
}

export default {
  requests
}
