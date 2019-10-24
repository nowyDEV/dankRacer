import React from 'react'

function App({ data }: { data: any }): JSX.Element {
  console.log(data)
  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
