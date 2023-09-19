import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext'
import Home from './pages/Home';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import Blog from './pages/Blog';
import PasswordReset from './components/RestPassword';
import ProfileUpdate from './pages/ProfileUpdate';
import Profile from './components/Profile';
import AnimatedLogo from './pages/Animaton';

function App() {
  return (
    <AuthContextProvider>
      <Navbar />

        <Link to="/"></Link>   
        <Link to="/Login"></Link>
        <Link to="/Signup"></Link>
        <Link to="/PasswordReset"></Link>
        <Link to="/Blog"></Link>
        <Link to="/Update"></Link>
        <Link to="/Profile"></Link>
   
      <Routes>
  
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Signin />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/PasswordReset" element={<PasswordReset />} />
        <Route path="/Blog" element={<Protected><Blog /></Protected>} />
        <Route path="/Update" element={<Protected><ProfileUpdate /></Protected>} />
        <Route path="/Profile" element={<Protected><Profile /></Protected>} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;







/*import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext'
import Home from './pages/Home';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import Blog from './pages/Blog';
import PasswordReset from './components/RestPassword';
import ProfileUpdate from './pages/ProfileUpdate';
import AnimatedLogo from './pages/Animaton';
import Profile from './components/Profile';
function App() {
  return (
    <>   
    <Link to="/"/>
  
    <Link to="/Home"/>
    <Link to="/Login"/>
    <Link to="/Signup"/>
    <Link to="/PasswordReset"/>
    <Link to="/Blog"/>
    <Link to="/Update"/>
      <AuthContextProvider>
        <Navbar />
        <Routes>     
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Signin />} />
          <Route path='/Signup' element={<SignUp />} />
          <Route path='/PasswordReset' element={<PasswordReset />} />
        
          <Route path='/Blog' element={<Protected><Blog /></Protected>} />

          <Route path='/Update' element={<Protected><ProfileUpdate /></Protected>} />     
          <Route path='/Profile' element={<Protected><Profile/></Protected>} />        
        </Routes>        
      </AuthContextProvider>

    </>);
}

export default App;*/
