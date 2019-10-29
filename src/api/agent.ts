// import ExampleData from './words.json'
import ExampleSentence from './sentence.json'

function getData(): Promise<any> {
  return new Promise((res): ReturnType<typeof setTimeout> => setTimeout((): void => res(ExampleSentence), 1))
}

const requests = {
  getData
}

export default {
  requests
}
