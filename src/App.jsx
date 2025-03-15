import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './commponents/NavBar'
import UploadNic from './pages/UploadNic'
import AllReports from './pages/AllReports'
import GenerateReports from './pages/GenerateReports'
import SignIn from './pages/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp'
import ForgetPassword from './pages/ForgetPassword'

function App() {
  

  return (
    
    <Router>
      
    <NavBar/>
    <Routes>
    <Route path="/" element={<UploadNic /> }/>
    <Route path="/all-reports" element={<AllReports /> }/>
    <Route path="/generate-reports" element={<GenerateReports /> }/>
    <Route path="/sign-in" element={<SignIn /> }/>
    <Route path="/sign-up" element={<SignUp /> }/>
    
    <Route path="/forget-password" element={<ForgetPassword /> }/>
    </Routes>
    </Router>
    

  )
}

export default App
