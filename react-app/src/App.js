/* eslint-disable react/jsx-no-duplicate-props */
import logo from './logo.svg';
import './style/App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Admin from './components/Admin';
import Movie from './components/Movie';


const App = () => {
  return (
  <>
    <link
      rel="stylesheet"
      type="text/css"
      charset="UTF-8"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    />
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/movie/:id' element={<Movie/>} />
      </Routes>
      <input className='userid' type="hidden"/>
    </Router>
  </>
  );
}

export default App;
