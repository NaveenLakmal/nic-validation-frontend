import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './commponents/NavBar'
import UploadNic from './pages/UploadNic'
import AllReports from './pages/AllReports'
import GenerateReports from './pages/GenerateReports'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  

  return (
    
    <Router>
      
    <NavBar/>
    <Routes>
    <Route path="/" element={<UploadNic /> }/>
    <Route path="/all-reports" element={<AllReports /> }/>
    <Route path="/generate-reports" element={<GenerateReports /> }/>
    </Routes>
    </Router>
    

  )
}

export default App
