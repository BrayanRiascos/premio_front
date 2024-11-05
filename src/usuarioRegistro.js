import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css'; // Usar los mismos estilos que App
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root');

function UsuarioRegistro({ onLoginSuccess }) {
 
 
  const [error, setError] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [celular, setCelular] = useState('');
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', {   
      nombre, 
      apellido,
      celular,
      email,
      documento,
      password,
      fechaNacimiento     });
    <h1> registrar</h1>
   
    
    try {

     
              
       
       
      

        const respuesta = await fetch('https://premio-back.vercel.app/api/crear', {
          method: 'POST',
          
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            nombre, 
            apellido,
            celular,
            email,
            documento,
            password,
            fechaNacimiento,
            role       }), // Enviar credenciales
            
        });
                /*     */
       
                const resultado = await respuesta.json();
               
                if (respuesta.ok) {
                  console.log( resultado.status);
                  alert(resultado.status);
                  setError(""); // Limpiar el error
                //  navigate('/'); // Redirigir al usuario después de la creación
                } else {
                  setError('No se pudo crear el usuario. ' + resultado.message);
                }  


      
       
    

     

     
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      setError('Error al crear el usuario, intenta de nuevo.');
    }

  };

  const registro = () => {
  };

  const closeModal = () => {
    navigate(-1);
    
  };

  

  return (
    <div className="form-container">
    <button className="logout-button" onClick={closeModal}>Volver</button>
    <form onSubmit={handleSubmit} className="ai-agent-form">
     
      
      <div className="form-group">
        <label htmlFor="nombre">Nombres</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}/>
      </div>

       <div className="form-group">
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}/>
      </div>

      <div className="form-group">
        <label htmlFor="documento">Celular</label>
        <input
          type="text"
          id="documento"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}/>
      </div>

      <div className="form-group">
        <label htmlFor="documento">Cedula</label>
        <input
          type="text"
          id="documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}/>
      </div>

      <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    
    
   
    <div className="form-group">
      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    
    
    <div className="form-group">
      <label htmlFor="fecha-nacimiento">Fecha de Nacimiento:</label>
      <input
        type="date"
        id="fecha-nacimiento"
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
      />
    </div>

    <div className="form-group">
          <label htmlFor="role">Tipo de usuario</label>
          <select id="tipo" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">user</option>
           
          </select>
      </div>
     

      <button type="submit" className="submit-button">
        Registrar
      </button>
    </form>

  
  </div>
  );
}

export default UsuarioRegistro;
