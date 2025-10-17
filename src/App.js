import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/Router';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container mx-auto p-4">
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;