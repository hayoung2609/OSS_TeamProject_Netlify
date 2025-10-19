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
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto p-4 sm:p-8">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;