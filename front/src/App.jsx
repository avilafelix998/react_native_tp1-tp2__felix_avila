import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const validarNombre = async () => {
    try {
      const res = await fetch(`http://localhost:3000/validar/${nombre}`);
      const data = await res.json();

      if (data.valido) {
        setError("");
        obtenerSaludo(); 
      } else {
        setMensaje("");
        setError("Nombre inválido. Intente con otro.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al validar el nombre.");
    }
  };

  const obtenerSaludo = async () => {
    try {
      const res = await fetch(`http://localhost:3000/saludo/${nombre}`);
      const data = await res.json();
      setMensaje(data.mensaje);
    } catch (err) {
      console.error(err);
      setError("Error al obtener el saludo.");
    }
  };

  return (
    <div className="app">
      <h1>Bienvenido</h1>
      <input
        type="text"
        value={nombre}
        onChange={handleChange}
        placeholder="Ingrese su nombre"
      />
      <button onClick={validarNombre}>Enviar</button>

      {mensaje && <p>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
