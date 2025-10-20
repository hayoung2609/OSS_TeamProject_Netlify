// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/Router';
import Header from './components/header';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* 배경색은 이제 index.css에서 전역으로 관리합니다 */}
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* 페이지별로 다른 최대 너비를 가질 수 있으므로 main 태그는 각 페이지로 이동 */}
        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;