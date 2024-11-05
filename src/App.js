import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';


Modal.setAppElement('#root');

function App({ onLogout}) {
  const [codigos, setCodigos] = useState([]);
  const [newcodigo, setNewcodigo] = useState();
 
  const [formData, setFormData] = useState({
    
  });

  useEffect(() => {
    // Llamar a actualizarUsuario al cargar la página para mostrar los códigos existentes
    actualizarUsuario();
  }, []);

  const [success, setSuccess] = useState(false);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const user = localStorage.getItem('id'); // Obtener usuario de localStorage
      if (!user) {
        console.error('No hay usuario en el almacenamiento local');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/regcodigo/${user}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo: newcodigo }), // Enviar el código en formato objeto
      });

      const resultado = await response.json();
      console.log('respuesta:', resultado.status);
     alert(resultado.status)

      setSuccess(true);
      setNewcodigo(''); // Limpiar el campo de entrada después de registrar

      // Actualizar la tabla después de registrar el nuevo código
      actualizarUsuario();
    } catch (error) {
      console.error('Error al registrar el código:', error);
    }
  };

  const actualizarUsuario = async () => {
    const user = localStorage.getItem('id');

    try {
      const response = await fetch('http://localhost:5000/api/leercodigos/'+user); // URL de la API
      const datacodigos = await response.json();
      //console.log('objeto:', datacodigos);
      const codigosArray = Array.isArray(datacodigos) ? datacodigos : datacodigos.datos_obtenidos || [];
     // console.log("arreglo" + codigosArray);
      //console.log("usuario" + localStorage.getItem('user'));
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
    onLogout();
  };

  

  return (
    <div className="form-container">
    <button className="logout-button" onClick={handleLogout}>Volver</button>
    <form onSubmit={handleSubmit} className="ai-agent-form">
      {/* Formulario para registrar nuevo código */}
      <div className="form-group">
        <label htmlFor="nombre">Codigo</label>
        <input
          type="text"
          id="nombre"
          value={newcodigo}
          onChange={(e) => setNewcodigo(e.target.value)}/>
      </div>
      <button type="submit" className="submit-button">Registrar</button>
     
    </form>

    <h2>Codigos Registrados</h2>
    {/* Tabla para mostrar los datos */}
    <table>
      <thead>
        <tr>
          <th>codigo</th>
          <th>id_usuario</th>
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

export default App;
