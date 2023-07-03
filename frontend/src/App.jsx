import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Why from './pages/Why';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  return (
    <div className='bg-black'>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/why" element={<Why/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
