/* eslint-disable react/jsx-no-duplicate-props */
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './components/Home';


const App = () => {
  useEffect(() => {
    fetch('/api/movie/get').then(res => res.json()).then(res => console.log(res));
  }, [])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>

  );
}

export default App;
