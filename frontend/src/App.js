import React from 'react'
import './App.css'
import { Link, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Homepage } from './components/Homepage'
import { FilterPage } from './components/Filterpage'

function App() {
  return (
    <div>
      <Navbar />
      <Link to='/homepage' >HOMEPAGE</Link>
      <Link to='/filterby' >FILTER BY</Link>
      <Switch>
        <Route path='/homepage' render={(props) => <Homepage {...props} />} />
        <Route path='/filterby' exact render={(props) => <FilterPage {...props} />} />
        {/* <Route render={(props) => <div><h2>trying</h2></div>} /> */}
      </Switch>
      <FilterPage />

      {/* <Homepage /> */}
    </div>
  )
}

export default App
