// import ExampleData from './words.json'
import ExampleData from './data.json'

function getData(): Promise<any> {
  return new Promise((res): ReturnType<typeof setTimeout> => setTimeout((): void => res(ExampleData), 1))
}

const requests = {
  getData
}

export default {
  requests
}
