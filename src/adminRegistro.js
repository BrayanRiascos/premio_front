import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css'; // Usar los mismos estilos que App
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root');

function UsuarioRegistro({ onLoginSuccess }) {
 
 
  const [error, setError] = useState('');
 
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', {   
      email,
      password,
      role   });
    <h1> registrar</h1>
   
    
    try {

      if(email === null || password === null ){
              
        alert("El nombre de usuario o la contraseña no pueden estar vacíos o contener solo espacios en blanco");
       
      }else{

        const respuesta = await fetch('https://premio-back.vercel.app/api/crear', {
          method: 'POST',
          
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email,
            password,
            role       }), // Enviar credenciales
            
        });
                /*     */
       
                const resultado = await respuesta.json();
                console.log('Respuesta:', resultado);
                if (respuesta.ok) {
                  console.log( resultado);
                  setError(null); // Limpiar el error
                //  navigate('/'); // Redirigir al usuario después de la creación
                } else {
                  setError('No se pudo crear el usuario. ' + resultado.message);
                }  


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
          <label htmlFor="role">Tipo de usuario</label>
          <select id="tipo" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">admin</option>
           
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
