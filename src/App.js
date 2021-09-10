import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';

const url = "https://maestrogeekapp.herokuapp.com/data/";

function App() {

  const [usuario, setUsuario] = useState([]);

  const [values, setValues] = useState({
    id: '',
    documento: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    celular: '',
    direccion: '',
    imagen: ''
  })

  const { id, documento, nombres, apellidos, telefono, celular, direccion, imagen } = values;

  useEffect(() => {
    peticionGet();
  }, [])

  const peticionGet = async () => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    setUsuario(data);
  }

  const peticionPost = async () => {
      await axios.post(url,values)
      .then(response => {
        console.log("Registrado", response);
        peticionGet();
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleChanged = ({target}) => {
    setValues({
      ...values,
      [target.name]: target.value
    })

    console.log(values)
  }


  return (
    <div className="App">
      <h1>Registro</h1>
      <hr />
      <form>
        <label>Id</label>
        <input id="id" name="id" value={id} onChange={handleChanged} />
        <br />
        <label>Documento</label>
        <input id="documento" name="documento" value={documento} onChange={handleChanged} />
        <br />
        <label>Nombres</label>
        <input id="nombre" name="nombres" value={nombres} onChange={handleChanged} />
        <br />
        <label>Apellido</label>
        <input id="apellido" name="apellidos" value={apellidos} onChange={handleChanged} />
        <br />
        <label>Teléfono</label>
        <input id="telefono" name="telefono" value={telefono} onChange={handleChanged} />
        <br />
        <label>Celular</label>
        <input id="celular" name="celular" value={celular} onChange={handleChanged} />
        <br />
        <label>Dirección</label>
        <input id="direccion" name="direccion" value={direccion} onChange={handleChanged} />
        <br />
        <label>Imagen</label>
        <input id="imagen" name="imagen" value={imagen} onChange={handleChanged} />
        <br />
        <button
        onClick={() => peticionPost()}>Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Documento</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Celular</th>
            <th>Dirección</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {
            usuario.map(user => (

              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.documento}</td>
                <td>{user.nombres}</td>
                <td>{user.apellidos}</td>
                <td>{user.telefono}</td>
                <td>{user.celular}</td>
                <td>{user.direccion}</td>
                <td><img src={user.imagen} width="50px" alt="" /></td>
              </tr>

            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
