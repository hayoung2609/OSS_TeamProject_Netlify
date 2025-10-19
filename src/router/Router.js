// src/router/Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import AddRecipePage from '../pages/AddRecipePage';
import EditRecipePage from '../pages/EditRecipePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage'; // SignUpPage 임포트

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<DetailPage />} />
      <Route path="/add-recipe" element={<AddRecipePage />} />
      <Route path="/recipe/:id/edit" element={<EditRecipePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} /> {/* 회원가입 경로 추가 */}
    </Routes>
  );
};

export default AppRouter;