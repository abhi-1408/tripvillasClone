import React, { useEffect } from 'react'
import './App.css'
import { Link, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Homepage } from './components/Homepage'

import { Propertypage } from './components/Propertypage'

import { FilterPage } from './components/Filterpage'
import { Routes } from './Routes/Routes'
import ReactGa from 'react-ga'

function App() {
    useEffect(() => {
        // ReactGa.initialize('UA-173941004-1')
        ReactGa.initialize('UA-173941004-2')

        ReactGa.pageview(window.location.pathname + window.location.search)
    }, [])

    return (
        <div>
            <Navbar />
            {/* <Link to='/homepage' >HOMEPAGE</Link>
      <Link to='/filterby' >FILTER BY</Link>
      <Switch>
        <Route path='/homepage' render={(props) => <Homepage {...props} />} />
        <Route path='/filterby' exact render={(props) => <FilterPage {...props} />} />
      </Switch> */}
            {/* <FilterPage /> */}
            {/* <Homepage /> */}
            {/* <div>
        <Link to='/homepage' >HOMEPAGE</Link>
        <Link to='/filterby?state=delhi' >FILTER BY</Link>
      </div> */}

            <div>
                <Routes />
            </div>




        </div>
    )
}

export default App