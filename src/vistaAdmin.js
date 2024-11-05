import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function Vistaadmin({ onLogout}) {
  const [codigos, setCodigos] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
   
  });



  const [success, setSuccess] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:5000/api/leerganadores'); // URL de la API
        const datacodigos = await response.json();
        console.log('objeto:', datacodigos);
        const codigosArray = Array.isArray(datacodigos) ? datacodigos : datacodigos.datos_obtenidos || [];
        console.log("arreglo" + codigosArray);
        console.log("usuario" + localStorage.getItem('user'));
        setCodigos(codigosArray); // Guardar los datos en el estado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };


  const closeModal = () => {
    setSuccess(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(-1);
  };

  

  return (
    <div className="form-container">
    <button className="logout-button" onClick={handleLogout}>Volver</button><br></br>
    <form onSubmit={handleSubmit} className="ai-agent-form">
    
      <button type="submit" className="submit-button">Ver</button>
     
    </form>

    <h2>Ganadores</h2>
    {/* Tabla para mostrar los datos */}
    <table>
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Usuario</th>
          <th>Fecha</th>
          <th>Premio</th>
        
        </tr>
      </thead>
      <tbody>
        {codigos.map((codigo) => (
          <tr key={codigo._id}>
            <td>{codigo.codigo}</td>
            <td>{codigo.estado}</td>
            <td>{codigo.fecha}</td>
            <td>{codigo.premio}</td>
           
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default Vistaadmin;
