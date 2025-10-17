// src/router/Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import AddRecipePage from '../pages/AddRecipePage';
import EditRecipePage from '../pages/EditRecipePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<DetailPage />} />
      <Route path="/add-recipe" element={<AddRecipePage />} />
      <Route path="/recipe/:id/edit" element={<EditRecipePage />} />
    </Routes>
  );
};

export default AppRouter;