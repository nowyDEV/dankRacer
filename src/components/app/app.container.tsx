import React from 'react'
import App from './app.component'
import UseDataApi from '../hooks/useApiData'

function AppContainer(): JSX.Element {
  const [{ data, isLoading, isError }] = UseDataApi()

  return isLoading ? <div>LOADING...</div> : isError ? <div>Error</div> : <App words={data} />
}

export default AppContainer
