import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from './Componets/Menu'
import Admin from './Componets/Admin'
import RootLayout from './Componets/RootLayout';
import Login from './Componets/Login';
const App = () => {
  return (
    <div className="min-w-full h-fit font-popins">
      <Router>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </RootLayout>
      </Router>
    </div>
  );
}

export default App
