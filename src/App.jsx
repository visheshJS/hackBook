import { useState } from 'react'
import HeroSection from './components/HeroSection'
import BookScanner from './components/BookScanner'


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
