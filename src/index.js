import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends React.Component {
  render() {
    return (
      <p>App class component is working</p>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
