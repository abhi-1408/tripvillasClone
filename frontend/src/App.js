import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Filterpage } from './Components/Filterpage'
import { Homepage } from './Components/Homepage'

function App() {
  return (
    <div className='App'>
      <Filterpage />
      <Homepage />
    </div>
  )
}

export default App
