// import ExampleData from './words.json'
import ExampleData from './data.json'
import GameData from './code_response.json'

function getData(): Promise<any> {
  return new Promise((res): ReturnType<typeof setTimeout> => setTimeout((): void => res(ExampleData), 1))
}

function getGameData(): Promise<any> {
  return new Promise((res): ReturnType<typeof setTimeout> => setTimeout((): void => res(GameData), 1))
}

const requests = {
  getData,
  getGameData
}

export default {
  requests
}
