// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Navbar from './Components/Navbar';

import Blogs from './Components/Blogs';
import MyBlogs from './Components/MyBlogs';
import AddBlog from './Components/AddBlog';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
     <Route path="/" element={<Signup />} />
     <Route path="/login" element={<Signin />} />
     <Route path="/add" element={<AddBlog />} />
     <Route path="/home" element={<Blogs />} />
     <Route path="/Blogs" element={<MyBlogs />} />
     

     </Routes>
    </Router>
  );
};

export default App;
