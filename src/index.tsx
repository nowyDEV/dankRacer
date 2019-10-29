import React from 'react'
import ReactDOM from 'react-dom'
import { Game } from './components/game'
import * as serviceWorker from './serviceWorker'
import GlobalStyles from './styles/global'

ReactDOM.render(
  <React.Fragment>
    <GlobalStyles />
    <Game />
  </React.Fragment>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
