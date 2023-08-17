import React, { Component } from 'react'
import NavBar from './Component/NavBar'
import News from './Component/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <>
        <Router>
        <NavBar/>
          <Routes>
            <Route path="/"><News pageSize={8} country="in" category="general"/></Route>
            <Route path="/business"><News pageSize={8} country="in" category="business"/></Route>
            <Route path="/entertainment"><News pageSize={8} country="in" category="entertainment"/></Route>
            <Route path="/health"><News pageSize={8} country="in" category="health"/></Route>
            <Route path="/science"><News pageSize={8} country="in" category="science"/></Route>
            <Route path="/sports"><News pageSize={8} country="in" category="sports"/></Route>
            <Route path="/technology"><News pageSize={8} country="in" category="technology"/></Route>
          </Routes>
        </Router>
      </>
    ) 
  }
}


