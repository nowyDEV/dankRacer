import React from 'react'
import agent from '../../api/agent'
import { getRandomItemFromArray } from '../../shared/index'

interface State {
  isLoading: boolean
  isError: boolean
  data: any
}

const dataFetchReducer = (state, action): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false }
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false, data: action.payload }
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true }
    default:
      throw new Error('Wrong action provided to the dataFetchReducer')
  }
}

function UseDataApi(): [State] {
  const [state, dispatch] = React.useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: []
  })

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await agent.requests.getGameData()
        dispatch({ type: 'FETCH_SUCCESS', payload: getRandomItemFromArray(result) })
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }
    fetchData()
  }, [])

  return [state]
}

export default UseDataApi
