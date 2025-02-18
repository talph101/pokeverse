import React, { useState } from 'react'
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import PokemonList from './components/PokemonList'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div>
      <PokemonList/>
    </div>
   
  )
}

export default App
