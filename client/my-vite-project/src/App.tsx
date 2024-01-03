// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
     <Route path="/" element={<Signup />} />
     <Route path="/login" element={<Signin />} />
     

     </Routes>
    </Router>
  );
};

export default App;
