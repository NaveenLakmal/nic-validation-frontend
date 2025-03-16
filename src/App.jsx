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
import { AuthProvider } from './context/AuthContext'
import DashBoard from './pages/DashBoard'

function App() {


  return (

    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/upload-csv" element={<UploadNic />} />
          <Route path="/all-reports" element={<AllReports />} />
          <Route path="/generate-reports" element={<GenerateReports />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/dashboard" element={<DashBoard />} />

        </Routes>
      </Router>

    </AuthProvider>
  )
}

export default App
