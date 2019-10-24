import React, { Dispatch } from 'react'
import axios from 'axios'

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

function UseDataApi(initialUrl, initialData): [State, Dispatch<React.SetStateAction<string>>] {
  const [url, setUrl] = React.useState<string>(initialUrl)

  const [state, dispatch] = React.useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  })

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await axios(url)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }
    fetchData()
  }, [url])

  return [state, setUrl]
}

export default UseDataApi
