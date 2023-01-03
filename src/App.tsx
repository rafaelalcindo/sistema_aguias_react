import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App;
