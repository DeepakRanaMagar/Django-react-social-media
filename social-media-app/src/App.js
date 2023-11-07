import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from './routes/ProtectedRoute';
import Registration from './pages/Registration';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';


function App() {
  return (
      <Routes>
        <Route path="/" element={
          
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        
        } />
        <Route path="/login/" element={<Login/>}/>
        <Route path="/register/" element={<Registration/>}/>
        
        <Route path="/post/:postId/" element={<ProtectedRoute>
          <SinglePost/>
        </ProtectedRoute>}/>


        <Route path="/profile/:profileId/" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        
      </Routes>
    );
}

export default App;
