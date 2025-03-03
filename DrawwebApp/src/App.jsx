import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route  path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App