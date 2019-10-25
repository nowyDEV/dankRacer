import React from 'react'
import App from './app.component'
import UseDataApi from '../hooks/useApiData'

const NUM_OF_WORDS = 50
function AppContainer(): JSX.Element {
  const [{ data, isLoading, isError }, doFetch] = UseDataApi(
    `${process.env.REACT_APP_API_URL}/word?key=${process.env.REACT_APP_API_KEY}&number=${NUM_OF_WORDS}`,
    {
      hits: []
    }
  )

  return isLoading ? <div>LOADING...</div> : isError ? <div>Error</div> : <App words={data} />
}

export default AppContainer
