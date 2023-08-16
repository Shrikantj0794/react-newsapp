import React, { Component } from 'react'
import NavBar from './Component/NavBar'
import News from './Component/News'

export default class App extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <News pageSize={5} country="in" category="science"/>
      </div>
    ) 
  }
}


