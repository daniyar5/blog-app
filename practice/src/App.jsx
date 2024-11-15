import React, { useState, useEffect } from 'react'
import View from './pages/View'
import Modify from './pages/Modify'
import New from './pages/New';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <Router>
        <Routes>
            <Route index element={<View />} />
            <Route path="/posts/new" element={<New />}/>
            <Route path="/posts/:id" element={<Modify />} />
        </Routes>
    </Router>
  )
}

export default App
