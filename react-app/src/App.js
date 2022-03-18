/* eslint-disable react/jsx-no-duplicate-props */
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup/>} />
      </Routes>
      <input className='userid' type="hidden"/>
    </Router>

  );
}

export default App;
