import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage/LoginPage';
import FrontPage from './pages/FrontPage/FrontPage';
import UserProfile from './pages/UserProfile/UserProfile';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PostList from './pages/PostList/PostList';
import PrivateRoute from './context/PrivateRoute';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:userId" element={<UserProfile/>} />
          <Route path="/search" element={<PostList />} />
          <Route path="/" element={<FrontPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

=========
        <Route path="/" element={<FrontPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile/:userId" element={<UserProfile/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/search" element={<PostList/>} />
>>>>>>>>> Temporary merge branch 2
        {/* Agrega otras rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
};

export default AppRouter;