import React from 'react'
import Game from './game.component'
import UseDataApi from '../hooks/useApiData'

function GameContainer(): JSX.Element {
  const [{ data, isLoading, isError }] = UseDataApi()

  return isLoading ? <div>LOADING...</div> : isError ? <div>Error</div> : <Game data={data} />
}

export default GameContainer
