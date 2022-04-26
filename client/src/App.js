import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Current from './pages/Current';
import Finished from './pages/Finished';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route exact path = '/' component={Home} />
          <Route exact path = '/saved' component={Saved} />
          <Route exact path = '/current' component={Current} />
          <Route exact path = '/finished' component={Finished} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
