import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage/LoginPage';
import FrontPage from './pages/FrontPage/FrontPage';
import UserProfile from './pages/UserProfile/UserProfile';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<UserProfile/>} />
        {/* Agrega otras rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
};

export default AppRouter;