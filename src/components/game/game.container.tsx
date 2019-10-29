import React from 'react'
import Game from './game.component'
import UseDataApi from '../hooks/useApiData'

function getRandomText(texts: Text[]): string {
  const rand = Math.floor(Math.random() * texts.length)
  return texts[rand].text
}

function GameContainer(): JSX.Element {
  const [{ data, isLoading, isError }] = UseDataApi()

  return isLoading ? <div>LOADING...</div> : isError ? <div>Error</div> : <Game text={getRandomText(data)} />
}

export default GameContainer
