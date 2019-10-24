import React from 'react'
import App from './app.component'
import UseDataApi from '../hooks/useApiData'

function AppContainer(): JSX.Element {
  const [{ data, isLoading, isError }, doFetch] = UseDataApi('https://hn.algolia.com/api/v1/search?query=game', {
    hits: []
  })

  return isLoading ? <div>LOADING...</div> : isError ? <div>Error</div> : <App data={data} />
}

export default AppContainer
