import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Additem from './componets/Additem.jsx';
import Home from './componets/home';
import Allitems from './componets/Allitem';


function App() {
  return (
    <Router>
      
      
      <Routes>
      <Route path="/allitem" element={<Allitems />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
        <Route path="/add" element={<Additem />} />
        
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
