import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes path="/*">  
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
