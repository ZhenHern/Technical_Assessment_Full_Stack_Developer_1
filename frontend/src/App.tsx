import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ItemList from './components/ItemList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Item List</h1>
      <ItemList />
    </>
  )
}

export default App
