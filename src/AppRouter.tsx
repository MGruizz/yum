import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/LoginPage';
import FrontPage from './pages/FrontPage/FrontPage';
import UserProfile from './pages/UserProfile/UserProfile';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PostList from './pages/PostList/PostList';
import PrivateRoute from './context/PrivateRoute';
import Header from './components/Header/Header';
import { SearchProvider } from './context/SearchContext';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <SearchProvider>
        <Header></Header>
        <Routes>
          <Route path="/search" element={<PostList />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile/:userId" element={<UserProfile />} />
          </Route>
          
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Agrega otras rutas aquí según sea necesario */}
        </Routes>
      </SearchProvider>
    </Router>
  );
};

export default AppRouter;