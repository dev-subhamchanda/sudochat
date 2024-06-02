import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Room from './components/Room';
import Houseful from './components/error-pages/Houseful';
import CheckBackend from './components/Checkbackend';
import N from './components/error-pages/N';
const App = () => {
  return (
    <>   
     {/* <CheckBackend /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path='*' element={<N />}/>
      </Routes>
    </Router>
    </>

  );
};

export default App;
