const exampleResponse = {
  dank: 'meme'
}

function getData(): Promise<any> {
  return new Promise((res): ReturnType<typeof setTimeout> => setTimeout((): void => res(exampleResponse), 1))
}

const requests = {
  getData
}

export default {
  requests
}
