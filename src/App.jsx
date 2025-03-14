import { useState } from 'react'
import HeroSection from './components/HeroSection'
import BookScanner from './components/BookScanner'
import LampEffect from './components/LampEffect'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <HeroSection/>
     <BookScanner/>
      
    </>
  )
}

export default App
