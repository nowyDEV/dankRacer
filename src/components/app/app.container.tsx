import React from 'react'
import App from './app.component'
import UseDataApi from '../hooks/useApiData'

function AppContainer(): JSX.Element {
  console.log(process.env)
  const [{ data, isLoading, isError }, doFetch] = UseDataApi(`${process.env.REACT_APP_API_URL}?query=game`, {
    hits: []
  })

  return isLoading ? <div>LOADING...</div> : isError ? <div>Error</div> : <App data={data} />
}

export default AppContainer
