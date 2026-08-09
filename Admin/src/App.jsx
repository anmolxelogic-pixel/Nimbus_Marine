import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from './Components/Auth/Login';
import AdminDashboard from './Components/Dashboard/AdminDashboard';

function App() {
  return (
    <div>
        <Routes>
           <Route path="/login" element={<Login/>}/>
           <Route path='/' element={<AdminDashboard/>} />
        </Routes>
    </div>
  )
}

export default App
