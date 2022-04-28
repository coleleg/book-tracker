import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Current from './pages/Current';
import Finished from './pages/Finished';
import Navbar from './components/Navbar';
import Login from './components/Login'


function App() {
  return (
      <div className="App">
        <Navbar />
        <Login />
          <Router>
              <Routes>
                <Route path = '/' element={<Home />} />
                <Route path = '/saved' component={<Saved />} />
                <Route path = '/current' component={<Current />} />
                <Route path = '/finished' component={<Finished />} />
              </Routes>
          </Router>
      </div>
  
  );
}

export default App;
