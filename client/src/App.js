import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Current from './pages/Current';
import Completed from './pages/Completed';
import Navbar from './components/Navbar';
import Login from './components/Login'
import Signup from './components/Signup';


function App() {
  
  return (
      <div className="App">
        <Navbar />
          <Router>
              <Routes>
                <Route path = '/' element={<Home />} />
                <Route path = '/login' element={<Login />} />
                <Route path = '/signup' element={<Signup />} />
                <Route path = '/saved' element={<Saved />} />
                <Route path = '/current' element={<Current />} />
                <Route path = '/completed' element={<Completed />} />
              </Routes>
          </Router>
      </div>
  
  );
}

export default App;
