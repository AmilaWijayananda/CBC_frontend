import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/signUpPage'
import AdminHomePage from './pages/admin/adminHomePage'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  const [count, setCount] = useState(0)
  const ID = import.meta.env.VITE_GOOGLE_ID

  return (
    <>
      <BrowserRouter>
      <Toaster />
      <GoogleOAuthProvider clientId={ID}>
        <Routes path="/*">  
          <Route path="/login" element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminHomePage />} />
        </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
