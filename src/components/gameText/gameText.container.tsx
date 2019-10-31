import React from 'react'
import GameText from './gameText.component'
import agent from '../../api/agent'

function GameTextContainer(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState<null | GameInstance>(null)

  React.useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const games = await agent.requests.getGameData()
        setData(games[1])
      } catch (err) {
        console.log(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return isLoading ? <span>Loading...</span> : <GameText exercise={data!.exercise} />
}

export default GameTextContainer
