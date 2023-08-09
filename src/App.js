import React, { Component } from 'react'
import NavBar from './Component/NavBar'
import News from './Component/News'

export class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <News/>
      </div>
    ) 
  }
}

export default App

