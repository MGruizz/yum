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
<<<<<<< HEAD
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile currentUser={1} profileUser={1} />} />
          <Route path="/search" element={<PostList />} />
          <Route path="/" element={<FrontPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

=======
        <Route path="/" element={<FrontPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile/:userId" element={<UserProfile/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/search" element={<PostList/>} />
>>>>>>> 54cfc876b74624e6b5ff07b39b201ddcde9d108f
        {/* Agrega otras rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
};

export default AppRouter;