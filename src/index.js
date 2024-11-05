import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import UsuarioRegistrar from './usuarioRegistro'; 
import AdminRegistrar from './adminRegistro'; 
import VistaAdmin from './vistaAdmin'; 

function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <App onLogout={handleLogout} />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route path="/registro" element={<UsuarioRegistrar />} />
        <Route path="/admin" element={<AdminRegistrar />} />
        <Route path="/vistaadmin" element={<VistaAdmin />} />
      
      </Routes>
    </Router>
  </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

reportWebVitals();
